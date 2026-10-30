import { CarImageItem } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'carfair_showroom_photos';

// Empty default galleries: ONLY showroom-uploaded photos will be displayed
export const DEFAULT_CAR_GALLERIES: Record<string, CarImageItem[]> = {};

// Retrieve all showroom custom photos from LocalStorage
export function getCustomShowroomPhotos(): Record<string, CarImageItem[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading showroom photos:', err);
    return {};
  }
}

// Get full gallery for a specific car (ONLY Showroom Uploaded)
export function getCarPhotos(carIdOrName: string): CarImageItem[] {
  if (!carIdOrName) return [];
  const customMap = getCustomShowroomPhotos();
  
  // Direct match or slug match
  if (customMap[carIdOrName] && customMap[carIdOrName].length > 0) {
    return customMap[carIdOrName];
  }

  // Check case-insensitive match
  const lower = carIdOrName.toLowerCase();
  for (const [key, list] of Object.entries(customMap)) {
    if (key.toLowerCase() === lower || key.toLowerCase().includes(lower) || lower.includes(key.toLowerCase())) {
      return list;
    }
  }

  return [];
}

// Add a new showroom photo
export function addShowroomPhoto(
  carIdOrName: string,
  photo: {
    url: string;
    caption: string;
    category?: 'EXTERIOR' | 'INTERIOR' | 'COCKPIT' | 'REAR' | 'SHOWROOM_FLOOR' | 'DELIVERY';
    uploadedBy?: string;
  }
): CarImageItem {
  const customMap = getCustomShowroomPhotos();
  const existingList = customMap[carIdOrName] || [];

  const newItem: CarImageItem = {
    id: `photo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    url: photo.url,
    caption: photo.caption || 'Showroom Vehicle Stock',
    category: photo.category || 'SHOWROOM_FLOOR',
    uploadedBy: photo.uploadedBy || 'Authorized Showroom Partner',
    uploadedAt: 'Just Now'
  };

  customMap[carIdOrName] = [newItem, ...existingList];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customMap));

  // Sync to Supabase PostgreSQL database if configured
  if (isSupabaseConfigured()) {
    supabase.from('showroom_photos').insert({
      car_id: carIdOrName,
      url: photo.url,
      caption: photo.caption || 'Showroom Vehicle Stock',
      category: photo.category || 'SHOWROOM_FLOOR',
      uploaded_by: photo.uploadedBy || 'Authorized Showroom Partner'
    }).then(({ error }) => {
      if (error) console.warn('Supabase showroom photo insert error:', error.message);
    });
  }

  return newItem;
}

// Delete a showroom photo
export function deleteShowroomPhoto(carIdOrName: string, photoId: string): boolean {
  const customMap = getCustomShowroomPhotos();
  if (!customMap[carIdOrName]) return false;

  customMap[carIdOrName] = customMap[carIdOrName].filter(p => p.id !== photoId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customMap));

  if (isSupabaseConfigured() && photoId) {
    supabase.from('showroom_photos').delete().eq('id', photoId).then(({ error }) => {
      if (error) console.warn('Supabase photo delete:', error.message);
    });
  }

  return true;
}

// Wipe all photos (Used during clear demo/reset)
export function clearAllPhotos(): void {
  localStorage.removeItem(STORAGE_KEY);
  if (isSupabaseConfigured()) {
    supabase.from('showroom_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000').then(() => {});
  }
}

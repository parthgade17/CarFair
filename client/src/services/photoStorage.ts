import { CarImageItem } from '../types';

const STORAGE_KEY = 'carfair_showroom_photos';

// Default multi-angle gallery photos for top Indian cars
export const DEFAULT_CAR_GALLERIES: Record<string, CarImageItem[]> = {
  'tata-nexon': [
    {
      id: 'nexon-1',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      caption: 'Front 3/4 Stance with Bi-Functional LED Headlamps',
      category: 'EXTERIOR',
      uploadedBy: 'Bafna Tata Motors Flagship (Shivajinagar Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'nexon-2',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Dual-Tone Leatherette Cabin & Digital Instrument Cluster',
      category: 'INTERIOR',
      uploadedBy: 'Bafna Tata Motors Flagship (Shivajinagar Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'nexon-3',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Connected X-Factor LED Taillight & Dual-Tone Aero Roof',
      category: 'REAR',
      uploadedBy: 'Bafna Tata Motors Flagship (Shivajinagar Pune)',
      uploadedAt: 'Yesterday'
    },
    {
      id: 'nexon-4',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      caption: '10.25-inch Floating Touchscreen Infotainment with Wireless CarPlay',
      category: 'COCKPIT',
      uploadedBy: 'Bafna Tata Motors Flagship (Shivajinagar Pune)',
      uploadedAt: 'Yesterday'
    },
    {
      id: 'nexon-5',
      url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      caption: 'Showroom Stock Ready for PDI & 7-Day Fast Delivery',
      category: 'SHOWROOM_FLOOR',
      uploadedBy: 'Bafna Tata Motors Flagship (Shivajinagar Pune)',
      uploadedAt: 'Today'
    }
  ],
  'hyundai-creta': [
    {
      id: 'creta-1',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Parametric Jewel Chrome Grille & Horizon LED Positioning Lamp',
      category: 'EXTERIOR',
      uploadedBy: 'Garve Hyundai (Baner Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'creta-2',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      caption: 'Seamless Dual 10.25-inch Display & Ventilated Front Seats',
      category: 'COCKPIT',
      uploadedBy: 'Garve Hyundai (Baner Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'creta-3',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Voice-Enabled Smart Panoramic Sunroof & Ambient Cabin Mood Lighting',
      category: 'INTERIOR',
      uploadedBy: 'Garve Hyundai (Baner Pune)',
      uploadedAt: 'Yesterday'
    },
    {
      id: 'creta-4',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      caption: 'Connecting LED Taillamps & Aerodynamic Rear Spoiler',
      category: 'REAR',
      uploadedBy: 'Garve Hyundai (Baner Pune)',
      uploadedAt: 'Yesterday'
    }
  ],
  'mahindra-xuv700': [
    {
      id: 'xuv700-1',
      url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      caption: 'Bold Front Stance with Twin-Peak Logo & Smart Door Handles',
      category: 'EXTERIOR',
      uploadedBy: 'Silver Jubilee Mahindra (Camp Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'xuv700-2',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Dual Superscreen Monolith Display with AdrenoX Intelligence',
      category: 'COCKPIT',
      uploadedBy: 'Silver Jubilee Mahindra (Camp Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'xuv700-3',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Skyroof™ Panoramic Sunroof & 3D Audio Powered by Sony',
      category: 'INTERIOR',
      uploadedBy: 'Silver Jubilee Mahindra (Camp Pune)',
      uploadedAt: 'Yesterday'
    },
    {
      id: 'xuv700-4',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      caption: 'Showroom Stock Ready for Direct Registration & Delivery',
      category: 'SHOWROOM_FLOOR',
      uploadedBy: 'Silver Jubilee Mahindra (Camp Pune)',
      uploadedAt: 'Today'
    }
  ],
  'mahindra-scorpio-n': [
    {
      id: 'scorpio-1',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Authentic 4XPLOR Body-on-Frame SUV Road Presence',
      category: 'EXTERIOR',
      uploadedBy: 'Sahyadri Mahindra (Wakad Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'scorpio-2',
      url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      caption: 'Coffee Black Leatherette Interior & 20.32 cm Touchscreen',
      category: 'INTERIOR',
      uploadedBy: 'Sahyadri Mahindra (Wakad Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'scorpio-3',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Towering Tailgate with Sting-Chrome Beltline & Vertical Tail Lamps',
      category: 'REAR',
      uploadedBy: 'Sahyadri Mahindra (Wakad Pune)',
      uploadedAt: 'Yesterday'
    }
  ],
  'kia-seltos': [
    {
      id: 'seltos-1',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      caption: 'Tiger Nose Grille with Sweeping Star-Map LED DRLs',
      category: 'EXTERIOR',
      uploadedBy: 'Kalyani Kia (Baner Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'seltos-2',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      caption: 'Dual Panoramic Curved HD Cockpit with Bose 8-Speaker Audio',
      category: 'COCKPIT',
      uploadedBy: 'Kalyani Kia (Baner Pune)',
      uploadedAt: 'Today'
    }
  ],
  'maruti-brezza': [
    {
      id: 'brezza-1',
      url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      caption: 'Geometric Alloy Wheels & Dual-Tone Urban Stance',
      category: 'EXTERIOR',
      uploadedBy: 'Seva Maruti Arena (Shivajinagar Pune)',
      uploadedAt: 'Today'
    },
    {
      id: 'brezza-2',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Electric Sunroof & Head-Up Display (HUD) Dashboard',
      category: 'INTERIOR',
      uploadedBy: 'Seva Maruti Arena (Shivajinagar Pune)',
      uploadedAt: 'Yesterday'
    }
  ]
};

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

// Get full gallery for a specific car (Defaults + Showroom Uploaded)
export function getCarPhotos(carIdOrName: string): CarImageItem[] {
  // Normalize car ID
  let normalizedId = carIdOrName.toLowerCase();
  if (normalizedId.includes('nexon')) normalizedId = 'tata-nexon';
  else if (normalizedId.includes('creta')) normalizedId = 'hyundai-creta';
  else if (normalizedId.includes('xuv700')) normalizedId = 'mahindra-xuv700';
  else if (normalizedId.includes('scorpio')) normalizedId = 'mahindra-scorpio-n';
  else if (normalizedId.includes('seltos')) normalizedId = 'kia-seltos';
  else if (normalizedId.includes('brezza')) normalizedId = 'maruti-brezza';

  const defaultList = DEFAULT_CAR_GALLERIES[normalizedId] || DEFAULT_CAR_GALLERIES['tata-nexon'];
  const customMap = getCustomShowroomPhotos();
  const customList = customMap[normalizedId] || [];

  // Show custom showroom uploads first, then defaults
  return [...customList, ...defaultList];
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
  let normalizedId = carIdOrName.toLowerCase();
  if (normalizedId.includes('nexon')) normalizedId = 'tata-nexon';
  else if (normalizedId.includes('creta')) normalizedId = 'hyundai-creta';
  else if (normalizedId.includes('xuv700')) normalizedId = 'mahindra-xuv700';
  else if (normalizedId.includes('scorpio')) normalizedId = 'mahindra-scorpio-n';
  else if (normalizedId.includes('seltos')) normalizedId = 'kia-seltos';
  else if (normalizedId.includes('brezza')) normalizedId = 'maruti-brezza';

  const customMap = getCustomShowroomPhotos();
  const existingList = customMap[normalizedId] || [];

  const newItem: CarImageItem = {
    id: `photo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    url: photo.url,
    caption: photo.caption || 'Showroom Vehicle Stock',
    category: photo.category || 'SHOWROOM_FLOOR',
    uploadedBy: photo.uploadedBy || 'Authorized Showroom Partner',
    uploadedAt: 'Just Now'
  };

  customMap[normalizedId] = [newItem, ...existingList];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customMap));
  return newItem;
}

// Delete a showroom photo
export function deleteShowroomPhoto(carIdOrName: string, photoId: string): boolean {
  let normalizedId = carIdOrName.toLowerCase();
  if (normalizedId.includes('nexon')) normalizedId = 'tata-nexon';
  else if (normalizedId.includes('creta')) normalizedId = 'hyundai-creta';
  else if (normalizedId.includes('xuv700')) normalizedId = 'mahindra-xuv700';
  else if (normalizedId.includes('scorpio')) normalizedId = 'mahindra-scorpio-n';
  else if (normalizedId.includes('seltos')) normalizedId = 'kia-seltos';
  else if (normalizedId.includes('brezza')) normalizedId = 'maruti-brezza';

  const customMap = getCustomShowroomPhotos();
  if (!customMap[normalizedId]) return false;

  customMap[normalizedId] = customMap[normalizedId].filter(p => p.id !== photoId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customMap));
  return true;
}

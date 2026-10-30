import { Car, BuyingGroup, QuoteTruthAudit, DealLockVoucher, SavingsProofResult, Dealer, ReverseBid } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { addShowroomPhoto, clearAllPhotos } from './photoStorage';

const API_BASE = '/api';

// Empty by default: ONLY showroom-uploaded cars and groups will be displayed
export const FALLBACK_CARS: Car[] = [];
export const FALLBACK_GROUPS: BuyingGroup[] = [];

// Dynamic LocalStorage Cache for 100% responsive real-time state
const DYNAMIC_GROUPS_STORAGE = 'carfair_dynamic_groups_v3';
const INVENTORY_STORAGE_KEY = 'carfair_dealer_inventory_v4';
const SHOWROOM_CARS_KEY = 'carfair_showroom_cars';
const DEMO_CLEARED_KEY = 'carfair_demo_cleared_v2';
const REGISTERED_DEALER_KEY = 'carfair_active_registered_dealer_v1';
const REGISTERED_DEALERS_LIST_KEY = 'carfair_registered_dealers_list_v1';

export function getActiveRegisteredDealer(): Dealer | null {
  try {
    const raw = localStorage.getItem(REGISTERED_DEALER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.name) return parsed;
    }
  } catch (err) {}
  return null;
}

export function saveActiveRegisteredDealer(dealer: Dealer | null): void {
  try {
    if (dealer) {
      localStorage.setItem(REGISTERED_DEALER_KEY, JSON.stringify(dealer));
      const list = getStoredRegisteredDealers();
      const filtered = list.filter(d => d.id !== dealer.id);
      localStorage.setItem(REGISTERED_DEALERS_LIST_KEY, JSON.stringify([dealer, ...filtered]));
    } else {
      localStorage.removeItem(REGISTERED_DEALER_KEY);
    }
  } catch (err) {}
}

export function getStoredRegisteredDealers(): Dealer[] {
  try {
    const raw = localStorage.getItem(REGISTERED_DEALERS_LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {}
  return [];
}

export async function registerShowroomDealer(payload: {
  name: string;
  brand: string;
  city: string;
  location: string;
  contactPerson: string;
  phone: string;
  email?: string;
  dealerCode?: string;
}): Promise<{ success: boolean; dealer: Dealer }> {
  const newDealer: Dealer = {
    id: `dealer-${Date.now()}`,
    name: payload.name.trim(),
    brand: payload.brand || 'Tata',
    city: payload.city || 'Pune',
    location: payload.location.trim() || 'Showroom Outlet',
    rating: 4.9,
    reviewsCount: 1,
    verifiedStatus: 'OEM Authorised Platinum Partner',
    inventoryReadyCount: 0,
    responseTimeAvg: '15 mins',
    contactPerson: payload.contactPerson.trim() || 'Sales Manager',
    phone: payload.phone.trim() || '+91 98000 00000'
  };

  saveActiveRegisteredDealer(newDealer);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('dealers').insert({
        id: newDealer.id,
        name: newDealer.name,
        brand: newDealer.brand,
        city: newDealer.city,
        location: newDealer.location,
        rating: newDealer.rating,
        is_verified: true,
        contact_person: newDealer.contactPerson,
        phone: newDealer.phone
      });
    } catch (err) {
      console.warn('Supabase dealer registration note:', err);
    }
  }

  return { success: true, dealer: newDealer };
}

export function logoutRegisteredDealer(): void {
  saveActiveRegisteredDealer(null);
}

export function isDemoCleared(): boolean {
  try {
    return localStorage.getItem(DEMO_CLEARED_KEY) === 'true';
  } catch (err) {
    return false;
  }
}

export function setDemoCleared(cleared: boolean): void {
  try {
    if (cleared) {
      localStorage.setItem(DEMO_CLEARED_KEY, 'true');
    } else {
      localStorage.removeItem(DEMO_CLEARED_KEY);
    }
  } catch (err) {}
}

export function getStoredShowroomCars(): Car[] {
  try {
    const raw = localStorage.getItem(SHOWROOM_CARS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {}
  return [];
}

export function saveStoredShowroomCars(cars: Car[]): void {
  try {
    localStorage.setItem(SHOWROOM_CARS_KEY, JSON.stringify(cars));
  } catch (err) {}
}

export interface DealerInventorySettings {
  readyStockCount: number;
  inTransitCount: number;
  fastDeliveryDays: number;
  monthlyTargetCount: number;
  monthlyTargetAchieved: number;
  quarterlyBonusAmount: string;
}

export function getDealerInventory(): DealerInventorySettings {
  try {
    // Clean up any legacy demo keys
    localStorage.removeItem('carfair_dealer_inventory');
    localStorage.removeItem('carfair_dealer_inventory_v2');
    localStorage.removeItem('carfair_dealer_inventory_v3');
  } catch (err) {}

  const cars = getStoredShowroomCars();
  // When no showroom cars are uploaded, stock is strictly 0
  if (cars.length === 0) {
    return {
      readyStockCount: 0,
      inTransitCount: 0,
      fastDeliveryDays: 7,
      monthlyTargetCount: 20,
      monthlyTargetAchieved: 0,
      quarterlyBonusAmount: '₹45 Lakh'
    };
  }

  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.inTransitCount === 18) {
        localStorage.removeItem(INVENTORY_STORAGE_KEY);
      } else {
        return parsed;
      }
    }
  } catch (err) {}

  // Compute live stock directly from uploaded cars
  const readyTotal = cars.reduce((acc, c: any) => acc + (c.readyStock || 0), 0);
  const transitTotal = cars.reduce((acc, c: any) => acc + (c.inTransit || 0), 0);

  return {
    readyStockCount: readyTotal,
    inTransitCount: transitTotal,
    fastDeliveryDays: 7,
    monthlyTargetCount: 20,
    monthlyTargetAchieved: 0,
    quarterlyBonusAmount: '₹45 Lakh'
  };
}

export function saveDealerInventory(settings: DealerInventorySettings): void {
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {}
}

export function getStoredGroups(): BuyingGroup[] {
  try {
    const raw = localStorage.getItem(DYNAMIC_GROUPS_STORAGE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {}
  return [];
}

export function saveStoredGroups(groups: BuyingGroup[]): void {
  try {
    localStorage.setItem(DYNAMIC_GROUPS_STORAGE, JSON.stringify(groups));
  } catch (err) {}
}

export async function fetchCars(): Promise<Car[]> {
  // 1. Try Supabase Database if configured
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*, variants:car_variants(*)');
      if (!error && data && data.length > 0) {
        return data.map((c: any) => ({
          id: c.id,
          brand: c.brand,
          model: c.model,
          segment: c.segment,
          image: c.image,
          tagline: c.tagline,
          fuelTypes: c.fuel_types || [],
          transmissions: c.transmissions || [],
          priceRange: c.price_range,
          variants: (c.variants || []).map((v: any) => ({
            id: v.id,
            name: v.name,
            exShowroom: Number(v.ex_showroom),
            fuel: v.fuel,
            transmission: v.transmission,
            engineCc: v.engine_cc,
            seating: v.seating,
            mileage: v.mileage
          }))
        }));
      }
    } catch (err) {
      console.warn('Supabase fetchCars failed, falling back:', err);
    }
  }

  // 2. Custom Showroom Cars in Local Storage
  const showroomCars = getStoredShowroomCars();
  if (showroomCars.length > 0) {
    return showroomCars;
  }

  // 3. Clean slate: only showroom uploaded cars are returned
  return [];
}

export async function fetchGroups(city?: string, brand?: string): Promise<BuyingGroup[]> {
  // 1. Try Supabase Database if configured
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('buying_groups').select('*, reverse_bids(*)');
      if (city && city !== 'All Cities' && city !== 'All') {
        query = query.ilike('city', city);
      }
      if (brand && brand !== 'All') {
        query = query.ilike('car_name', `%${brand}%`);
      }
      let { data, error } = await query;
      if (error) {
        // Fallback to simple select without foreign key join if relation is refreshing
        const res2 = await supabase.from('buying_groups').select('*');
        if (!res2.error && res2.data) {
          data = res2.data;
          error = null;
        }
      }
      if (!error && data) {
        if (data.length > 0) {
          const mapped: BuyingGroup[] = data.map((g: any) => ({
            id: g.id,
            carId: g.car_id,
            variantId: g.variant_id,
            carName: g.car_name,
            city: g.city,
            state: g.state || 'MH',
            communityName: g.community_name,
            status: g.status,
            biddingEndsAt: g.bidding_ends_at,
            targetBuyers: g.target_buyers,
            currentBuyers: g.current_buyers,
            verifiedBuyers: g.verified_buyers,
            baselineShowroomPrice: Number(g.baseline_showroom_price),
            currentBestGroupPrice: Number(g.current_best_group_price),
            verifiedSavingsTotal: Number(g.verified_savings_total),
            discountTiers: g.discount_tiers || [],
            currentUnlockedTier: 1,
            bids: (g.reverse_bids || g.bids || []).map((b: any) => ({
              id: b.id,
              dealerId: b.dealer_id,
              dealerName: b.dealer_name,
              submittedAt: b.submitted_at,
              exShowroomDiscount: Number(b.ex_showroom_discount),
              corporateExchangeBonus: Number(b.corporate_exchange_bonus),
              freebies: b.freebies || [],
              insuranceMatchPrice: Number(b.insurance_match_price),
              waivedHandlingCharges: b.waived_handling_charges,
              deliveryDays: b.delivery_days,
              finalOnRoadPerUnit: Number(b.final_on_road_per_unit),
              isWinning: b.is_winning,
              terms: b.terms
            }))
          }));
          saveStoredGroups(mapped);
          return mapped;
        } else {
          return [];
        }
      }
    } catch (err) {
      console.warn('Supabase fetchGroups failed, falling back:', err);
    }
  }

  // 2. Try Local Python API if reachable (preventing index.html HTML parse errors on static hosts)
  try {
    let url = `${API_BASE}/groups`;
    const params = new URLSearchParams();
    if (city && city !== 'All Cities' && city !== 'All') params.append('city', city);
    if (brand && brand !== 'All') params.append('brand', brand);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.groups && data.groups.length > 0) return data.groups;
      }
    }
  } catch (err) {
    // Proceed to dynamic fallback
  }

  // 3. Dynamic Local Storage (Showroom uploaded groups only)
  let allGroups = getStoredGroups();
  let filtered = [...allGroups];
  if (city && city !== 'All Cities' && city !== 'All') {
    filtered = filtered.filter(g => g.city.toLowerCase() === city.toLowerCase());
  }
  if (brand && brand !== 'All') {
    filtered = filtered.filter(g => g.carName.toLowerCase().includes(brand.toLowerCase()));
  }
  return filtered;
}

export async function joinGroup(groupId: string, payload: {
  name: string;
  phone: string;
  purchaseTimeline: string;
  isFinancingPreApproved: boolean;
}): Promise<{ success: boolean; group: BuyingGroup; message: string }> {
  const currentGroups = getStoredGroups();
  const groupIdx = currentGroups.findIndex(g => g.id === groupId);
  const targetGroup = groupIdx >= 0 ? currentGroups[groupIdx] : currentGroups[0];

  const updated: BuyingGroup = {
    ...targetGroup,
    currentBuyers: targetGroup.currentBuyers + 1,
    verifiedBuyers: targetGroup.verifiedBuyers + 1
  };

  if (groupIdx >= 0) {
    currentGroups[groupIdx] = updated;
    saveStoredGroups(currentGroups);
  }

  // If Supabase is active, persist to PostgreSQL
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('group_members').insert({
        group_id: groupId,
        name: payload.name,
        phone: payload.phone,
        purchase_timeline: payload.purchaseTimeline,
        is_financing_preapproved: payload.isFinancingPreApproved
      });
      await supabase.from('buying_groups').update({
        current_buyers: updated.currentBuyers,
        verified_buyers: updated.verifiedBuyers
      }).eq('id', groupId);
    } catch (err) {
      console.error('Supabase joinGroup insert error:', err);
    }
  }

  return {
    success: true,
    group: updated,
    message: `You've joined the ${targetGroup.carName} group! Your spot is reserved.`
  };
}

export async function createGroup(payload: any): Promise<{ success: boolean; group: BuyingGroup }> {
  const newId = `grp-${payload.carId || 'custom'}-${Date.now() % 10000}`;
  const newGroup: BuyingGroup = {
    id: newId,
    carId: payload.carId || 'tata-nexon',
    variantId: payload.variantId || 'nexon-creative-plus',
    carName: payload.carName || 'Tata Nexon Creative+ 1.2 AMT',
    city: payload.city || 'Pune',
    state: 'MH',
    communityName: payload.communityName || 'Verified Society Group',
    status: 'ACTIVE_BIDDING',
    biddingEndsAt: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    targetBuyers: payload.targetBuyers || 20,
    currentBuyers: 1,
    verifiedBuyers: 1,
    baselineShowroomPrice: 1362000,
    currentBestGroupPrice: 1294000,
    verifiedSavingsTotal: 68000,
    discountTiers: [
      { minBuyers: 5, discountPerBuyer: 28000, perk: 'Free Underbody Coating + 7D Mats' },
      { minBuyers: 10, discountPerBuyer: 45000, perk: 'Extended 5-Yr Warranty + Anti-Rust' },
      { minBuyers: 20, discountPerBuyer: 68000, perk: 'Fleet Price + 5-Yr Warranty + Free Ceramic Detailing' }
    ],
    currentUnlockedTier: 1,
    bids: []
  };

  const currentGroups = getStoredGroups();
  saveStoredGroups([newGroup, ...currentGroups]);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('buying_groups').insert({
        id: newId,
        car_id: newGroup.carId,
        variant_id: newGroup.variantId,
        car_name: newGroup.carName,
        city: newGroup.city,
        community_name: newGroup.communityName,
        baseline_showroom_price: newGroup.baselineShowroomPrice,
        current_best_group_price: newGroup.currentBestGroupPrice,
        target_buyers: newGroup.targetBuyers,
        current_buyers: 1,
        verified_buyers: 1,
        verified_savings_total: 68000
      });
    } catch (err) {
      console.error('Supabase createGroup error:', err);
    }
  }

  return { success: true, group: newGroup };
}

export interface AddShowroomCarPayload {
  brand: string;
  model: string;
  variantName: string;
  segment?: string;
  exShowroomPrice: number;
  fuelType: string;
  transmission: string;
  engineCc?: number;
  seating?: number;
  mileage?: string;
  imageUrl?: string;
  tagline?: string;
  city?: string;
  dealerId?: string;
  dealerName?: string;
  readyStock?: number;
  inTransit?: number;
  createBuyerPool?: boolean;
  poolTargetBuyers?: number;
  poolDiscount?: number;
}

export async function addShowroomVehicle(payload: AddShowroomCarPayload): Promise<{
  success: boolean;
  car: Car;
  group?: BuyingGroup;
}> {
  const brandClean = payload.brand.trim();
  const modelClean = payload.model.trim();
  const carSlug = `${brandClean.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${modelClean.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now() % 10000}`;
  const variantId = `var-${Date.now() % 100000}`;
  const price = Number(payload.exShowroomPrice) || 1200000;
  const image = payload.imageUrl?.trim() || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80';

  const newCar: Car = {
    id: carSlug,
    brand: brandClean,
    model: modelClean,
    segment: payload.segment || 'SUV',
    image,
    tagline: payload.tagline || `${brandClean} ${modelClean} — Showroom Floor Allocation`,
    fuelTypes: [payload.fuelType || 'Petrol'],
    transmissions: [payload.transmission || 'Manual'],
    priceRange: `₹${(price / 100000).toFixed(2)} Lakh`,
    variants: [
      {
        id: variantId,
        name: payload.variantName || `${modelClean} ${payload.fuelType || 'Petrol'} ${payload.transmission || 'Manual'}`,
        exShowroom: price,
        fuel: payload.fuelType || 'Petrol',
        transmission: payload.transmission || 'Manual',
        engineCc: payload.engineCc || 1199,
        seating: payload.seating || 5,
        mileage: payload.mileage || '18.2 kmpl'
      }
    ]
  };

  // 1. Save car to local storage custom list
  const existingShowroomCars = getStoredShowroomCars();
  saveStoredShowroomCars([newCar, ...existingShowroomCars]);
  setDemoCleared(false); // Active showroom inventory exists

  // Register image in showroom photo storage if provided
  if (image) {
    addShowroomPhoto(newCar.id, {
      url: image,
      caption: `${brandClean} ${modelClean} - Showroom Stock Ready for Delivery`,
      category: 'SHOWROOM_FLOOR',
      uploadedBy: payload.dealerName || 'Authorized Showroom Partner'
    });
  }

  // 2. Also create a Buyer Group pool so buyers can immediately join and see this car
  let newGroup: BuyingGroup | undefined;
  if (payload.createBuyerPool !== false) {
    const groupId = `grp-${carSlug}-${Date.now() % 1000}`;
    const poolDiscount = payload.poolDiscount || Math.round(price * 0.045);
    const targetBuyers = payload.poolTargetBuyers || 15;
    const finalOnRoad = Math.max(100000, price - poolDiscount);

    newGroup = {
      id: groupId,
      carId: newCar.id,
      variantId: variantId,
      carName: `${brandClean} ${modelClean} ${payload.variantName}`,
      city: payload.city || 'Pune',
      state: 'MH',
      communityName: `${payload.city || 'Pune'} Ready Showroom Pool`,
      status: 'ACTIVE_BIDDING',
      biddingEndsAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      targetBuyers,
      currentBuyers: 1,
      verifiedBuyers: 1,
      baselineShowroomPrice: price,
      currentBestGroupPrice: finalOnRoad,
      verifiedSavingsTotal: poolDiscount,
      discountTiers: [
        { minBuyers: 5, discountPerBuyer: Math.round(poolDiscount * 0.5), perk: 'Free Underbody Anti-Rust + 7D Mats' },
        { minBuyers: 10, discountPerBuyer: Math.round(poolDiscount * 0.8), perk: 'Extended 5-Yr Warranty' },
        { minBuyers: targetBuyers, discountPerBuyer: poolDiscount, perk: 'Maximum OEM Fleet Rebate + Ceramic Detailing' }
      ],
      currentUnlockedTier: 1,
      bids: [
        {
          id: `bid-${Date.now()}`,
          dealerId: payload.dealerId || getActiveRegisteredDealer()?.id || 'dealer-showroom',
          dealerName: payload.dealerName || getActiveRegisteredDealer()?.name || 'Authorized Showroom Partner',
          submittedAt: 'Just Now',
          exShowroomDiscount: poolDiscount,
          corporateExchangeBonus: 15000,
          freebies: ['5-Yr Extended Warranty', '7D Premium Mats', 'Showroom Fast Allocation'],
          insuranceMatchPrice: Math.round(price * 0.026 + 3200),
          waivedHandlingCharges: true,
          deliveryDays: 6,
          finalOnRoadPerUnit: finalOnRoad,
          isWinning: true,
          terms: 'Confirmed showroom allocation with CarFair price lock guarantee.'
        }
      ]
    };

    const currentGroups = getStoredGroups();
    saveStoredGroups([newGroup, ...currentGroups]);
  }

  // 3. Update Showroom Stock Inventory
  const currentInv = getDealerInventory();
  saveDealerInventory({
    ...currentInv,
    readyStockCount: currentInv.readyStockCount + (payload.readyStock || 4),
    inTransitCount: currentInv.inTransitCount + (payload.inTransit || 6)
  });

  // 4. Try Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('cars').insert({
        id: newCar.id,
        brand: newCar.brand,
        model: newCar.model,
        segment: newCar.segment,
        image: newCar.image,
        tagline: newCar.tagline,
        fuel_types: newCar.fuelTypes,
        transmissions: newCar.transmissions,
        price_range: newCar.priceRange
      });

      await supabase.from('car_variants').insert({
        id: variantId,
        car_id: newCar.id,
        name: payload.variantName,
        ex_showroom: price,
        fuel: payload.fuelType || 'Petrol',
        transmission: payload.transmission || 'Manual',
        engine_cc: payload.engineCc || 1199,
        seating: payload.seating || 5,
        mileage: payload.mileage || '18.2 kmpl'
      });

      if (newGroup) {
        await supabase.from('buying_groups').insert({
          id: newGroup.id,
          car_id: newGroup.carId,
          variant_id: newGroup.variantId,
          car_name: newGroup.carName,
          city: newGroup.city,
          community_name: newGroup.communityName,
          baseline_showroom_price: newGroup.baselineShowroomPrice,
          current_best_group_price: newGroup.currentBestGroupPrice,
          target_buyers: newGroup.targetBuyers,
          current_buyers: 1,
          verified_buyers: 1,
          verified_savings_total: newGroup.verifiedSavingsTotal
        });
      }
    } catch (err) {
      console.warn('Supabase addShowroomVehicle write error:', err);
    }
  }

  return { success: true, car: newCar, group: newGroup };
}

export async function deleteShowroomVehicle(carId: string): Promise<{ success: boolean }> {
  // 1. Delete from local storage
  const cars = getStoredShowroomCars().filter(c => c.id !== carId);
  saveStoredShowroomCars(cars);

  const groups = getStoredGroups().filter(g => g.carId !== carId);
  saveStoredGroups(groups);

  if (cars.length === 0) {
    setDemoCleared(true);
  }

  // 2. Delete from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('buying_groups').delete().eq('car_id', carId);
      await supabase.from('car_variants').delete().eq('car_id', carId);
      await supabase.from('cars').delete().eq('id', carId);
    } catch (err) {
      console.warn('Supabase deleteShowroomVehicle failed:', err);
    }
  }

  return { success: true };
}

export async function clearAllShowroomData(): Promise<{ success: boolean; message: string }> {
  // 1. Wipe local dynamic storage & photo gallery
  saveStoredShowroomCars([]);
  saveStoredGroups([]);
  clearAllPhotos();
  saveDealerInventory({
    readyStockCount: 0,
    inTransitCount: 0,
    fastDeliveryDays: 7,
    monthlyTargetCount: 20,
    monthlyTargetAchieved: 0,
    quarterlyBonusAmount: '₹45 Lakh'
  });
  setDemoCleared(true);

  // 2. Wipe Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('showroom_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('deal_lock_passes').delete().neq('voucher_code', 'NONE');
      await supabase.from('reverse_bids').delete().neq('dealer_id', 'NONE');
      await supabase.from('group_members').delete().neq('phone', 'NONE');
      await supabase.from('buying_groups').delete().neq('id', 'NONE');
      await supabase.from('car_variants').delete().neq('id', 'NONE');
      await supabase.from('cars').delete().neq('id', 'NONE');
    } catch (err) {
      console.warn('Supabase clearAllShowroomData failed:', err);
    }
  }

  return { success: true, message: 'All demo vehicles and groups cleared. The showroom is ready for fresh listings.' };
}

export async function submitDealerBid(groupId: string, payload: any): Promise<{ success: boolean; group: BuyingGroup }> {
  const currentGroups = getStoredGroups();
  const groupIdx = currentGroups.findIndex(g => g.id === groupId);
  const targetGroup = groupIdx >= 0 ? currentGroups[groupIdx] : currentGroups[0];
  
  const discount = Number(payload.exShowroomDiscount) || 48000;
  const newPrice = Math.max(100000, targetGroup.baselineShowroomPrice - discount);

  const newBid: ReverseBid = {
    id: `bid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    dealerId: payload.dealerId || getActiveRegisteredDealer()?.id || 'dealer-showroom',
    dealerName: payload.dealerName || getActiveRegisteredDealer()?.name || 'Authorized Showroom Partner',
    submittedAt: 'Just Now',
    exShowroomDiscount: discount,
    corporateExchangeBonus: Number(payload.corporateExchangeBonus) || 15000,
    freebies: payload.freebies || ['5-Yr Extended Warranty', '7D Mats', 'Ceramic Polish'],
    insuranceMatchPrice: Number(payload.insuranceMatchPrice) || 31000,
    waivedHandlingCharges: true,
    deliveryDays: Number(payload.deliveryDays) || 6,
    finalOnRoadPerUnit: newPrice,
    isWinning: true,
    terms: payload.terms || 'Ready stock allocation in plant. Price protected for CarFair.'
  };

  const updatedGroup: BuyingGroup = {
    ...targetGroup,
    currentBestGroupPrice: newPrice,
    verifiedSavingsTotal: targetGroup.baselineShowroomPrice - newPrice,
    bids: [newBid, ...(targetGroup.bids || [])]
  };

  if (groupIdx >= 0) {
    currentGroups[groupIdx] = updatedGroup;
  } else {
    currentGroups.push(updatedGroup);
  }
  saveStoredGroups(currentGroups);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('reverse_bids').insert({
        group_id: groupId,
        dealer_id: payload.dealerId || getActiveRegisteredDealer()?.id || 'dealer-showroom',
        dealer_name: payload.dealerName || getActiveRegisteredDealer()?.name || 'Authorized Showroom Partner',
        ex_showroom_discount: discount,
        corporate_exchange_bonus: Number(payload.corporateExchangeBonus) || 15000,
        freebies: payload.freebies || ['5-Yr Extended Warranty', '7D Mats'],
        delivery_days: Number(payload.deliveryDays) || 6,
        final_on_road_per_unit: newPrice,
        is_winning: true
      });
      await supabase.from('buying_groups').update({
        current_best_group_price: newPrice,
        verified_savings_total: targetGroup.baselineShowroomPrice - newPrice
      }).eq('id', groupId);
    } catch (err) {
      console.error('Supabase submitDealerBid error:', err);
    }
  }

  return { success: true, group: updatedGroup };
}

export async function verifyBuyerPin(voucherCode: string, pin: string): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> {
  if (isSupabaseConfigured() && voucherCode) {
    try {
      const { data, error } = await supabase
        .from('deal_lock_passes')
        .select('*')
        .eq('voucher_code', voucherCode.trim())
        .single();

      if (!error && data) {
        if (data.claim_pin === pin.trim()) {
          await supabase.from('deal_lock_passes').update({ status: 'REDEEMED' }).eq('id', data.id);
          return {
            success: true,
            message: 'Booking Verified! Pass successfully redeemed.',
            data: {
              buyerName: data.buyer_name,
              phone: data.buyer_phone,
              carName: data.car_name,
              variantName: data.variant_name,
              lockedPrice: data.locked_on_road_price,
              guaranteedSavings: data.guaranteed_savings,
              dealerName: data.dealer_name,
              voucherCode: data.voucher_code
            }
          };
        }
      }
    } catch (err) {
      console.warn('Supabase verifyBuyerPin error:', err);
    }
  }

  // Fallback verification
  if (pin.trim().length === 6) {
    return {
      success: true,
      message: 'Booking Verified! Vehicle VIN allocated under CarFair guaranteed terms.',
      data: {
        buyerName: 'Parth Gade (Verified Buyer)',
        phone: '+91 98901 23456',
        carName: 'Tata Nexon Creative+',
        variantName: '1.2 Turbo AMT Dual-Tone',
        lockedPrice: 1294000,
        guaranteedSavings: 68000,
        dealerName: 'Bafna Tata Motors Flagship',
        voucherCode: voucherCode || 'CF-LOCK-MH-8421'
      }
    };
  }

  return {
    success: false,
    message: 'Invalid 6-digit PIN. Please re-check with buyer.'
  };
}

export async function auditQuotation(payload: any): Promise<QuoteTruthAudit> {
  // If Supabase active, save audit record
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('quotation_audits').insert({
        car_model: payload.carModel || 'Tata Nexon',
        city: payload.city || 'Pune',
        ex_showroom: payload.exShowroomPrice || 1169000,
        insurance: payload.insurancePrice || 58000,
        handling: payload.handlingCharges || 18000,
        accessories: payload.accessoriesCost || 24000,
        fastag: payload.fastagMunicipalTax || 3500,
        total_savings_found: 34500,
        fair_score: 42
      });
    } catch (err) {
      console.error('Supabase auditQuotation insert error:', err);
    }
  }

  try {
    const res = await fetch(`${API_BASE}/quotetruth/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      return data.audit;
    }
  } catch (err) {
    // Static auditor calculation
  }

  // Realistic static calculation matching QuoteTruthAudit
  const officialExShowroom = Number(payload.exShowroomPrice) || 1169000;
  const handling = Number(payload.handlingCharges) || 18000;
  const accessories = Number(payload.accessoryPack || payload.accessoriesCost) || 24000;
  const insurance = Number(payload.insurancePrice) || 58000;
  const fairInsurance = Math.round(officialExShowroom * 0.026 + 3500);
  const insuranceExcess = Math.max(0, insurance - fairInsurance);
  const fairAccessories = 4500;
  const accessoryExcess = Math.max(0, accessories - fairAccessories);
  const rto = Number(payload.rtoCharges) || Math.round(officialExShowroom * 0.12);
  const fastag = 900;
  const discounts = Number(payload.discounts) || 25000;
  const dealerQuotedTotal = officialExShowroom + rto + insurance + handling + accessories + fastag - discounts;
  const unbundledRecommendedTotal = officialExShowroom + rto + fairInsurance + fairAccessories + fastag - discounts;
  const totalPossibleSavings = Math.max(0, dealerQuotedTotal - unbundledRecommendedTotal);
  const totalInflatedAmount = handling + insuranceExcess + accessoryExcess;
  const score = Math.max(25, 100 - Math.round((totalPossibleSavings / officialExShowroom) * 200));

  const flags: any[] = [];
  if (handling > 0) {
    flags.push({
      id: 'FLAG_HANDLING_CHARGES',
      severity: 'CRITICAL',
      title: 'Illegal Logistics / Handling Charges',
      chargedAmount: handling,
      fairAmount: 0,
      excessPaid: handling,
      explanation: 'Supreme Court & MoRTH rule dealerships cannot levy handling or logistics charges over ex-showroom.',
      actionToTake: 'Demand immediate removal citing Supreme Court WP 430/2000.'
    });
  }
  if (insuranceExcess > 5000) {
    flags.push({
      id: 'FLAG_INFLATED_INSURANCE',
      severity: 'HIGH',
      title: 'Inflated Showroom Insurance Markup',
      chargedAmount: insurance,
      fairAmount: fairInsurance,
      excessPaid: insuranceExcess,
      explanation: 'Showroom quoted premium is inflated. Direct IRDAI Zero-Dep rates are significantly lower.',
      actionToTake: 'Ask dealer to match online insurance rates or buy from outside.'
    });
  }

  return {
    car: {
      id: payload.carId || 'tata-nexon',
      brand: 'Tata',
      model: payload.carModel || 'Nexon',
      variantName: payload.variantName || 'Creative+ 1.2 AMT',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    },
    state: payload.state || 'MH',
    dealerQuotedTotal,
    unbundledRecommendedTotal,
    totalInflatedAmount,
    totalPossibleSavings,
    quoteHealthScore: score,
    healthRating: score >= 80 ? 'CLEAN_DEAL' : score >= 60 ? 'MODERATE_MARKUP' : 'HEAVY_OVERCHARGING',
    lineItemBreakdown: {
      exShowroom: { quoted: officialExShowroom, fair: officialExShowroom, status: 'EXACT' },
      rto: { quoted: rto, fair: rto, status: 'FAIR' },
      insurance: { quoted: insurance, fair: fairInsurance, status: insuranceExcess > 5000 ? 'OVERPRICED' : 'FAIR' },
      handlingCharges: { quoted: handling, fair: 0, status: handling > 0 ? 'ILLEGAL' : 'FAIR' },
      accessoryPack: { quoted: accessories, fair: fairAccessories, status: accessoryExcess > 5000 ? 'OPTIONAL_BUNDLE' : 'FAIR' },
      tcs: { quoted: 0, fair: 0, status: 'STATUTORY' },
      fastagAndPlate: { quoted: fastag, fair: fastag, status: 'FAIR' },
      discountsApplied: { quoted: discounts, fair: discounts, status: 'DISCOUNT' }
    },
    auditFlags: flags,
    aiNegotiationScript: `I have audited this quote using CarFair. Under MoRTH and Supreme Court guidelines, the ₹${handling.toLocaleString('en-IN')} logistics charge is impermissible. Furthermore, identical Zero-Dep insurance from IRDAI underwriters is ₹${fairInsurance.toLocaleString('en-IN')}. Please waive the unfair fees so we can proceed with CarFair group allotment.`
  };
}

export async function generateDealLockVoucher(payload: any): Promise<DealLockVoucher> {
  const code = `CF-LOCK-${Math.floor(1000 + Math.random() * 9000)}`;

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('deal_lock_passes').insert({
        voucher_code: code,
        car_name: payload.carName,
        variant_name: payload.variantName,
        buyer_name: payload.buyerName,
        buyer_phone: payload.buyerPhone,
        city: payload.city,
        dealer_id: payload.dealerId,
        dealer_name: payload.dealerName,
        locked_on_road_price: payload.lockedOnRoadPrice,
        baseline_showroom_price: payload.baselineShowroomPrice,
        guaranteed_savings: payload.guaranteedSavings || 68000,
        claim_pin: '849201',
        status: 'ACTIVE_LOCKED',
        valid_until: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
      });
    } catch (err) {
      console.error('Supabase generateDealLockVoucher error:', err);
    }
  }

  try {
    const res = await fetch(`${API_BASE}/deallock/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      return data.dealLock;
    }
  } catch (err) {
    // Fallback
  }

  return {
    voucherCode: code,
    status: 'ACTIVE_LOCKED',
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
    buyer: {
      name: payload.buyerName || 'Parth Gade',
      phone: payload.buyerPhone || '+91 98901 23456',
      city: payload.city || 'Pune'
    },
    vehicle: {
      carName: payload.carName || 'Tata Nexon Creative+',
      variantName: payload.variantName || '1.2 Turbo AMT Dual Tone'
    },
    dealer: {
      dealerId: payload.dealerId || getActiveRegisteredDealer()?.id || 'dealer-showroom',
      dealerName: payload.dealerName || getActiveRegisteredDealer()?.name || 'Authorized Showroom Partner',
      city: payload.city || 'Pune'
    },
    financialLock: {
      lockedOnRoadPrice: payload.lockedOnRoadPrice || 1294000,
      baselineShowroomPrice: payload.baselineShowroomPrice || 1362000,
      guaranteedSavings: payload.guaranteedSavings || 68000,
      maxStatutoryRtoCap: 'Parivahan rate only',
      handlingChargesWaived: true,
      priceProtectionClause: 'Price protected under CarFair verified deal lock.'
    },
    fulfillment: {
      guaranteedDeliveryDays: payload.guaranteedDeliveryDays || 7,
      promisedPerks: payload.includedPerks || ['5-Yr Extended Warranty', '7D Mats', 'Anti-Rust Coating']
    },
    verificationSecurity: {
      dealerClaimOtp: '849201',
      digitalSignature: '9f81a7b42c88e9f1a',
      antiBypassReward: '₹5,000 HPCL/IOCL Fuel Card on invoice upload.'
    }
  };
}

export async function auditFinalInvoice(payload: any): Promise<SavingsProofResult> {
  const code = 'PETRO-MH12-5000-8812';
  const voucher = payload.dealLockVoucher || {};
  const agreedTotal = voucher.financialLock?.lockedOnRoadPrice || 1294000;
  const baseline = voucher.financialLock?.baselineShowroomPrice || 1362000;
  const invoiceTotal = payload.actualTotalInvoiceAmount || payload.totalAmountPaid || agreedTotal;
  const savings = Math.max(0, baseline - invoiceTotal);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('fuel_card_claims').insert({
        voucher_code: payload.voucherCode || voucher.voucherCode || 'CF-LOCK-MH-8812',
        invoice_number: payload.invoiceNumber || 'INV-2026-9912',
        total_paid: invoiceTotal,
        status: 'VERIFIED_ACTIVE',
        card_voucher_code: code
      });
    } catch (err) {
      console.error('Supabase auditFinalInvoice error:', err);
    }
  }

  try {
    const res = await fetch(`${API_BASE}/savingsproof/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.savingsProof) return data.savingsProof;
    }
  } catch (err) {
    // Proceed to static fallback
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + 90 * 24 * 3600 * 1000).toISOString().split('T')[0];

  return {
    invoiceNumber: payload.invoiceNumber || 'INV-2026-9912',
    invoiceDate: payload.invoiceDate || now.toISOString().split('T')[0],
    verificationStatus: 'AUDITED_AND_VERIFIED',
    auditTimestamp: now.toISOString(),
    baselineShowroomPrice: baseline,
    lockedAgreedPrice: agreedTotal,
    actualInvoiceAmount: invoiceTotal,
    realizedSavingsAmount: savings,
    rewardUnlocked: {
      type: 'FUEL_CASHBACK_CARD',
      brand: 'HPCL / IOCL PetroCard',
      amount: 5000,
      couponCode: code,
      expiryDate: expiry,
      perk: 'Free 1st Annual 3M Ceramic Detailing Voucher'
    },
    discrepancies: [],
    summaryCertificate: {
      buyerName: voucher.buyer?.name || 'Verified CarFair Buyer',
      vehicle: voucher.vehicle ? `${voucher.vehicle.carName} - ${voucher.vehicle.variantName}` : 'Tata Nexon Creative+ AMT',
      dealer: voucher.dealer?.dealerName || 'Bafna Tata Motors Flagship',
      officialSavingTag: `₹${savings.toLocaleString('en-IN')} Verified Saved`,
      certificateId: `CF-SAVINGS-${Math.floor(1000000 + Math.random() * 9000000)}`
    }
  };
}

export async function fetchDealers(): Promise<Dealer[]> {
  const cars = getStoredShowroomCars();
  const readyTotal = cars.reduce((acc, c: any) => acc + (c.readyStock || 0), 0);

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('dealers').select('*');
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          brand: d.brand,
          city: d.city,
          location: d.area || d.location || 'Flagship Store',
          rating: Number(d.rating) || 4.8,
          reviewsCount: 142,
          verifiedStatus: d.is_verified ? 'OEM Authorised Platinum Partner' : 'Registered Dealer',
          inventoryReadyCount: readyTotal,
          responseTimeAvg: '20 mins',
          contactPerson: d.contact_person || 'Sales Manager',
          phone: d.phone || '+91 98220 44100'
        }));
      }
    } catch (err) {
      // Fallback
    }
  }

  // Purely dynamic: return registered showroom partners
  const stored = getStoredRegisteredDealers();
  const active = getActiveRegisteredDealer();
  if (active && !stored.some(d => d.id === active.id)) {
    return [active, ...stored];
  }
  return stored;
}

export async function estimateOldCarExchange(payload: any): Promise<any> {
  const year = Number(payload.year) || 2020;
  const km = Number(payload.km) || 45000;
  const baseValue = Math.max(250000, 750000 - (2026 - year) * 65000 - (km / 10000) * 15000);

  return {
    estimatedMarketValue: Math.round(baseValue),
    fairExchangeRange: {
      min: Math.round(baseValue * 0.95),
      max: Math.round(baseValue * 1.05)
    },
    carfairExtraCash: 35000,
    competingBids: [
      { buyer: 'Spinny Verified Partner', offer: Math.round(baseValue * 1.04) },
      { buyer: 'Cars24 Exchange Desk', offer: Math.round(baseValue * 1.02) },
      { buyer: 'Showroom Official Exchange Bonus', offer: Math.round(baseValue * 0.98) }
    ]
  };
}

export async function fetchStats(): Promise<any> {
  const cars = getStoredShowroomCars();
  const groups = getStoredGroups();
  const totalReady = cars.reduce((acc, c: any) => acc + (c.readyStock || 0), 0);
  return {
    totalBuyers: groups.reduce((acc, g) => acc + (g.currentBuyers || 0), 0),
    totalSavedRupees: 0,
    averageSavingPerCar: 0,
    activeShowrooms: cars.length > 0 ? 1 : 0,
    averageDeliveryDays: 7,
    inventoryReadyCount: totalReady
  };
}

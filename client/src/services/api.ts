import { Car, BuyingGroup, QuoteTruthAudit, DealLockVoucher, SavingsProofResult, Dealer } from '../types';

const API_BASE = '/api';

export async function fetchCars(): Promise<Car[]> {
  try {
    const res = await fetch(`${API_BASE}/cars`);
    const data = await res.json();
    return data.cars || [];
  } catch (err) {
    console.error('Failed to fetch cars:', err);
    return [];
  }
}

export async function fetchGroups(city?: string, brand?: string): Promise<BuyingGroup[]> {
  try {
    let url = `${API_BASE}/groups`;
    const params = new URLSearchParams();
    if (city && city !== 'All') params.append('city', city);
    if (brand && brand !== 'All') params.append('brand', brand);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    return data.groups || [];
  } catch (err) {
    console.error('Failed to fetch groups:', err);
    return [];
  }
}

export async function joinGroup(groupId: string, payload: {
  name: string;
  phone: string;
  purchaseTimeline: string;
  isFinancingPreApproved: boolean;
}): Promise<{ success: boolean; group: BuyingGroup; message: string }> {
  const res = await fetch(`${API_BASE}/groups/${groupId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function createGroup(payload: any): Promise<{ success: boolean; group: BuyingGroup }> {
  const res = await fetch(`${API_BASE}/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function submitDealerBid(groupId: string, payload: any): Promise<{ success: boolean; group: BuyingGroup }> {
  const res = await fetch(`${API_BASE}/groups/${groupId}/bid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function auditQuotation(payload: any): Promise<QuoteTruthAudit> {
  const res = await fetch(`${API_BASE}/quotetruth/audit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  return data.audit;
}

export async function generateDealLockVoucher(payload: any): Promise<DealLockVoucher> {
  const res = await fetch(`${API_BASE}/deallock/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  return data.dealLock;
}

export async function auditFinalInvoice(payload: any): Promise<SavingsProofResult> {
  const res = await fetch(`${API_BASE}/savingsproof/audit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  return data.savingsProof;
}

export async function fetchDealers(): Promise<Dealer[]> {
  try {
    const res = await fetch(`${API_BASE}/dealers`);
    const data = await res.json();
    return data.dealers || [];
  } catch (err) {
    return [];
  }
}

export async function estimateOldCarExchange(payload: any): Promise<any> {
  const res = await fetch(`${API_BASE}/exchange/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchStats(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    const data = await res.json();
    return data.stats;
  } catch (err) {
    return null;
  }
}

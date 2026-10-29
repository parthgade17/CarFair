export interface CarVariant {
  id: string;
  name: string;
  exShowroom: number;
  fuel: string;
  transmission: string;
  engineCc: number;
  seating: number;
  mileage: string;
}

export interface CarImageItem {
  id: string;
  url: string;
  caption?: string;
  category?: 'EXTERIOR' | 'INTERIOR' | 'COCKPIT' | 'REAR' | 'SHOWROOM_FLOOR' | 'DELIVERY';
  uploadedBy?: string;
  uploadedAt?: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  segment: string;
  image: string;
  images?: string[];
  imageDetails?: CarImageItem[];
  tagline: string;
  fuelTypes: string[];
  transmissions: string[];
  priceRange: string;
  variants: CarVariant[];
}

export interface DiscountTier {
  minBuyers: number;
  discountPerBuyer: number;
  perk: string;
}

export interface ReverseBid {
  id: string;
  dealerId: string;
  dealerName: string;
  submittedAt: string;
  exShowroomDiscount: number;
  corporateExchangeBonus: number;
  freebies: string[];
  insuranceMatchPrice: number;
  waivedHandlingCharges: boolean;
  deliveryDays: number;
  finalOnRoadPerUnit: number;
  isWinning: boolean;
  terms: string;
}

export interface BuyingGroup {
  id: string;
  carId: string;
  variantId: string;
  carName: string;
  images?: string[];
  imageDetails?: CarImageItem[];
  city: string;
  state: string;
  communityName: string;
  status: 'RECRUITING' | 'ACTIVE_BIDDING' | 'DEAL_LOCKED' | 'COMPLETED';
  biddingEndsAt: string;
  targetBuyers: number;
  currentBuyers: number;
  verifiedBuyers: number;
  discountTiers: DiscountTier[];
  currentUnlockedTier: number;
  baselineShowroomPrice: number;
  currentBestGroupPrice: number;
  verifiedSavingsTotal: number;
  bids: ReverseBid[];
}

export interface AuditFlag {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  chargedAmount: number;
  fairAmount: number;
  excessPaid: number;
  explanation: string;
  actionToTake: string;
}

export interface LineItemAudit {
  quoted: number;
  fair: number;
  status: 'EXACT' | 'FAIR' | 'INFLATED' | 'OVERPRICED' | 'ILLEGAL' | 'OPTIONAL_BUNDLE' | 'STATUTORY' | 'DISCOUNT';
}

export interface QuoteTruthAudit {
  car: {
    id: string;
    brand: string;
    model: string;
    variantName: string;
    image: string;
  };
  state: string;
  dealerQuotedTotal: number;
  unbundledRecommendedTotal: number;
  totalInflatedAmount: number;
  totalPossibleSavings: number;
  quoteHealthScore: number;
  healthRating: 'CLEAN_DEAL' | 'MODERATE_MARKUP' | 'HEAVY_OVERCHARGING';
  lineItemBreakdown: {
    exShowroom: LineItemAudit;
    rto: LineItemAudit;
    insurance: LineItemAudit;
    handlingCharges: LineItemAudit;
    accessoryPack: LineItemAudit;
    tcs: LineItemAudit;
    fastagAndPlate: LineItemAudit;
    discountsApplied: LineItemAudit;
  };
  auditFlags: AuditFlag[];
  aiNegotiationScript: string;
}

export interface DealLockVoucher {
  voucherCode: string;
  status: 'ACTIVE_LOCKED' | 'REDEEMED' | 'EXPIRED';
  createdAt: string;
  validUntil: string;
  buyer: {
    name: string;
    phone: string;
    city: string;
  };
  vehicle: {
    carName: string;
    variantName: string;
  };
  dealer: {
    dealerId: string;
    dealerName: string;
    city: string;
  };
  financialLock: {
    lockedOnRoadPrice: number;
    baselineShowroomPrice: number;
    guaranteedSavings: number;
    maxStatutoryRtoCap: string;
    handlingChargesWaived: boolean;
    priceProtectionClause: string;
  };
  fulfillment: {
    guaranteedDeliveryDays: number;
    promisedPerks: string[];
  };
  verificationSecurity: {
    dealerClaimOtp: string;
    digitalSignature: string;
    antiBypassReward: string;
  };
}

export interface SavingsProofResult {
  invoiceNumber: string;
  invoiceDate: string;
  verificationStatus: 'AUDITED_AND_VERIFIED' | 'DISCREPANCY_FLAGGED';
  auditTimestamp: string;
  baselineShowroomPrice: number;
  lockedAgreedPrice: number;
  actualInvoiceAmount: number;
  realizedSavingsAmount: number;
  rewardUnlocked: {
    type: string;
    brand: string;
    amount: number;
    couponCode: string;
    expiryDate: string;
    perk: string;
  };
  discrepancies: Array<{
    item: string;
    expected: number;
    actual: number;
    status: string;
    note: string;
  }>;
  summaryCertificate: {
    buyerName: string;
    vehicle: string;
    dealer: string;
    officialSavingTag: string;
    certificateId: string;
  };
}

export interface Dealer {
  id: string;
  name: string;
  brand: string;
  city: string;
  location: string;
  rating: number;
  reviewsCount: number;
  verifiedStatus: string;
  inventoryReadyCount: number;
  responseTimeAvg: string;
  contactPerson: string;
  phone: string;
}

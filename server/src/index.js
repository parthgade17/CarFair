import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { CARS_CATALOG } from './data/cars.js';
import { AUTHORIZED_DEALERS } from './data/dealers.js';
import { INITIAL_BUYING_GROUPS } from './data/groups.js';
import { auditQuotation } from './services/quoteTruthEngine.js';
import { generateDealLock } from './services/dealLockEngine.js';
import { auditFinalInvoice } from './services/savingsProofEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory state for lightning-fast real-time responsiveness
let groups = [...INITIAL_BUYING_GROUPS];
let lockedDeals = [];
let auditedInvoices = [];

// 1. Cars Catalog
app.get('/api/cars', (req, res) => {
  res.json({ success: true, count: CARS_CATALOG.length, cars: CARS_CATALOG });
});

// 2. Active Groups
app.get('/api/groups', (req, res) => {
  const { city, brand } = req.query;
  let filtered = [...groups];
  if (city && city !== 'All Cities') {
    filtered = filtered.filter(g => g.city.toLowerCase() === city.toLowerCase());
  }
  if (brand && brand !== 'All') {
    filtered = filtered.filter(g => g.carName.toLowerCase().includes(brand.toLowerCase()));
  }
  res.json({ success: true, count: filtered.length, groups: filtered });
});

app.get('/api/groups/:id', (req, res) => {
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ success: false, message: 'Group not found' });
  res.json({ success: true, group });
});

// 3. Create Group / Community Pool
app.post('/api/groups', (req, res) => {
  const { carId, variantId, city, state = 'MH', communityName, targetBuyers = 20 } = req.body;
  const car = CARS_CATALOG.find(c => c.id === carId) || CARS_CATALOG[0];
  const variant = car.variants.find(v => v.id === variantId) || car.variants[0];

  const newGroup = {
    id: `grp-${car.id}-${city.toLowerCase().replace(/\s+/g, '')}-${Date.now().toString().slice(-4)}`,
    carId: car.id,
    variantId: variant.id,
    carName: `${car.brand} ${car.model} ${variant.name}`,
    city,
    state,
    communityName: communityName || `${city} Verified Buyers Club`,
    status: 'ACTIVE_BIDDING',
    biddingEndsAt: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    targetBuyers: Number(targetBuyers),
    currentBuyers: 1,
    verifiedBuyers: 1,
    discountTiers: [
      { minBuyers: 5, discountPerBuyer: 25000, perk: 'Free Mudflaps & Matting' },
      { minBuyers: 10, discountPerBuyer: 45000, perk: 'Free Anti-Rust Treatment' },
      { minBuyers: 20, discountPerBuyer: 70000, perk: 'Extended Warranty + Ceramic Detailing' }
    ],
    currentUnlockedTier: 0,
    baselineShowroomPrice: Math.round(variant.exShowroom * 1.18),
    currentBestGroupPrice: Math.round(variant.exShowroom * 1.14),
    verifiedSavingsTotal: Math.round(variant.exShowroom * 0.04),
    bids: []
  };

  groups.unshift(newGroup);
  res.status(201).json({ success: true, group: newGroup, message: 'Group created successfully!' });
});

// 4. Join Group with Verification
app.post('/api/groups/:id/join', (req, res) => {
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ success: false, message: 'Group not found' });

  const { purchaseTimeline, isFinancingPreApproved } = req.body;
  group.currentBuyers += 1;
  if (isFinancingPreApproved || purchaseTimeline === 'Immediate') {
    group.verifiedBuyers += 1;
  }

  // Update unlocked tiers dynamically
  let highestTier = 0;
  group.discountTiers.forEach((tier, index) => {
    if (group.currentBuyers >= tier.minBuyers) {
      highestTier = index;
    }
  });
  group.currentUnlockedTier = highestTier;
  const currentDiscount = group.discountTiers[highestTier]?.discountPerBuyer || 25000;
  group.currentBestGroupPrice = group.baselineShowroomPrice - currentDiscount;
  group.verifiedSavingsTotal = currentDiscount;

  res.json({
    success: true,
    group,
    message: `You've joined the ${group.carName} group! Your spot is reserved.`
  });
});

// 5. Submit Reverse Dealer Bid
app.post('/api/groups/:id/bid', (req, res) => {
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ success: false, message: 'Group not found' });

  const {
    dealerId,
    dealerName,
    exShowroomDiscount,
    corporateExchangeBonus = 0,
    freebies = [],
    insuranceMatchPrice,
    waivedHandlingCharges = true,
    deliveryDays = 7,
    terms
  } = req.body;

  const totalDiscount = Number(exShowroomDiscount) + Number(corporateExchangeBonus);
  const calculatedOnRoad = Math.max(800000, group.baselineShowroomPrice - totalDiscount - (waivedHandlingCharges ? 18000 : 0));

  const newBid = {
    id: `bid-${Date.now()}`,
    dealerId: dealerId || 'dealer-custom',
    dealerName: dealerName || 'Authorized Dealership',
    submittedAt: new Date().toISOString(),
    exShowroomDiscount: Number(exShowroomDiscount),
    corporateExchangeBonus: Number(corporateExchangeBonus),
    freebies,
    insuranceMatchPrice: Number(insuranceMatchPrice) || 32000,
    waivedHandlingCharges: Boolean(waivedHandlingCharges),
    deliveryDays: Number(deliveryDays),
    finalOnRoadPerUnit: calculatedOnRoad,
    isWinning: false,
    terms: terms || 'Dealer guaranteed price for all verified members of this CarFair group.'
  };

  group.bids.push(newBid);

  // Recalculate winning bid (lowest on-road)
  group.bids.sort((a, b) => a.finalOnRoadPerUnit - b.finalOnRoadPerUnit);
  group.bids.forEach((b, idx) => {
    b.isWinning = idx === 0;
  });

  group.currentBestGroupPrice = group.bids[0].finalOnRoadPerUnit;
  group.verifiedSavingsTotal = group.baselineShowroomPrice - group.currentBestGroupPrice;

  res.status(201).json({ success: true, bid: newBid, group });
});

// 6. QuoteTruth AI Auditor
app.post('/api/quotetruth/audit', (req, res) => {
  try {
    const auditResult = auditQuotation(req.body);
    res.json({ success: true, audit: auditResult });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 7. DealLock Generator
app.post('/api/deallock/generate', (req, res) => {
  try {
    const deal = generateDealLock(req.body);
    lockedDeals.push(deal);
    res.status(201).json({ success: true, dealLock: deal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 8. SavingsProof Final Invoice Auditor
app.post('/api/savingsproof/audit', (req, res) => {
  try {
    const audit = auditFinalInvoice(req.body);
    auditedInvoices.push(audit);
    res.json({ success: true, savingsProof: audit });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 9. Dealers
app.get('/api/dealers', (req, res) => {
  res.json({ success: true, count: AUTHORIZED_DEALERS.length, dealers: AUTHORIZED_DEALERS });
});

// 10. Old Car Exchange Valuation Bidding
app.post('/api/exchange/estimate', (req, res) => {
  const { make, model, year, kilometers } = req.body;
  const currentYear = 2026;
  const age = Math.max(1, currentYear - Number(year || 2019));
  
  const baseValue = 550000;
  const depreciationFactor = Math.pow(0.88, age);
  const mileageFactor = Math.max(0.7, 1 - (Number(kilometers || 40000) / 250000));
  const estimatedFairPrice = Math.round(baseValue * depreciationFactor * mileageFactor);

  const bids = [
    {
      network: 'Spinny Verified Trade-in Partner',
      bidAmount: estimatedFairPrice + 18000,
      inspectionType: 'Free Home PDI in 24 Hrs',
      instantPayment: true
    },
    {
      network: 'Maruti True Value Certified Hub',
      bidAmount: estimatedFairPrice + 12000,
      inspectionType: 'Showroom Counter Inspection',
      instantPayment: true
    },
    {
      network: 'Cars24 B2B Dealer Exchange',
      bidAmount: estimatedFairPrice + 8000,
      inspectionType: 'Direct Instant Account Transfer',
      instantPayment: true
    }
  ];

  res.json({
    success: true,
    vehicleSummary: `${year} ${make} ${model}`,
    estimatedFairPrice,
    competingBids: bids,
    singleDealerAverageOffer: estimatedFairPrice - 35000,
    exchangeAdvantage: 35000 + 18000
  });
});

// 11. Platform Stats
app.get('/api/stats', (req, res) => {
  const totalVerifiedSavings = groups.reduce((acc, g) => acc + (g.verifiedSavingsTotal * g.verifiedBuyers), 14280000);
  res.json({
    success: true,
    stats: {
      totalVerifiedSavings,
      totalCarsDelivered: 214,
      activeDealersCount: AUTHORIZED_DEALERS.length + 18,
      activeBuyersInGroups: groups.reduce((acc, g) => acc + g.currentBuyers, 0),
      averageSavingsPerBuyer: '₹68,400',
      biddingSuccessRate: '94.2%',
      averageDeliveryTimeline: '8.4 Days'
    }
  });
});

// Serve frontend build if dist folder exists
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`CarFair Server running on http://localhost:${PORT}`);
});

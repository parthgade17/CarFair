import { CARS_CATALOG, STATE_RTO_RATES } from '../data/cars.js';

/**
 * QuoteTruth AI Auditor
 * Normalizes Indian dealership quotations, identifies hidden markup traps,
 * unbundles inflated add-ons, and provides an actionable audit report.
 */
export function auditQuotation(quoteData) {
  const {
    carId,
    variantId,
    state = 'MH',
    exShowroomPrice,
    rtoCharges,
    insurancePrice,
    insuranceZeroDep = true,
    handlingCharges = 0,
    accessoryPack = 0,
    extendedWarranty = 0,
    fastag = 500,
    hsrpNumberPlate = 400,
    discounts = 0,
    corporateBonus = 0,
    exchangeBonus = 0
  } = quoteData;

  const car = CARS_CATALOG.find(c => c.id === carId) || CARS_CATALOG[0];
  const variant = car.variants.find(v => v.id === variantId) || car.variants[0];

  const officialExShowroom = variant.exShowroom;
  const stateRate = STATE_RTO_RATES[state] || STATE_RTO_RATES['MH'];

  // Statutory RTO calculation
  const fuelType = variant.fuel.toLowerCase();
  const rtoTaxRate = fuelType === 'ev' 
    ? stateRate.evTax 
    : fuelType === 'diesel' 
      ? stateRate.dieselTax 
      : stateRate.petrolTax;

  const calculatedStatutoryRto = Math.round(officialExShowroom * (rtoTaxRate + stateRate.cess));
  
  // TCS calculation (1% if ex-showroom > 10 Lakhs)
  const statutoryTCS = officialExShowroom > 1000000 ? Math.round(officialExShowroom * 0.01) : 0;

  // Realistic Market Insurance benchmark (1 Yr OD + 3 Yr TP + Zero Dep + RTI + Engine Protect)
  // Typically 2.2% - 2.8% of IDV for compact/mid SUVs instead of dealer's 4.5% - 5.5%
  const fairMarketInsurance = Math.round(officialExShowroom * 0.026 + 3500);

  // Essential basic accessories cost vs dealer inflated pack
  const fairEssentialAccessoriesCost = 4500; // Mats, mudflaps, trunk mat

  // Fair extended warranty (2 additional years)
  const fairExtendedWarranty = Math.round(officialExShowroom * 0.014);

  // Total Quoted by Dealer
  const dealerQuotedTotal = Math.round(
    Number(exShowroomPrice || officialExShowroom) +
    Number(rtoCharges || calculatedStatutoryRto) +
    Number(insurancePrice || fairMarketInsurance * 1.55) +
    Number(handlingCharges || 0) +
    Number(accessoryPack || 0) +
    Number(extendedWarranty || 0) +
    Number(fastag || 500) +
    Number(hsrpNumberPlate || 400) +
    Number(statutoryTCS) -
    Number(discounts || 0) -
    Number(corporateBonus || 0) -
    Number(exchangeBonus || 0)
  );

  // Audit Flags & Discrepancies
  const auditFlags = [];
  let totalInflatedAmount = 0;

  // 1. Handling / Logistics Charges (Strictly ILLEGAL as per MoRTH & High Courts)
  if (handlingCharges > 0) {
    auditFlags.push({
      id: 'FLAG_HANDLING_CHARGES',
      severity: 'CRITICAL',
      title: 'Illegal Handling / Logistics Charges Detected',
      chargedAmount: handlingCharges,
      fairAmount: 0,
      excessPaid: handlingCharges,
      explanation: `The dealer is charging ₹${handlingCharges.toLocaleString('en-IN')} under "${quoteData.handlingChargeLabel || 'Logistics / Handling / Depot'}" fee. As per MoRTH notifications and Supreme Court rulings, dealerships cannot charge any depot, handling, or PDI charges for showroom delivery.`,
      actionToTake: 'Demand immediate removal citing MoRTH circular. If they refuse, report to CarFair Deal Concierge or State Transport Commissioner.'
    });
    totalInflatedAmount += handlingCharges;
  }

  // 2. Insurance Overcharging
  const insuranceExcess = Number(insurancePrice) - fairMarketInsurance;
  if (insuranceExcess > 8000) {
    auditFlags.push({
      id: 'FLAG_INFLATED_INSURANCE',
      severity: 'HIGH',
      title: 'Dealer Insurance Markup (~40-60% Overpriced)',
      chargedAmount: insurancePrice,
      fairAmount: fairMarketInsurance,
      excessPaid: insuranceExcess,
      explanation: `The showroom quoted ₹${insurancePrice.toLocaleString('en-IN')} for insurance. An equivalent IRDAI-approved Zero-Depreciation + RTI policy directly from Acko/Tata AIG/Iffco-Tokio with 1+3 year coverage costs ~₹${fairMarketInsurance.toLocaleString('en-IN')}.`,
      actionToTake: 'Ask dealer to match the online quotation for identical add-ons, or exercise your legal right to take third-party insurance.'
    });
    totalInflatedAmount += insuranceExcess;
  }

  // 3. Forced Accessory Kit
  if (accessoryPack > 12000) {
    const accessoryExcess = accessoryPack - fairEssentialAccessoriesCost;
    auditFlags.push({
      id: 'FLAG_FORCED_ACCESSORIES',
      severity: 'MEDIUM',
      title: 'Inflated Dealer Essential Accessory Kit',
      chargedAmount: accessoryPack,
      fairAmount: fairEssentialAccessoriesCost,
      excessPaid: accessoryExcess,
      explanation: `Showroom bundled ₹${accessoryPack.toLocaleString('en-IN')} of accessories (often basic chrome strips, ₹300 perfume, and overpriced mats). High-quality 7D mats and mudflaps cost only ₹${fairEssentialAccessoriesCost.toLocaleString('en-IN')}.`,
      actionToTake: 'Opt out of the mandatory accessory combo. Buy only what you need or request CarFair group inclusion.'
    });
    totalInflatedAmount += accessoryExcess;
  }

  // 4. RTO Discrepancy
  const rtoExcess = Number(rtoCharges) - calculatedStatutoryRto;
  if (rtoExcess > 4000) {
    auditFlags.push({
      id: 'FLAG_RTO_PADDING',
      severity: 'MEDIUM',
      title: 'RTO / Statutory Fee Padding',
      chargedAmount: rtoCharges,
      fairAmount: calculatedStatutoryRto,
      excessPaid: rtoExcess,
      explanation: `Calculated official ${stateRate.name} registration fee is ₹${calculatedStatutoryRto.toLocaleString('en-IN')}, but dealer quoted ₹${Number(rtoCharges).toLocaleString('en-IN')}. Dealerships often pad agent fees or fake smart card fees.`,
      actionToTake: 'Ask for the official Parivahan / Vahan government receipt breakdown.'
    });
    totalInflatedAmount += rtoExcess;
  }

  // Unbundled Recommended Price
  const unbundledRecommendedTotal = Math.round(
    officialExShowroom +
    calculatedStatutoryRto +
    fairMarketInsurance +
    fairEssentialAccessoriesCost +
    fastag +
    hsrpNumberPlate +
    statutoryTCS -
    (Number(discounts) + Number(corporateBonus) + Number(exchangeBonus))
  );

  // Calculate Health & Trust Score (0 - 100)
  let quoteHealthScore = 100;
  if (handlingCharges > 0) quoteHealthScore -= 35;
  if (insuranceExcess > 15000) quoteHealthScore -= 25;
  else if (insuranceExcess > 8000) quoteHealthScore -= 15;
  if (accessoryPack > 20000) quoteHealthScore -= 15;
  if (rtoExcess > 5000) quoteHealthScore -= 10;
  quoteHealthScore = Math.max(10, Math.min(100, quoteHealthScore));

  const totalPossibleSavings = dealerQuotedTotal - unbundledRecommendedTotal;

  return {
    car: {
      id: car.id,
      brand: car.brand,
      model: car.model,
      variantName: variant.name,
      image: car.image
    },
    state: stateRate.name,
    dealerQuotedTotal,
    unbundledRecommendedTotal,
    totalInflatedAmount,
    totalPossibleSavings: Math.max(0, totalPossibleSavings),
    quoteHealthScore,
    healthRating: quoteHealthScore >= 80 ? 'CLEAN_DEAL' : quoteHealthScore >= 60 ? 'MODERATE_MARKUP' : 'HEAVY_OVERCHARGING',
    lineItemBreakdown: {
      exShowroom: { quoted: Number(exShowroomPrice || officialExShowroom), fair: officialExShowroom, status: 'EXACT' },
      rto: { quoted: Number(rtoCharges || calculatedStatutoryRto), fair: calculatedStatutoryRto, status: rtoExcess > 4000 ? 'INFLATED' : 'FAIR' },
      insurance: { quoted: Number(insurancePrice || fairMarketInsurance * 1.5), fair: fairMarketInsurance, status: insuranceExcess > 8000 ? 'OVERPRICED' : 'FAIR' },
      handlingCharges: { quoted: Number(handlingCharges), fair: 0, status: handlingCharges > 0 ? 'ILLEGAL' : 'CLEAN' },
      accessoryPack: { quoted: Number(accessoryPack), fair: fairEssentialAccessoriesCost, status: accessoryPack > 12000 ? 'OPTIONAL_BUNDLE' : 'FAIR' },
      tcs: { quoted: statutoryTCS, fair: statutoryTCS, status: 'STATUTORY' },
      fastagAndPlate: { quoted: Number(fastag) + Number(hsrpNumberPlate), fair: 900, status: 'FAIR' },
      discountsApplied: { quoted: Number(discounts) + Number(corporateBonus) + Number(exchangeBonus), fair: Number(discounts), status: 'DISCOUNT' }
    },
    auditFlags,
    aiNegotiationScript: `I have reviewed the quotation for ${car.brand} ${car.model} (${variant.name}). As per MoRTH and transport department regulations, the ₹${(handlingCharges || 0).toLocaleString('en-IN')} handling/depot charges cannot be levied. Additionally, I have an official quote from an IRDAI-registered insurer for ₹${fairMarketInsurance.toLocaleString('en-IN')} with Zero Dep and Engine Protect. If you can match this insurance and waive the unbundled accessory pack of ₹${(accessoryPack || 0).toLocaleString('en-IN')}, I am ready to book with CarFair group allocation today.`
  };
}

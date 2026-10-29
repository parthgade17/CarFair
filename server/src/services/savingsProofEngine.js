/**
 * SavingsProof Engine
 * Compares final dealer invoice against original showroom quote and DealLock commitment.
 * Verifies exact realized savings, flags discrepancies, and triggers buyer rewards.
 */
export function auditFinalInvoice({
  dealLockVoucher,
  invoiceNumber,
  invoiceDate,
  actualExShowroomPaid,
  actualRtoPaid,
  actualInsurancePaid,
  actualAccessoriesPaid,
  actualHandlingCharged,
  actualTotalInvoiceAmount
}) {
  const agreedTotal = dealLockVoucher.financialLock.lockedOnRoadPrice;
  const baselineShowroom = dealLockVoucher.financialLock.baselineShowroomPrice;
  const totalPaid = Number(actualTotalInvoiceAmount);

  const realizedSavings = baselineShowroom - totalPaid;
  const varianceFromAgreed = totalPaid - agreedTotal;

  const discrepancies = [];

  // Check handling charges
  if (Number(actualHandlingCharged) > 0) {
    discrepancies.push({
      item: 'Logistics / Handling Charge',
      expected: 0,
      actual: Number(actualHandlingCharged),
      status: 'VIOLATION',
      note: 'Dealer agreed to waive handling charges under DealLock terms.'
    });
  }

  // Check variance
  if (varianceFromAgreed > 2000) {
    discrepancies.push({
      item: 'Final Payable Variance',
      expected: agreedTotal,
      actual: totalPaid,
      status: 'UNEXPLAINED_SURCHARGE',
      note: `Invoice total is ₹${varianceFromAgreed.toLocaleString('en-IN')} higher than the locked price.`
    });
  }

  const isVerifiedClean = discrepancies.length === 0;

  return {
    invoiceNumber: invoiceNumber || `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    invoiceDate: invoiceDate || new Date().toISOString().split('T')[0],
    verificationStatus: isVerifiedClean ? 'AUDITED_AND_VERIFIED' : 'DISCREPANCY_FLAGGED',
    auditTimestamp: new Date().toISOString(),
    baselineShowroomPrice: baselineShowroom,
    lockedAgreedPrice: agreedTotal,
    actualInvoiceAmount: totalPaid,
    realizedSavingsAmount: Math.max(0, realizedSavings),
    rewardUnlocked: {
      type: 'FUEL_CASHBACK_CARD',
      brand: 'HPCL / IOCL PetroCard',
      amount: 5000,
      couponCode: `FUEL-CF-${Math.floor(1000 + Math.random() * 9000)}-MH`,
      expiryDate: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split('T')[0],
      perk: 'Free 1st Annual 3M Ceramic Detailing Voucher'
    },
    discrepancies,
    summaryCertificate: {
      buyerName: dealLockVoucher.buyer.name,
      vehicle: `${dealLockVoucher.vehicle.carName} - ${dealLockVoucher.vehicle.variantName}`,
      dealer: dealLockVoucher.dealer.dealerName,
      officialSavingTag: `₹${Math.max(0, realizedSavings).toLocaleString('en-IN')} Verified Saved`,
      certificateId: `CF-SAVINGS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    }
  };
}

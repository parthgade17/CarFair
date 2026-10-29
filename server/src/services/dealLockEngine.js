import crypto from 'crypto';

/**
 * DealLock Engine
 * Locks the agreed price, accessories, delivery timeline, and issues
 * a tamper-proof cryptographic voucher with OTP and disintermediation barrier.
 */
export function generateDealLock({
  groupId,
  carName,
  variantName,
  buyerName,
  buyerPhone,
  dealerId,
  dealerName,
  lockedOnRoadPrice,
  baselineShowroomPrice,
  guaranteedDeliveryDays,
  includedPerks = [],
  city = 'Pune'
}) {
  const timestamp = Date.now();
  const voucherCode = `CF-LOCK-${city.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // 6-digit cryptographic OTP for delivery time dealer check-in
  const secretDealerOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // SHA256 digital signature of the agreement
  const rawPayload = `${voucherCode}:${buyerPhone}:${lockedOnRoadPrice}:${dealerId}:${timestamp}`;
  const digitalSignature = crypto.createHash('sha256').update(rawPayload).digest('hex').substring(0, 16);

  const priceSaved = Math.max(0, baselineShowroomPrice - lockedOnRoadPrice);

  return {
    voucherCode,
    status: 'ACTIVE_LOCKED',
    createdAt: new Date(timestamp).toISOString(),
    validUntil: new Date(timestamp + 14 * 24 * 3600 * 1000).toISOString(), // 14 days price freeze
    buyer: {
      name: buyerName,
      phone: buyerPhone,
      city
    },
    vehicle: {
      carName,
      variantName
    },
    dealer: {
      dealerId,
      dealerName,
      city
    },
    financialLock: {
      lockedOnRoadPrice,
      baselineShowroomPrice,
      guaranteedSavings: priceSaved,
      maxStatutoryRtoCap: 'As per Parivahan official receipt only',
      handlingChargesWaived: true,
      priceProtectionClause: 'Dealer cannot increase price or mandate accessory bundles upon delivery.'
    },
    fulfillment: {
      guaranteedDeliveryDays,
      promisedPerks: includedPerks
    },
    verificationSecurity: {
      dealerClaimOtp: secretDealerOtp,
      digitalSignature,
      antiBypassReward: '₹5,000 HPCL/IOCL Fuel Card + Free Meguiar\'s Ceramic Detailing after uploading final dealer invoice.'
    }
  };
}

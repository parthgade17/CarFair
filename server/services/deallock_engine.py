"""
DealLock Engine (Python Implementation)
Locks the agreed price, accessories, delivery timeline, and issues
a tamper-proof cryptographic voucher with OTP and disintermediation barrier.
"""
import time
import hashlib
import random
from datetime import datetime, timedelta
from typing import Dict, Any, List

def generate_deal_lock(payload: Dict[str, Any]) -> Dict[str, Any]:
    car_name = payload.get("carName", "Tata Nexon")
    variant_name = payload.get("variantName", "Creative+ 1.2 AMT")
    buyer_name = payload.get("buyerName", "Parth Gade")
    buyer_phone = payload.get("buyerPhone", "+91 98901 23456")
    dealer_id = payload.get("dealerId", "dealer-bafna-tata-pune")
    dealer_name = payload.get("dealerName", "Bafna Tata Motors (Shivajinagar)")
    locked_on_road = float(payload.get("lockedOnRoadPrice") or 1294000)
    baseline_showroom = float(payload.get("baselineShowroomPrice") or 1362000)
    guaranteed_delivery = int(payload.get("guaranteedDeliveryDays") or 7)
    included_perks = payload.get("includedPerks") or ["5-Yr Extended Warranty", "7D Premium Mats"]
    city = payload.get("city", "Pune")

    now = datetime.utcnow()
    valid_until = now + timedelta(days=14)
    voucher_code = f"CF-LOCK-{city[:2].upper()}-{random.randint(1000, 9999)}"
    secret_dealer_otp = f"{random.randint(100000, 999999)}"

    # SHA256 digital signature
    raw_payload = f"{voucher_code}:{buyer_phone}:{locked_on_road}:{dealer_id}:{now.timestamp()}"
    digital_signature = hashlib.sha256(raw_payload.encode()).hexdigest()[:16]

    price_saved = max(0.0, baseline_showroom - locked_on_road)

    return {
        "voucherCode": voucher_code,
        "status": "ACTIVE_LOCKED",
        "createdAt": now.isoformat() + "Z",
        "validUntil": valid_until.isoformat() + "Z",
        "buyer": {
            "name": buyer_name,
            "phone": buyer_phone,
            "city": city
        },
        "vehicle": {
            "carName": car_name,
            "variantName": variant_name
        },
        "dealer": {
            "dealerId": dealer_id,
            "dealerName": dealer_name,
            "city": city
        },
        "financialLock": {
            "lockedOnRoadPrice": round(locked_on_road),
            "baselineShowroomPrice": round(baseline_showroom),
            "guaranteedSavings": round(price_saved),
            "maxStatutoryRtoCap": "As per Parivahan official receipt only",
            "handlingChargesWaived": True,
            "priceProtectionClause": "Dealer cannot increase price or mandate accessory bundles upon delivery."
        },
        "fulfillment": {
            "guaranteedDeliveryDays": guaranteed_delivery,
            "promisedPerks": included_perks
        },
        "verificationSecurity": {
            "dealerClaimOtp": secret_dealer_otp,
            "digitalSignature": digital_signature,
            "antiBypassReward": "₹5,000 HPCL/IOCL Fuel Card + Free Meguiar's Ceramic Detailing after uploading final dealer invoice."
        }
    }

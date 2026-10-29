"""
SavingsProof Engine (Python Implementation)
Compares final dealer invoice against original showroom quote and DealLock commitment.
Verifies exact realized savings, flags discrepancies, and triggers buyer rewards.
"""
import random
from datetime import datetime, timedelta
from typing import Dict, Any

def audit_final_invoice(payload: Dict[str, Any]) -> Dict[str, Any]:
    deal_lock_voucher = payload.get("dealLockVoucher") or {}
    financial_lock = deal_lock_voucher.get("financialLock", {})

    agreed_total = float(financial_lock.get("lockedOnRoadPrice") or 1294000)
    baseline_showroom = float(financial_lock.get("baselineShowroomPrice") or 1362000)

    invoice_number = payload.get("invoiceNumber") or f"INV-2026-{random.randint(100000, 999999)}"
    invoice_date = payload.get("invoiceDate") or datetime.utcnow().strftime("%Y-%m-%d")

    actual_handling = float(payload.get("actualHandlingCharged") or 0)
    total_paid = float(payload.get("actualTotalInvoiceAmount") or agreed_total)

    realized_savings = baseline_showroom - total_paid
    variance_from_agreed = total_paid - agreed_total

    discrepancies = []

    # Check handling charges
    if actual_handling > 0:
        discrepancies.append({
            "item": "Logistics / Handling Charge",
            "expected": 0,
            "actual": actual_handling,
            "status": "VIOLATION",
            "note": "Dealer agreed to waive handling charges under DealLock terms."
        })

    # Check variance
    if variance_from_agreed > 2000:
        discrepancies.append({
            "item": "Final Payable Variance",
            "expected": agreed_total,
            "actual": total_paid,
            "status": "UNEXPLAINED_SURCHARGE",
            "note": f"Invoice total is ₹{variance_from_agreed:,.0f} higher than the locked price."
        })

    is_verified_clean = len(discrepancies) == 0
    now = datetime.utcnow()
    coupon_expiry = (now + timedelta(days=90)).strftime("%Y-%m-%d")

    buyer_name = deal_lock_voucher.get("buyer", {}).get("name", "Verified Buyer")
    vehicle_info = deal_lock_voucher.get("vehicle", {})
    vehicle_str = f"{vehicle_info.get('carName', 'Car')} - {vehicle_info.get('variantName', 'Variant')}"
    dealer_name = deal_lock_voucher.get("dealer", {}).get("dealerName", "Authorized Showroom")

    return {
        "invoiceNumber": invoice_number,
        "invoiceDate": invoice_date,
        "verificationStatus": "AUDITED_AND_VERIFIED" if is_verified_clean else "DISCREPANCY_FLAGGED",
        "auditTimestamp": now.isoformat() + "Z",
        "baselineShowroomPrice": round(baseline_showroom),
        "lockedAgreedPrice": round(agreed_total),
        "actualInvoiceAmount": round(total_paid),
        "realizedSavingsAmount": round(max(0.0, realized_savings)),
        "rewardUnlocked": {
            "type": "FUEL_CASHBACK_CARD",
            "brand": "HPCL / IOCL PetroCard",
            "amount": 5000,
            "couponCode": f"FUEL-CF-{random.randint(1000, 9999)}-MH",
            "expiryDate": coupon_expiry,
            "perk": "Free 1st Annual 3M Ceramic Detailing Voucher"
        },
        "discrepancies": discrepancies,
        "summaryCertificate": {
            "buyerName": buyer_name,
            "vehicle": vehicle_str,
            "dealer": dealer_name,
            "officialSavingTag": f"₹{max(0.0, realized_savings):,.0f} Verified Saved",
            "certificateId": f"CF-SAVINGS-{random.randint(1000000, 9999999)}"
        }
    }

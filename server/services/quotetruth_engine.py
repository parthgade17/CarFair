"""
QuoteTruth AI Auditor (Python Implementation)
Normalizes Indian dealership quotations, identifies hidden markup traps,
unbundles inflated add-ons, and provides an actionable audit report.
"""
from typing import Dict, Any

try:
    from data.cars import CARS_CATALOG, STATE_RTO_RATES
except ImportError:
    from server.data.cars import CARS_CATALOG, STATE_RTO_RATES

def audit_quotation(quote_data: Dict[str, Any]) -> Dict[str, Any]:
    car_id = quote_data.get("carId", "tata-nexon")
    variant_id = quote_data.get("variantId", "nexon-creative-plus")
    state = quote_data.get("state", "MH")

    ex_showroom_input = float(quote_data.get("exShowroomPrice") or 0)
    rto_charges_input = float(quote_data.get("rtoCharges") or 0)
    insurance_price_input = float(quote_data.get("insurancePrice") or 0)
    handling_charges = float(quote_data.get("handlingCharges") or 0)
    handling_label = quote_data.get("handlingChargeLabel") or "Logistics / Handling / Depot"
    accessory_pack = float(quote_data.get("accessoryPack") or 0)
    extended_warranty = float(quote_data.get("extendedWarranty") or 0)
    fastag = float(quote_data.get("fastag") or 500)
    hsrp_number_plate = float(quote_data.get("hsrpNumberPlate") or 400)
    discounts = float(quote_data.get("discounts") or 0)
    corporate_bonus = float(quote_data.get("corporateBonus") or 0)
    exchange_bonus = float(quote_data.get("exchangeBonus") or 0)

    # Find car and variant
    car = next((c for c in CARS_CATALOG if c["id"] == car_id), CARS_CATALOG[0])
    variant = next((v for v in car["variants"] if v["id"] == variant_id), car["variants"][0])

    official_ex_showroom = float(variant["exShowroom"])
    state_rate = STATE_RTO_RATES.get(state, STATE_RTO_RATES["MH"])

    # Statutory RTO calculation
    fuel_type = variant["fuel"].lower()
    if fuel_type == "ev":
        rto_tax_rate = state_rate["evTax"]
    elif fuel_type == "diesel":
        rto_tax_rate = state_rate["dieselTax"]
    else:
        rto_tax_rate = state_rate["petrolTax"]

    calculated_statutory_rto = round(official_ex_showroom * (rto_tax_rate + state_rate["cess"]))

    # TCS calculation (1% if ex-showroom > 10 Lakhs)
    statutory_tcs = round(official_ex_showroom * 0.01) if official_ex_showroom > 1000000 else 0

    # Realistic Market Insurance benchmark (1 Yr OD + 3 Yr TP + Zero Dep + RTI + Engine Protect)
    fair_market_insurance = round(official_ex_showroom * 0.026 + 3500)
    fair_essential_accessories_cost = 4500.0

    # Total Quoted by Dealer
    dealer_quoted_total = round(
        (ex_showroom_input or official_ex_showroom) +
        (rto_charges_input or calculated_statutory_rto) +
        (insurance_price_input or (fair_market_insurance * 1.55)) +
        handling_charges +
        accessory_pack +
        extended_warranty +
        fastag +
        hsrp_number_plate +
        statutory_tcs -
        discounts -
        corporate_bonus -
        exchange_bonus
    )

    audit_flags = []
    total_inflated_amount = 0.0

    # 1. Handling / Logistics Charges (Strictly ILLEGAL as per MoRTH & High Courts)
    if handling_charges > 0:
        audit_flags.append({
            "id": "FLAG_HANDLING_CHARGES",
            "severity": "CRITICAL",
            "title": "Illegal Handling / Logistics Charges Detected",
            "chargedAmount": handling_charges,
            "fairAmount": 0,
            "excessPaid": handling_charges,
            "explanation": f"The dealer is charging ₹{handling_charges:,.0f} under '{handling_label}' fee. As per MoRTH circulars and Supreme Court rulings, dealerships cannot levy depot, handling, or PDI charges for showroom delivery.",
            "actionToTake": "Demand immediate removal citing MoRTH circular. If they refuse, report to CarFair Deal Concierge or State Transport Commissioner."
        })
        total_inflated_amount += handling_charges

    # 2. Insurance Overcharging
    insurance_excess = insurance_price_input - fair_market_insurance
    if insurance_excess > 8000:
        audit_flags.append({
            "id": "FLAG_INFLATED_INSURANCE",
            "severity": "HIGH",
            "title": "Dealer Insurance Markup (~40-60% Overpriced)",
            "chargedAmount": insurance_price_input,
            "fairAmount": fair_market_insurance,
            "excessPaid": insurance_excess,
            "explanation": f"The showroom quoted ₹{insurance_price_input:,.0f} for insurance. An equivalent IRDAI-approved Zero-Depreciation + RTI policy directly from Acko/Tata AIG/Iffco-Tokio with 1+3 year coverage costs ~₹{fair_market_insurance:,.0f}.",
            "actionToTake": "Ask dealer to match the online quotation for identical add-ons, or exercise your legal right to take third-party insurance."
        })
        total_inflated_amount += insurance_excess

    # 3. Forced Accessory Kit
    if accessory_pack > 12000:
        accessory_excess = accessory_pack - fair_essential_accessories_cost
        audit_flags.append({
            "id": "FLAG_FORCED_ACCESSORIES",
            "severity": "MEDIUM",
            "title": "Inflated Dealer Essential Accessory Kit",
            "chargedAmount": accessory_pack,
            "fairAmount": fair_essential_accessories_cost,
            "excessPaid": accessory_excess,
            "explanation": f"Showroom bundled ₹{accessory_pack:,.0f} of accessories (often basic chrome strips, ₹300 perfume, and overpriced mats). High-quality 7D mats and mudflaps cost only ₹{fair_essential_accessories_cost:,.0f}.",
            "actionToTake": "Opt out of the mandatory accessory combo. Buy only what you need or request CarFair group inclusion."
        })
        total_inflated_amount += accessory_excess

    # 4. RTO Discrepancy
    rto_excess = rto_charges_input - calculated_statutory_rto
    if rto_excess > 4000:
        audit_flags.append({
            "id": "FLAG_RTO_PADDING",
            "severity": "MEDIUM",
            "title": "RTO / Statutory Fee Padding",
            "chargedAmount": rto_charges_input,
            "fairAmount": calculated_statutory_rto,
            "excessPaid": rto_excess,
            "explanation": f"Calculated official {state_rate['name']} registration fee is ₹{calculated_statutory_rto:,.0f}, but dealer quoted ₹{rto_charges_input:,.0f}. Dealerships often pad agent fees or fake smart card fees.",
            "actionToTake": "Ask for the official Parivahan / Vahan government receipt breakdown."
        })
        total_inflated_amount += rto_excess

    # Unbundled Recommended Price
    unbundled_recommended_total = round(
        official_ex_showroom +
        calculated_statutory_rto +
        fair_market_insurance +
        fair_essential_accessories_cost +
        fastag +
        hsrp_number_plate +
        statutory_tcs -
        (discounts + corporate_bonus + exchange_bonus)
    )

    # Calculate Health Score (0 - 100)
    quote_health_score = 100
    if handling_charges > 0:
        quote_health_score -= 35
    if insurance_excess > 15000:
        quote_health_score -= 25
    elif insurance_excess > 8000:
        quote_health_score -= 15
    if accessory_pack > 20000:
        quote_health_score -= 15
    if rto_excess > 5000:
        quote_health_score -= 10
    quote_health_score = max(10, min(100, quote_health_score))

    total_possible_savings = max(0, dealer_quoted_total - unbundled_recommended_total)

    return {
        "car": {
            "id": car["id"],
            "brand": car["brand"],
            "model": car["model"],
            "variantName": variant["name"],
            "image": car["image"]
        },
        "state": state_rate["name"],
        "dealerQuotedTotal": dealer_quoted_total,
        "unbundledRecommendedTotal": unbundled_recommended_total,
        "totalInflatedAmount": total_inflated_amount,
        "totalPossibleSavings": total_possible_savings,
        "quoteHealthScore": quote_health_score,
        "healthRating": "CLEAN_DEAL" if quote_health_score >= 80 else ("MODERATE_MARKUP" if quote_health_score >= 60 else "HEAVY_OVERCHARGING"),
        "lineItemBreakdown": {
            "exShowroom": {"quoted": ex_showroom_input or official_ex_showroom, "fair": official_ex_showroom, "status": "EXACT"},
            "rto": {"quoted": rto_charges_input or calculated_statutory_rto, "fair": calculated_statutory_rto, "status": "INFLATED" if rto_excess > 4000 else "FAIR"},
            "insurance": {"quoted": insurance_price_input or (fair_market_insurance * 1.5), "fair": fair_market_insurance, "status": "OVERPRICED" if insurance_excess > 8000 else "FAIR"},
            "handlingCharges": {"quoted": handling_charges, "fair": 0, "status": "ILLEGAL" if handling_charges > 0 else "CLEAN"},
            "accessoryPack": {"quoted": accessory_pack, "fair": fair_essential_accessories_cost, "status": "OPTIONAL_BUNDLE" if accessory_pack > 12000 else "FAIR"},
            "tcs": {"quoted": statutory_tcs, "fair": statutory_tcs, "status": "STATUTORY"},
            "fastagAndPlate": {"quoted": fastag + hsrp_number_plate, "fair": 900, "status": "FAIR"},
            "discountsApplied": {"quoted": discounts + corporate_bonus + exchange_bonus, "fair": discounts, "status": "DISCOUNT"}
        },
        "auditFlags": audit_flags,
        "aiNegotiationScript": f"I have reviewed the quotation for {car['brand']} {car['model']} ({variant['name']}). As per MoRTH and transport department regulations, the ₹{handling_charges:,.0f} handling/depot charges cannot be levied. Additionally, I have an official quote from an IRDAI-registered insurer for ₹{fair_market_insurance:,.0f} with Zero Dep and Engine Protect. If you can match this insurance and waive the unbundled accessory pack of ₹{accessory_pack:,.0f}, I am ready to book with CarFair group allocation today."
    }

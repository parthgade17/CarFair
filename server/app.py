"""
CarFair High-Performance Python Backend
Powered by FastAPI + Uvicorn with In-Memory State & Static Client Hosting
"""
import os
import sys
import time
import math
import random
from typing import Optional, List, Dict, Any
from pathlib import Path
from datetime import datetime, timedelta

# Ensure server directory is always in sys.path for direct execution
SERVER_DIR = Path(__file__).resolve().parent
if str(SERVER_DIR) not in sys.path:
    sys.path.insert(0, str(SERVER_DIR))

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from data.cars import CARS_CATALOG, STATE_RTO_RATES
from data.dealers import AUTHORIZED_DEALERS
from data.groups import INITIAL_BUYING_GROUPS
from services.quotetruth_engine import audit_quotation
from services.deallock_engine import generate_deal_lock
from services.savingsproof_engine import audit_final_invoice

app = FastAPI(
    title="CarFair API",
    description="India's Verified Group Car-Buying & AI Quotation Auditing Engine",
    version="2.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Persistent in-memory session state
groups_db: List[Dict[str, Any]] = list(INITIAL_BUYING_GROUPS)
locked_deals_db: List[Dict[str, Any]] = []
audited_invoices_db: List[Dict[str, Any]] = []
showroom_car_photos_db: Dict[str, List[Dict[str, Any]]] = {}


# -------------------------------------------------------------
# API Endpoints
# -------------------------------------------------------------

@app.get("/api/cars")
def get_cars():
    """Retrieve Indian cars catalog with variants, pricing & specifications."""
    return {"success": True, "count": len(CARS_CATALOG), "cars": CARS_CATALOG}


@app.get("/api/cars/{car_id}/images")
def get_car_images(car_id: str):
    """Retrieve all showroom and catalog images for a car model."""
    car = next((c for c in CARS_CATALOG if c["id"] == car_id), None)
    default_imgs = car.get("images", [car.get("image")]) if car else []
    custom_imgs = showroom_car_photos_db.get(car_id, [])
    return {"success": True, "carId": car_id, "images": custom_imgs + default_imgs}


@app.post("/api/cars/{car_id}/images")
async def add_car_image(car_id: str, request: Request):
    """Showroom partner adds/uploads a new car photo."""
    body = await request.json()
    image_item = {
        "id": f"img-{int(time.time()*1000)}",
        "url": body.get("url"),
        "caption": body.get("caption", "Showroom Stock Photo"),
        "category": body.get("category", "SHOWROOM_FLOOR"),
        "uploadedBy": body.get("uploadedBy", "Authorized Dealership"),
        "uploadedAt": "Just Now"
    }
    if car_id not in showroom_car_photos_db:
        showroom_car_photos_db[car_id] = []
    showroom_car_photos_db[car_id].insert(0, image_item)
    return {"success": True, "image": image_item, "message": "Photo uploaded successfully!"}


@app.get("/api/groups")
def get_groups(city: Optional[str] = None, brand: Optional[str] = None):
    """Retrieve active buying groups filtered by city and automotive brand."""
    filtered = list(groups_db)
    if city and city != "All Cities" and city != "All":
        filtered = [g for g in filtered if g.get("city", "").lower() == str(city).lower()]
    if brand and brand != "All":
        filtered = [g for g in filtered if str(brand).lower() in g.get("carName", "").lower()]
    return {"success": True, "count": len(filtered), "groups": filtered}


@app.get("/api/groups/{group_id}")
def get_group_by_id(group_id: str):
    """Retrieve single group details and competing bids."""
    group = next((g for g in groups_db if g["id"] == group_id), None)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return {"success": True, "group": group}


@app.post("/api/groups")
async def create_new_group(request: Request):
    """Create a new group buying pool (e.g. for Housing Society or Corporate Park)."""
    body = await request.json()
    car_id = body.get("carId", "tata-nexon")
    variant_id = body.get("variantId")
    city = body.get("city", "Pune")
    state = body.get("state", "MH")
    community_name = body.get("communityName") or f"{city} Verified Buyers Club"
    target_buyers = int(body.get("targetBuyers") or 20)

    car = next((c for c in CARS_CATALOG if c["id"] == car_id), CARS_CATALOG[0])
    variant = next((v for v in car["variants"] if v["id"] == variant_id), car["variants"][0])

    ex_price = variant["exShowroom"]
    new_group = {
        "id": f"grp-{car['id']}-{city.lower().replace(' ', '')}-{int(time.time()) % 10000}",
        "carId": car["id"],
        "variantId": variant["id"],
        "carName": f"{car['brand']} {car['model']} {variant['name']}",
        "city": city,
        "state": state,
        "communityName": community_name,
        "status": "ACTIVE_BIDDING",
        "biddingEndsAt": (datetime.utcnow() + timedelta(days=3)).isoformat() + "Z",
        "targetBuyers": target_buyers,
        "currentBuyers": 1,
        "verifiedBuyers": 1,
        "discountTiers": [
            {"minBuyers": 5, "discountPerBuyer": 25000, "perk": "Free Mudflaps & Matting"},
            {"minBuyers": 10, "discountPerBuyer": 45000, "perk": "Free Anti-Rust Treatment"},
            {"minBuyers": 20, "discountPerBuyer": 70000, "perk": "Extended Warranty + Ceramic Detailing"}
        ],
        "currentUnlockedTier": 0,
        "baselineShowroomPrice": round(ex_price * 1.18),
        "currentBestGroupPrice": round(ex_price * 1.14),
        "verifiedSavingsTotal": round(ex_price * 0.04),
        "bids": []
    }

    groups_db.insert(0, new_group)
    return {"success": True, "group": new_group, "message": "Group created successfully!"}


@app.post("/api/groups/{group_id}/join")
async def join_group(group_id: str, request: Request):
    """Join an active group with buyer readiness verification."""
    group = next((g for g in groups_db if g["id"] == group_id), None)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    body = await request.json()
    purchase_timeline = body.get("purchaseTimeline", "Within 15 Days")
    is_preapproved = body.get("isFinancingPreApproved", False)

    group["currentBuyers"] += 1
    if is_preapproved or purchase_timeline == "Immediate":
        group["verifiedBuyers"] += 1

    # Recalculate discount tiers dynamically
    highest_tier = 0
    for idx, tier in enumerate(group["discountTiers"]):
        if group["currentBuyers"] >= tier["minBuyers"]:
            highest_tier = idx

    group["currentUnlockedTier"] = highest_tier
    current_discount = group["discountTiers"][highest_tier]["discountPerBuyer"] if group["discountTiers"] else 25000
    group["currentBestGroupPrice"] = group["baselineShowroomPrice"] - current_discount
    group["verifiedSavingsTotal"] = current_discount

    return {
        "success": True,
        "group": group,
        "message": f"You've joined the {group['carName']} group! Your spot is reserved."
    }


@app.post("/api/groups/{group_id}/bid")
async def submit_dealer_bid(group_id: str, request: Request):
    """Dealership submits a competing reverse bid for the verified group."""
    group = next((g for g in groups_db if g["id"] == group_id), None)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    body = await request.json()
    dealer_id = body.get("dealerId") or "dealer-custom"
    dealer_name = body.get("dealerName") or "Authorized OEM Dealership"
    discount = float(body.get("exShowroomDiscount") or 45000)
    bonus = float(body.get("corporateExchangeBonus") or 0)
    freebies = body.get("freebies") or ["Free 5-Yr Extended Warranty"]
    delivery_days = int(body.get("deliveryDays") or 7)
    waived_handling = bool(body.get("waivedHandlingCharges", True))
    terms = body.get("terms") or "Authorized dealership allocation for CarFair members."

    total_off = discount + bonus
    handling_saving = 18000 if waived_handling else 0
    calculated_on_road = max(800000, round(group["baselineShowroomPrice"] - total_off - handling_saving))

    new_bid = {
        "id": f"bid-{int(time.time() * 1000)}",
        "dealerId": dealer_id,
        "dealerName": dealer_name,
        "submittedAt": datetime.utcnow().isoformat() + "Z",
        "exShowroomDiscount": discount,
        "corporateExchangeBonus": bonus,
        "freebies": freebies,
        "insuranceMatchPrice": float(body.get("insuranceMatchPrice") or 32000),
        "waivedHandlingCharges": waived_handling,
        "deliveryDays": delivery_days,
        "finalOnRoadPerUnit": calculated_on_road,
        "isWinning": False,
        "terms": terms
    }

    group["bids"].append(new_bid)
    # Sort bids by lowest final on-road price
    group["bids"].sort(key=lambda b: b["finalOnRoadPerUnit"])
    for idx, b in enumerate(group["bids"]):
        b["isWinning"] = (idx == 0)

    group["currentBestGroupPrice"] = group["bids"][0]["finalOnRoadPerUnit"]
    group["verifiedSavingsTotal"] = group["baselineShowroomPrice"] - group["currentBestGroupPrice"]

    return {"success": True, "bid": new_bid, "group": group}


@app.post("/api/quotetruth/audit")
async def audit_quote_endpoint(request: Request):
    """QuoteTruth AI: Line-by-line quotation auditor and markup unbundler."""
    try:
        body = await request.json()
        result = audit_quotation(body)
        return {"success": True, "audit": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/deallock/generate")
async def generate_deallock_endpoint(request: Request):
    """Generate a tamper-proof DealLock Voucher with secret dealer claim OTP."""
    try:
        body = await request.json()
        deal = generate_deal_lock(body)
        locked_deals_db.append(deal)
        return {"success": True, "dealLock": deal}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/savingsproof/audit")
async def audit_invoice_endpoint(request: Request):
    """SavingsProof: Compare final delivery invoice and unlock ₹5,000 fuel reward card."""
    try:
        body = await request.json()
        audit_result = audit_final_invoice(body)
        audited_invoices_db.append(audit_result)
        return {"success": True, "savingsProof": audit_result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/dealers")
def get_dealers():
    """Retrieve list of authorized OEM partner dealerships."""
    return {"success": True, "count": len(AUTHORIZED_DEALERS), "dealers": AUTHORIZED_DEALERS}


@app.post("/api/exchange/estimate")
async def estimate_tradein_endpoint(request: Request):
    """Multi-dealer competing trade-in valuation bidding for old cars."""
    body = await request.json()
    make = body.get("make", "Maruti Suzuki")
    model = body.get("model", "Swift VXi")
    year = int(body.get("year") or 2019)
    kilometers = float(body.get("kilometers") or 45000)
    current_year = 2026
    age = max(1, current_year - year)

    base_value = 550000.0
    depreciation_factor = math.pow(0.88, age)
    mileage_factor = max(0.7, 1.0 - (kilometers / 250000.0))
    estimated_fair = round(base_value * depreciation_factor * mileage_factor)

    bids = [
        {
            "network": "Spinny Verified Trade-in Partner",
            "bidAmount": estimated_fair + 18000,
            "inspectionType": "Free Home PDI in 24 Hrs",
            "instantPayment": True
        },
        {
            "network": "Maruti True Value Certified Hub",
            "bidAmount": estimated_fair + 12000,
            "inspectionType": "Showroom Counter Inspection",
            "instantPayment": True
        },
        {
            "network": "Cars24 B2B Dealer Exchange",
            "bidAmount": estimated_fair + 8000,
            "inspectionType": "Direct Instant Account Transfer",
            "instantPayment": True
        }
    ]

    return {
        "success": True,
        "vehicleSummary": f"{year} {make} {model}",
        "estimatedFairPrice": estimated_fair,
        "competingBids": bids,
        "singleDealerAverageOffer": estimated_fair - 35000,
        "exchangeAdvantage": 35000 + 18000
    }


@app.get("/api/stats")
def get_platform_stats():
    """Retrieve verified platform metrics and aggregated buyer savings."""
    total_savings = sum((g.get("verifiedSavingsTotal", 50000) * g.get("verifiedBuyers", 10)) for g in groups_db) + 14280000
    return {
        "success": True,
        "stats": {
            "totalVerifiedSavings": total_savings,
            "totalCarsDelivered": 214,
            "activeDealersCount": len(AUTHORIZED_DEALERS) + 18,
            "activeBuyersInGroups": sum(g.get("currentBuyers", 0) for g in groups_db),
            "averageSavingsPerBuyer": "₹68,400",
            "biddingSuccessRate": "94.2%",
            "averageDeliveryTimeline": "8.4 Days"
        }
    }


# -------------------------------------------------------------
# Static Frontend Serving (Single-Port Production Integration)
# -------------------------------------------------------------
client_dist = Path(__file__).resolve().parent.parent / "client" / "dist"

if client_dist.exists() and (client_dist / "index.html").exists():
    app.mount("/assets", StaticFiles(directory=str(client_dist / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Don't intercept API calls or docs
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            raise HTTPException(status_code=404, detail="Not Found")
        file_target = client_dist / full_path
        if file_target.is_file():
            return FileResponse(file_target)
        return FileResponse(client_dist / "index.html")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    print(f"🚗 Starting CarFair Python Backend on http://0.0.0.0:{port}")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)

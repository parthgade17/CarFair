"""
Active Verified Group Buying Pools with Progressive Discount Tiers and Bids
"""
import time
from datetime import datetime, timedelta

def get_future_iso(days=2, hours=4):
    dt = datetime.utcnow() + timedelta(days=days, hours=hours)
    return dt.isoformat() + "Z"

INITIAL_BUYING_GROUPS = [
    {
        "id": "grp-nexon-pune-oct26",
        "carId": "tata-nexon",
        "variantId": "nexon-creative-plus",
        "carName": "Tata Nexon Creative+ 1.2 AMT",
        "city": "Pune",
        "state": "MH",
        "communityName": "Hinjewadi Tech Parks & Baner Buyers",
        "status": "ACTIVE_BIDDING",
        "biddingEndsAt": get_future_iso(2, 4),
        "targetBuyers": 20,
        "currentBuyers": 18,
        "verifiedBuyers": 14,
        "discountTiers": [
            {"minBuyers": 5, "discountPerBuyer": 25000, "perk": "Free Mudflaps & Matting"},
            {"minBuyers": 10, "discountPerBuyer": 42000, "perk": "Free Underbody Anti-Rust Coating"},
            {"minBuyers": 15, "discountPerBuyer": 58000, "perk": "2-Year Extended OEM Warranty (Worth ₹16k)"},
            {"minBuyers": 20, "discountPerBuyer": 72000, "perk": "₹10,000 Fuel Card + Ceramic Coating"}
        ],
        "currentUnlockedTier": 2,
        "baselineShowroomPrice": 1362000,
        "currentBestGroupPrice": 1294000,
        "verifiedSavingsTotal": 68000,
        "bids": [
            {
                "id": "bid-bafna-1",
                "dealerId": "dealer-bafna-tata-pune",
                "dealerName": "Bafna Tata Motors (Shivajinagar)",
                "submittedAt": "2026-10-28T14:30:00Z",
                "exShowroomDiscount": 45000,
                "corporateExchangeBonus": 15000,
                "freebies": ["5-Yr Extended Warranty", "7D Premium Mats", "Underbody Anti-Rust"],
                "insuranceMatchPrice": 32000,
                "waivedHandlingCharges": True,
                "deliveryDays": 7,
                "finalOnRoadPerUnit": 1294000,
                "isWinning": True,
                "terms": "Ready VIN in chakan stockyard. Price guaranteed for group until 31st Oct."
            },
            {
                "id": "bid-concorde-2",
                "dealerId": "dealer-bafna-tata-pune",
                "dealerName": "National Garage Tata (Hadapsar)",
                "submittedAt": "2026-10-28T16:15:00Z",
                "exShowroomDiscount": 38000,
                "corporateExchangeBonus": 10000,
                "freebies": ["Basic Accessory Kit", "Door Visors"],
                "insuranceMatchPrice": 36000,
                "waivedHandlingCharges": True,
                "deliveryDays": 14,
                "finalOnRoadPerUnit": 1308000,
                "isWinning": False,
                "terms": "Available in Daytona Grey and Pristine White."
            }
        ]
    },
    {
        "id": "grp-creta-mumbai-oct26",
        "carId": "hyundai-creta",
        "variantId": "creta-sx-tech",
        "carName": "Hyundai Creta SX (Tech) 1.5 IVT",
        "city": "Mumbai",
        "state": "MH",
        "communityName": "Hiranandani Powai & Thane Residents",
        "status": "ACTIVE_BIDDING",
        "biddingEndsAt": get_future_iso(1, 10),
        "targetBuyers": 25,
        "currentBuyers": 22,
        "verifiedBuyers": 19,
        "discountTiers": [
            {"minBuyers": 5, "discountPerBuyer": 30000, "perk": "Basic Chrome Kit"},
            {"minBuyers": 12, "discountPerBuyer": 50000, "perk": "Free Shield of Trust (2 Years)"},
            {"minBuyers": 20, "discountPerBuyer": 75000, "perk": "Zero-Dep Insurance Waiver + ₹8,000 Fuel Voucher"}
        ],
        "currentUnlockedTier": 2,
        "baselineShowroomPrice": 1845000,
        "currentBestGroupPrice": 1759000,
        "verifiedSavingsTotal": 86000,
        "bids": [
            {
                "id": "bid-modi-1",
                "dealerId": "dealer-modi-hyundai-mumbai",
                "dealerName": "Modi Hyundai Flagship (Andheri West)",
                "submittedAt": "2026-10-29T09:00:00Z",
                "exShowroomDiscount": 55000,
                "corporateExchangeBonus": 20000,
                "freebies": ["Hyundai 4-Yr Extended Warranty", "Illuminated Scuff Plates"],
                "insuranceMatchPrice": 42000,
                "waivedHandlingCharges": True,
                "deliveryDays": 10,
                "finalOnRoadPerUnit": 1759000,
                "isWinning": True,
                "terms": "Group discount valid if minimum 15 bookings completed before month-end."
            }
        ]
    },
    {
        "id": "grp-xuv700-blr-oct26",
        "carId": "mahindra-xuv700",
        "variantId": "xuv700-ax7",
        "carName": "Mahindra XUV700 AX7 2.2 Diesel AT",
        "city": "Bengaluru",
        "state": "KA",
        "communityName": "Bellandur & Whitefield Tech Corridor",
        "status": "RECRUITING",
        "biddingEndsAt": get_future_iso(4, 0),
        "targetBuyers": 15,
        "currentBuyers": 11,
        "verifiedBuyers": 8,
        "discountTiers": [
            {"minBuyers": 5, "discountPerBuyer": 35000, "perk": "Free Side Foot-steps (Worth ₹18k)"},
            {"minBuyers": 10, "discountPerBuyer": 60000, "perk": "Extended Warranty to 5th Year"},
            {"minBuyers": 15, "discountPerBuyer": 90000, "perk": "VIP Express Delivery + ₹15,000 Accessories"}
        ],
        "currentUnlockedTier": 1,
        "baselineShowroomPrice": 2680000,
        "currentBestGroupPrice": 2615000,
        "verifiedSavingsTotal": 65000,
        "bids": []
    },
    {
        "id": "grp-brezza-delhi-oct26",
        "carId": "maruti-brezza",
        "variantId": "brezza-zxi-plus",
        "carName": "Maruti Brezza ZXi+ Smart Hybrid AT",
        "city": "Delhi NCR",
        "state": "DL",
        "communityName": "DLF CyberCity & Noida Sector 62 Professionals",
        "status": "DEAL_LOCKED",
        "biddingEndsAt": get_future_iso(-1, 0),
        "targetBuyers": 15,
        "currentBuyers": 16,
        "verifiedBuyers": 16,
        "discountTiers": [
            {"minBuyers": 5, "discountPerBuyer": 20000, "perk": "Door Visors & Seat Covers"},
            {"minBuyers": 10, "discountPerBuyer": 38000, "perk": "Maruti Suzuki Genuine Accessories Voucher"},
            {"minBuyers": 15, "discountPerBuyer": 52000, "perk": "5-Yr Comprehensive Warranty + Fast Delivery"}
        ],
        "currentUnlockedTier": 2,
        "baselineShowroomPrice": 1585000,
        "currentBestGroupPrice": 1528000,
        "verifiedSavingsTotal": 57000,
        "bids": [
            {
                "id": "bid-sai-dl-1",
                "dealerId": "dealer-sai-maruti-mumbai",
                "dealerName": "Rana Motors Nexa/Arena (Gurgaon)",
                "submittedAt": "2026-10-27T12:00:00Z",
                "exShowroomDiscount": 40000,
                "corporateExchangeBonus": 12000,
                "freebies": ["5-Yr Warranty", "Mudflaps", "Floor Mats"],
                "insuranceMatchPrice": 28000,
                "waivedHandlingCharges": True,
                "deliveryDays": 5,
                "finalOnRoadPerUnit": 1528000,
                "isWinning": True,
                "terms": "Deal Locked! DealLock vouchers issued to all 16 verified members."
            }
        ]
    }
]

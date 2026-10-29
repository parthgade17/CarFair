"""
Comprehensive Indian Automotive Catalog
Realistic variant data, ex-showroom pricing, and verified automotive imagery.
"""

CARS_CATALOG = [
    {
        "id": "tata-nexon",
        "brand": "Tata",
        "model": "Nexon",
        "segment": "Compact SUV",
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        "tagline": "India's 5-Star BNCAP Best-Selling Compact SUV",
        "fuelTypes": ["Petrol", "Diesel", "EV"],
        "transmissions": ["Manual", "DCA / AMT"],
        "priceRange": "₹8.15 Lakh - ₹15.80 Lakh",
        "variants": [
            {
                "id": "nexon-smart-plus",
                "name": "Smart+ 1.2 Revotron Petrol 5MT",
                "exShowroom": 899000,
                "fuel": "Petrol",
                "transmission": "Manual",
                "engineCc": 1199,
                "seating": 5,
                "mileage": "17.44 kmpl"
            },
            {
                "id": "nexon-creative-plus",
                "name": "Creative+ 1.2 Turbo Petrol 6AMT",
                "exShowroom": 1169000,
                "fuel": "Petrol",
                "transmission": "AMT",
                "engineCc": 1199,
                "seating": 5,
                "mileage": "17.1 kmpl"
            },
            {
                "id": "nexon-fearless-plus-s",
                "name": "Fearless+ S 1.2 Turbo Petrol 7DCA (Sunroof)",
                "exShowroom": 1379000,
                "fuel": "Petrol",
                "transmission": "DCA Automatic",
                "engineCc": 1199,
                "seating": 5,
                "mileage": "17.0 kmpl"
            },
            {
                "id": "nexon-ev-empowered",
                "name": "Nexon.ev Empowered+ 45 kWh Long Range",
                "exShowroom": 1699000,
                "fuel": "EV",
                "transmission": "Automatic",
                "engineCc": 0,
                "seating": 5,
                "mileage": "489 km range"
            }
        ]
    },
    {
        "id": "hyundai-creta",
        "brand": "Hyundai",
        "model": "Creta",
        "segment": "Mid-size SUV",
        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        "tagline": "The Undisputed King of Indian Mid-Size SUVs",
        "fuelTypes": ["Petrol", "Diesel"],
        "transmissions": ["Manual", "IVT", "7DCT"],
        "priceRange": "₹11.00 Lakh - ₹20.15 Lakh",
        "variants": [
            {
                "id": "creta-ex",
                "name": "EX 1.5 MPi Petrol 6MT",
                "exShowroom": 1218000,
                "fuel": "Petrol",
                "transmission": "Manual",
                "engineCc": 1497,
                "seating": 5,
                "mileage": "17.4 kmpl"
            },
            {
                "id": "creta-sx-tech",
                "name": "SX (Tech) 1.5 MPi Petrol IVT Automatic",
                "exShowroom": 1598000,
                "fuel": "Petrol",
                "transmission": "Automatic (IVT)",
                "engineCc": 1497,
                "seating": 5,
                "mileage": "17.7 kmpl"
            },
            {
                "id": "creta-sx-o-knight",
                "name": "SX(O) Knight Edition 1.5 Turbo GDi 7DCT",
                "exShowroom": 1999000,
                "fuel": "Petrol",
                "transmission": "7-Speed DCT",
                "engineCc": 1482,
                "seating": 5,
                "mileage": "18.4 kmpl"
            }
        ]
    },
    {
        "id": "mahindra-xuv700",
        "brand": "Mahindra",
        "model": "XUV700",
        "segment": "Premium SUV",
        "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
        "tagline": "ADAS-Equipped Powerhouse for Highway Cruising",
        "fuelTypes": ["Petrol", "Diesel"],
        "transmissions": ["Manual", "6-Speed Torque Converter"],
        "priceRange": "₹13.99 Lakh - ₹26.04 Lakh",
        "variants": [
            {
                "id": "xuv700-ax5",
                "name": "AX5 2.0 mStallion Turbo Petrol MT (7-Seater)",
                "exShowroom": 1749000,
                "fuel": "Petrol",
                "transmission": "Manual",
                "engineCc": 1997,
                "seating": 7,
                "mileage": "13.0 kmpl"
            },
            {
                "id": "xuv700-ax7",
                "name": "AX7 2.2 mHawk Diesel AT (7-Seater)",
                "exShowroom": 2199000,
                "fuel": "Diesel",
                "transmission": "Automatic",
                "engineCc": 2184,
                "seating": 7,
                "mileage": "16.5 kmpl"
            },
            {
                "id": "xuv700-ax7l-awd",
                "name": "AX7 Luxury Pack 2.2 Diesel AT AWD (ADAS L2)",
                "exShowroom": 2549000,
                "fuel": "Diesel",
                "transmission": "Automatic AWD",
                "engineCc": 2184,
                "seating": 7,
                "mileage": "15.8 kmpl"
            }
        ]
    },
    {
        "id": "mahindra-scorpio-n",
        "brand": "Mahindra",
        "model": "Scorpio-N",
        "segment": "Body-on-frame SUV",
        "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
        "tagline": "The Big Daddy of Authentic 4x4 Road Presence",
        "fuelTypes": ["Petrol", "Diesel"],
        "transmissions": ["Manual", "Automatic 4XPLOR"],
        "priceRange": "₹13.85 Lakh - ₹24.54 Lakh",
        "variants": [
            {
                "id": "scorpio-z4",
                "name": "Z4 2.2 mHawk Diesel MT (7-Seater)",
                "exShowroom": 1545000,
                "fuel": "Diesel",
                "transmission": "Manual",
                "engineCc": 2184,
                "seating": 7,
                "mileage": "15.5 kmpl"
            },
            {
                "id": "scorpio-z8-select",
                "name": "Z8 Select 2.0 mStallion Petrol AT",
                "exShowroom": 1849000,
                "fuel": "Petrol",
                "transmission": "Automatic",
                "engineCc": 1997,
                "seating": 7,
                "mileage": "13.2 kmpl"
            },
            {
                "id": "scorpio-z8l-4x4",
                "name": "Z8L 2.2 Diesel AT 4XPLOR (Terrain Modes)",
                "exShowroom": 2420000,
                "fuel": "Diesel",
                "transmission": "Automatic 4x4",
                "engineCc": 2184,
                "seating": 7,
                "mileage": "14.8 kmpl"
            }
        ]
    },
    {
        "id": "maruti-brezza",
        "brand": "Maruti Suzuki",
        "model": "Brezza",
        "segment": "Compact SUV",
        "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
        "tagline": "India's Most Reliable Urban SUV with Smart Hybrid",
        "fuelTypes": ["Petrol", "CNG"],
        "transmissions": ["Manual", "6AT"],
        "priceRange": "₹8.34 Lakh - ₹14.14 Lakh",
        "variants": [
            {
                "id": "brezza-vxi",
                "name": "VXi 1.5 Smart Hybrid 5MT",
                "exShowroom": 969000,
                "fuel": "Petrol",
                "transmission": "Manual",
                "engineCc": 1462,
                "seating": 5,
                "mileage": "19.8 kmpl"
            },
            {
                "id": "brezza-zxi-plus",
                "name": "ZXi+ 1.5 Smart Hybrid 6AT Dual Tone",
                "exShowroom": 1398000,
                "fuel": "Petrol",
                "transmission": "Automatic",
                "engineCc": 1462,
                "seating": 5,
                "mileage": "19.89 kmpl"
            }
        ]
    },
    {
        "id": "kia-seltos",
        "brand": "Kia",
        "model": "Seltos",
        "segment": "Mid-size SUV",
        "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
        "tagline": "Futuristic Styling with Panoramic Dual Displays",
        "fuelTypes": ["Petrol", "Diesel"],
        "transmissions": ["Manual", "iMT", "IVT", "7DCT", "6AT"],
        "priceRange": "₹10.90 Lakh - ₹20.35 Lakh",
        "variants": [
            {
                "id": "seltos-htx",
                "name": "HTX 1.5 Smartstream Petrol IVT",
                "exShowroom": 1659000,
                "fuel": "Petrol",
                "transmission": "IVT Automatic",
                "engineCc": 1497,
                "seating": 5,
                "mileage": "17.7 kmpl"
            },
            {
                "id": "seltos-gtx-plus",
                "name": "GTX+ 1.5 Turbo Petrol 7DCT (Level 2 ADAS)",
                "exShowroom": 1999000,
                "fuel": "Petrol",
                "transmission": "7-Speed DCT",
                "engineCc": 1482,
                "seating": 5,
                "mileage": "17.9 kmpl"
            }
        ]
    }
]

# Indian State RTO Tax percentage approximations
STATE_RTO_RATES = {
    "MH": {"name": "Maharashtra (Pune / Mumbai)", "petrolTax": 0.11, "dieselTax": 0.13, "evTax": 0.00, "cess": 0.01},
    "DL": {"name": "Delhi NCR", "petrolTax": 0.10, "dieselTax": 0.125, "evTax": 0.00, "cess": 0.005},
    "KA": {"name": "Karnataka (Bengaluru)", "petrolTax": 0.14, "dieselTax": 0.155, "evTax": 0.04, "cess": 0.015},
    "TS": {"name": "Telangana (Hyderabad)", "petrolTax": 0.12, "dieselTax": 0.14, "evTax": 0.00, "cess": 0.01},
    "GJ": {"name": "Gujarat (Ahmedabad / Surat)", "petrolTax": 0.06, "dieselTax": 0.06, "evTax": 0.00, "cess": 0.00},
    "HR": {"name": "Haryana (Gurugram / Faridabad)", "petrolTax": 0.08, "dieselTax": 0.10, "evTax": 0.00, "cess": 0.005}
}

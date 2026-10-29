# CarFair 🚗⚡ — India's First Truly Transparent Group Car-Buying & Quotation Auditing Platform

> **"Why negotiate ₹15 Lakh cars alone for just free floor mats, when you bulk-buy groceries with your neighbours?"**
> CarFair turns fragmented Indian middle-class buyers into a collective bargaining force. Dealerships compete on a timed reverse auction, hidden showroom markups are audited by AI, and prices are sealed with cryptographic DealLock vouchers.

---

## 🌟 The Problem CarFair Solves

Buying a new car in India is fraught with information asymmetry, inflated dealer add-ons, and zero leverage for solo buyers:
1. **The Solo Buyer Trap**: An individual negotiating alone for 3 hours walks away with negligible discounts (often just basic mudflaps and a floor mat on a ₹14 Lakh car).
2. **Dealer Profit Secrets**: Dealerships make only 1-2% on the car's sticker price. Over **60% of their actual profit** comes from padding comprehensive insurance, bundling overpriced accessories, and charging **illegal handling/logistics fees** prohibited by MoRTH.
3. **Disintermediation in Group Buying**: Ordinary group-buying sites fail because dealers cut deals with buyers offline. CarFair introduces **DealLock™ with a secret 6-digit dealer OTP** and a **₹5,000 Fuel Card reward** upon invoice upload.
4. **Unverifiable Savings**: Most portals claim "Save ₹50,000" based on marketing fluff. CarFair calculates **line-by-line verified savings** against documented baseline quotes.

---

## 🚀 Key Modules & Capabilities

### 1. 🔍 QuoteTruth™ — AI Car Quotation Auditor
- **MoRTH Handling Fee Detection**: Automatically flags illegal logistics, depot, or PDI charges (often ₹15,000 - ₹35,000).
- **Insurance Unbundler**: Compares showroom quotes (~₹58,000 - ₹75,000) against direct IRDAI-approved Zero-Dep + RTI policies (~₹29,000 - ₹38,000) with identical coverage.
- **Forced Accessory Surcharge Buster**: Isolates genuine essentials (₹4,500 for 7D mats + flaps) from dealer junk packs (₹25,000+).
- **AI WhatsApp Negotiation Script**: Generates a tailored response for the buyer to send directly to the showroom sales manager.

### 2. 👥 Verified Buyer Matching & Community Pools
- **Verified Readiness Badges**: Filters tire-kickers by tagging buyers with pre-approved financing and firm 15-day / 30-day purchase timelines.
- **Progressive Discount Tiers**: 5 buyers = ₹25k off; 10 buyers = ₹45k off; 20 buyers = ₹72k off + free extended warranty.
- **Community Pools**: Dedicated pools for gated housing societies (e.g. *Amanora Park Town Pune*, *Hiranandani Powai*) and corporate tech corridors (*Infosys Hinjewadi*, *DLF CyberCity Gurgaon*).

### 3. ⚔️ Live Reverse Bidding Arena
- OEM-authorized dealerships (Tata, Hyundai, Mahindra, Maruti Suzuki, Kia) submit itemized reverse bids for groups.
- Real-time display of cash discounts, corporate exchange bonuses, free perks (5-year warranty, ceramic coating), and factory stock delivery SLAs (5-7 days vs 4 weeks).
- Timed bidding rounds that culminate at month-end / quarter-end when dealerships chase volume targets.

### 4. 🛡️ DealLock™ Anti-Bypass Voucher
- Issues a legally backed, tamper-proof digital price-freeze certificate.
- **Dealer Check-In OTP**: Dealership sales heads must enter a 6-digit OTP in their portal during booking to validate the deal and claim platform referral credit.
- Freezes on-road pricing and prohibits delivery-time add-on coercion.

### 5. 🧾 SavingsProof™ Post-Purchase Audit + ₹5,000 Fuel Card
- Solves the post-purchase drop-off: Buyers receive a **guaranteed ₹5,000 HPCL/IOCL PetroCard** + free detailing coupon when they upload their final delivery invoice.
- CarFair's audit engine checks line-by-line that zero illegal surcharges were sneaked into the invoice.

### 6. 🔄 Multi-Dealer Old Car Exchange Bidding
- Eliminates single-dealership trade-in lowballing (often under-valuing old cars by ₹40,000 - ₹60,000).
- 3 certified pre-owned networks (Spinny, Maruti True Value, Cars24) submit competing instant offers.

### 7. 🏢 Authorised Dealership Arena
- Dealerships view qualified buyer pools in their metro (Pune, Mumbai, Delhi NCR, Bengaluru, Hyderabad, Ahmedabad).
- Directly target stockyard clearance and achieve OEM volume quota incentives.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, ES Modules, RESTful APIs.
- **Responsive Design**: 100% mobile, tablet, and desktop responsive with touch-friendly navigation and desktop dashboards.
- **Data Architecture**: Realistic Indian vehicle database (Tata Nexon, Mahindra XUV700, Scorpio-N, Hyundai Creta, Maruti Brezza, Kia Seltos) with state-wise RTO tax brackets (MH, DL, KA, TS, GJ, HR), TCS rules, and MoRTH compliance checks.

---

## 🏁 Quickstart Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# 1. Clone repository
git clone https://github.com/parthgade17/CarFair.git
cd CarFair-1

# 2. Install all dependencies
npm run install:all
```

### Running Locally

```bash
# Option A: Run Full-Stack Simultaneously
# In terminal 1:
npm run dev:server

# In terminal 2:
npm run dev:client
```

- **Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

### Building for Production

```bash
# Build frontend bundle
npm run build:client

# Start production server (serves frontend + API on single port)
npm start
```

Open `http://localhost:5000` to access the live unified production app.

---

## 📜 Regulatory & Consumer Ethics

CarFair is designed in strict compliance with:
- **MoRTH (Ministry of Road Transport and Highways)**: Enforcement against unauthorized logistics/depot fees.
- **IRDAI Guidelines**: Freedom of car buyers to choose independent zero-depreciation motor insurance.
- **CCPA (Central Consumer Protection Authority)**: Prevention of dark patterns, drip pricing, and misleading headline discounts.

---

*Built with ❤️ for Indian car buyers by Parth Gade.*

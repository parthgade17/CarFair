-- ==============================================================================
-- CARFAIR POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- India's Verified Group Car-Buying & Quotation Auditing Platform
-- Fully Idempotent: Can be run repeatedly without errors.
-- ==============================================================================

-- 1. AUTOMOTIVE CATALOG TABLES
CREATE TABLE IF NOT EXISTS public.cars (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    segment TEXT NOT NULL,
    image TEXT NOT NULL,
    tagline TEXT,
    fuel_types TEXT[] DEFAULT '{}',
    transmissions TEXT[] DEFAULT '{}',
    price_range TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.car_variants (
    id TEXT PRIMARY KEY,
    car_id TEXT REFERENCES public.cars(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    ex_showroom BIGINT NOT NULL,
    fuel TEXT NOT NULL,
    transmission TEXT NOT NULL,
    engine_cc INT DEFAULT 0,
    seating INT DEFAULT 5,
    mileage TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AUTHORIZED SHOWROOM DEALERS
CREATE TABLE IF NOT EXISTS public.dealers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    city TEXT NOT NULL,
    area TEXT,
    location TEXT,
    contact_person TEXT,
    phone TEXT,
    email TEXT,
    rating NUMERIC(3,1) DEFAULT 4.8,
    reviews_count INT DEFAULT 1420,
    verified_status TEXT DEFAULT 'OEM Authorised Platinum Partner',
    inventory_ready_count INT DEFAULT 18,
    response_time_avg TEXT DEFAULT '20 mins',
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BUYING GROUPS (CAR POOLS)
CREATE TABLE IF NOT EXISTS public.buying_groups (
    id TEXT PRIMARY KEY,
    car_id TEXT REFERENCES public.cars(id) ON DELETE RESTRICT,
    variant_id TEXT REFERENCES public.car_variants(id) ON DELETE RESTRICT,
    car_name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT DEFAULT 'MH',
    community_name TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE_BIDDING', -- 'RECRUITING', 'ACTIVE_BIDDING', 'DEAL_LOCKED', 'COMPLETED'
    bidding_ends_at TIMESTAMPTZ,
    target_buyers INT DEFAULT 20,
    current_buyers INT DEFAULT 1,
    verified_buyers INT DEFAULT 1,
    baseline_showroom_price BIGINT NOT NULL,
    current_best_group_price BIGINT NOT NULL,
    verified_savings_total BIGINT DEFAULT 0,
    discount_tiers JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GROUP MEMBERS (BUYERS WHO JOINED)
CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id TEXT REFERENCES public.buying_groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    purchase_timeline TEXT DEFAULT 'Within 15 Days',
    is_financing_preapproved BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DEALERSHIP COMPETING BIDS (REVERSE AUCTIONS)
CREATE TABLE IF NOT EXISTS public.reverse_bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id TEXT REFERENCES public.buying_groups(id) ON DELETE CASCADE,
    dealer_id TEXT REFERENCES public.dealers(id) ON DELETE RESTRICT,
    dealer_name TEXT NOT NULL,
    ex_showroom_discount BIGINT DEFAULT 0,
    corporate_exchange_bonus BIGINT DEFAULT 0,
    freebies TEXT[] DEFAULT '{}',
    insurance_match_price BIGINT DEFAULT 0,
    waived_handling_charges BOOLEAN DEFAULT TRUE,
    delivery_days INT DEFAULT 7,
    final_on_road_per_unit BIGINT NOT NULL,
    is_winning BOOLEAN DEFAULT FALSE,
    terms TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRICE LOCK PASSES (BUYER FULFILLMENT CERTIFICATES)
CREATE TABLE IF NOT EXISTS public.deal_lock_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voucher_code TEXT UNIQUE NOT NULL,
    group_id TEXT REFERENCES public.buying_groups(id) ON DELETE RESTRICT,
    car_name TEXT NOT NULL,
    variant_name TEXT,
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    city TEXT NOT NULL,
    dealer_id TEXT,
    dealer_name TEXT NOT NULL,
    locked_on_road_price BIGINT NOT NULL,
    baseline_showroom_price BIGINT NOT NULL,
    guaranteed_savings BIGINT NOT NULL,
    claim_pin TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE_LOCKED', -- 'ACTIVE_LOCKED', 'REDEEMED', 'EXPIRED'
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SHOWROOM VEHICLE PHOTOS (IMAGE GALLERY)
CREATE TABLE IF NOT EXISTS public.showroom_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id TEXT REFERENCES public.cars(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption TEXT,
    category TEXT DEFAULT 'SHOWROOM_FLOOR', -- 'EXTERIOR', 'INTERIOR', 'COCKPIT', 'REAR', 'SHOWROOM_FLOOR'
    uploaded_by TEXT DEFAULT 'Authorized Dealership',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. QUOTETRUTH AUDITS (AI INVOICE CHECKER)
CREATE TABLE IF NOT EXISTS public.quotation_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_model TEXT NOT NULL,
    city TEXT NOT NULL,
    ex_showroom BIGINT NOT NULL,
    insurance BIGINT DEFAULT 0,
    handling BIGINT DEFAULT 0,
    accessories BIGINT DEFAULT 0,
    fastag BIGINT DEFAULT 0,
    total_savings_found BIGINT DEFAULT 0,
    fair_score INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. FUEL CARD CLAIMS & REWARDS
CREATE TABLE IF NOT EXISTS public.fuel_card_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voucher_code TEXT NOT NULL,
    invoice_number TEXT NOT NULL,
    total_paid BIGINT NOT NULL,
    status TEXT DEFAULT 'VERIFIED_ACTIVE', -- 'SUBMITTED', 'VERIFIED_ACTIVE', 'DISPATCHED'
    card_voucher_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buying_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reverse_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_lock_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showroom_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuel_card_claims ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access (Drop if exists first to prevent conflicts)
DROP POLICY IF EXISTS "Public cars read" ON public.cars;
CREATE POLICY "Public cars read" ON public.cars FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public variants read" ON public.car_variants;
CREATE POLICY "Public variants read" ON public.car_variants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public dealers read" ON public.dealers;
CREATE POLICY "Public dealers read" ON public.dealers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public groups read" ON public.buying_groups;
CREATE POLICY "Public groups read" ON public.buying_groups FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public group members read" ON public.group_members;
CREATE POLICY "Public group members read" ON public.group_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public reverse bids read" ON public.reverse_bids;
CREATE POLICY "Public reverse bids read" ON public.reverse_bids FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public deal lock read" ON public.deal_lock_passes;
CREATE POLICY "Public deal lock read" ON public.deal_lock_passes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public photos read" ON public.showroom_photos;
CREATE POLICY "Public photos read" ON public.showroom_photos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public audits read" ON public.quotation_audits;
CREATE POLICY "Public audits read" ON public.quotation_audits FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public fuel claims read" ON public.fuel_card_claims;
CREATE POLICY "Public fuel claims read" ON public.fuel_card_claims FOR SELECT USING (true);

-- Allow Public Insert, Update & Delete Access for Showroom Vehicle Management
DROP POLICY IF EXISTS "Public cars insert" ON public.cars;
CREATE POLICY "Public cars insert" ON public.cars FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public cars update" ON public.cars;
CREATE POLICY "Public cars update" ON public.cars FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public cars delete" ON public.cars;
CREATE POLICY "Public cars delete" ON public.cars FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public variants insert" ON public.car_variants;
CREATE POLICY "Public variants insert" ON public.car_variants FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public variants update" ON public.car_variants;
CREATE POLICY "Public variants update" ON public.car_variants FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public variants delete" ON public.car_variants;
CREATE POLICY "Public variants delete" ON public.car_variants FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public buying groups delete" ON public.buying_groups;
CREATE POLICY "Public buying groups delete" ON public.buying_groups FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public group members insert" ON public.group_members;
CREATE POLICY "Public group members insert" ON public.group_members FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public buying groups insert" ON public.buying_groups;
CREATE POLICY "Public buying groups insert" ON public.buying_groups FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public buying groups update" ON public.buying_groups;
CREATE POLICY "Public buying groups update" ON public.buying_groups FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public reverse bids insert" ON public.reverse_bids;
CREATE POLICY "Public reverse bids insert" ON public.reverse_bids FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public deal lock insert" ON public.deal_lock_passes;
CREATE POLICY "Public deal lock insert" ON public.deal_lock_passes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public photos insert" ON public.showroom_photos;
CREATE POLICY "Public photos insert" ON public.showroom_photos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public audits insert" ON public.quotation_audits;
CREATE POLICY "Public audits insert" ON public.quotation_audits FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public fuel claims insert" ON public.fuel_card_claims;
CREATE POLICY "Public fuel claims insert" ON public.fuel_card_claims FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Cars
INSERT INTO public.cars (id, brand, model, segment, image, tagline, fuel_types, transmissions, price_range) VALUES
('tata-nexon', 'Tata', 'Nexon', 'Compact SUV', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', 'India''s 5-Star BNCAP Best-Selling Compact SUV', ARRAY['Petrol', 'Diesel', 'EV'], ARRAY['Manual', 'AMT', 'DCA'], '₹8.15 Lakh - ₹15.80 Lakh'),
('hyundai-creta', 'Hyundai', 'Creta', 'Mid-size SUV', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', 'The Undisputed King of Indian Mid-Size SUVs', ARRAY['Petrol', 'Diesel'], ARRAY['Manual', 'IVT', '7DCT'], '₹11.00 Lakh - ₹20.15 Lakh'),
('mahindra-xuv700', 'Mahindra', 'XUV700', 'Premium SUV', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80', 'ADAS-Equipped Powerhouse for Highway Cruising', ARRAY['Petrol', 'Diesel'], ARRAY['Manual', 'Automatic Torque Converter'], '₹13.99 Lakh - ₹26.04 Lakh'),
('mahindra-scorpio-n', 'Mahindra', 'Scorpio-N', 'Body-on-frame SUV', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', 'The Big Daddy of Authentic 4x4 Road Presence', ARRAY['Petrol', 'Diesel'], ARRAY['Manual', 'Automatic 4XPLOR'], '₹13.85 Lakh - ₹24.54 Lakh')
ON CONFLICT (id) DO NOTHING;

-- Seed Variants
INSERT INTO public.car_variants (id, car_id, name, ex_showroom, fuel, transmission, engine_cc, seating, mileage) VALUES
('nexon-creative-plus', 'tata-nexon', 'Creative+ 1.2 Turbo Petrol 6AMT', 1169000, 'Petrol', 'AMT', 1199, 5, '17.1 kmpl'),
('nexon-smart-plus', 'tata-nexon', 'Smart+ 1.2 Revotron Petrol 5MT', 899000, 'Petrol', 'Manual', 1199, 5, '17.44 kmpl'),
('creta-sx-tech', 'hyundai-creta', 'SX (Tech) 1.5 MPi Petrol IVT Automatic', 1598000, 'Petrol', 'Automatic (IVT)', 1497, 5, '17.7 kmpl'),
('xuv700-ax7', 'mahindra-xuv700', 'AX7 2.2 mHawk Diesel AT (7-Seater)', 2199000, 'Diesel', 'Automatic', 2184, 7, '16.5 kmpl')
ON CONFLICT (id) DO NOTHING;

-- Seed Dealers
INSERT INTO public.dealers (id, name, brand, city, area, location, contact_person, phone, email, rating, is_verified) VALUES
('dealer-bafna-tata-pune', 'Bafna Tata Motors Flagship', 'Tata', 'Pune', 'Shivajinagar', 'Shivajinagar & Baner', 'Rajesh Kulkarni', '+91 98220 99887', 'bafna.tata@example.com', 4.9, TRUE),
('dealer-garve-hyundai-pune', 'Garve Hyundai Premium', 'Hyundai', 'Pune', 'Baner', 'Baner & Aundh', 'Sameer Deshmukh', '+91 98221 44556', 'garve.hyundai@example.com', 4.8, TRUE),
('dealer-silver-jubilee-mahindra-pune', 'Silver Jubilee Mahindra', 'Mahindra', 'Pune', 'Camp', 'Camp / Pune Cantonment', 'Virendra Pawar', '+91 98222 77889', 'silverjubilee@example.com', 4.9, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Seed Buying Groups
INSERT INTO public.buying_groups (id, car_id, variant_id, car_name, city, state, community_name, status, bidding_ends_at, target_buyers, current_buyers, verified_buyers, baseline_showroom_price, current_best_group_price, verified_savings_total, discount_tiers) VALUES
('grp-nexon-pune-8841', 'tata-nexon', 'nexon-creative-plus', 'Tata Nexon Creative+ 1.2 AMT', 'Pune', 'MH', 'Hinjewadi Tech Parks & Baner Buyers', 'ACTIVE_BIDDING', NOW() + INTERVAL '4 days', 20, 18, 14, 1362000, 1294000, 68000, '[{"minBuyers": 5, "discountPerBuyer": 28000, "perk": "Free Underbody Coating + 7D Mats"}, {"minBuyers": 10, "discountPerBuyer": 45000, "perk": "Extended 5-Yr Warranty + Anti-Rust"}, {"minBuyers": 20, "discountPerBuyer": 68000, "perk": "Fleet Price + 5-Yr Warranty + Free Ceramic Detailing"}]'::jsonb),
('grp-creta-pune-4412', 'hyundai-creta', 'creta-sx-tech', 'Hyundai Creta SX (Tech) IVT', 'Pune', 'MH', 'Magarpatta City & Kharadi IT Hub', 'ACTIVE_BIDDING', NOW() + INTERVAL '3 days', 15, 12, 10, 1845000, 1762000, 83000, '[{"minBuyers": 5, "discountPerBuyer": 35000, "perk": "Free 3M Ceramic Coating"}, {"minBuyers": 10, "discountPerBuyer": 60000, "perk": "Free 5-Yr Shield of Trust"}, {"minBuyers": 15, "discountPerBuyer": 83000, "perk": "Maximum OEM Corporate Bulk Discount"}]'::jsonb),
('grp-xuv700-pune-9932', 'mahindra-xuv700', 'xuv700-ax7', 'Mahindra XUV700 AX7 Diesel AT (7-Seater)', 'Pune', 'MH', 'Kothrud & Aundh Premium Club', 'ACTIVE_BIDDING', NOW() + INTERVAL '5 days', 10, 8, 7, 2580000, 2485000, 95000, '[{"minBuyers": 5, "discountPerBuyer": 50000, "perk": "Free 7-Seater Luxury Matting Pack"}, {"minBuyers": 10, "discountPerBuyer": 95000, "perk": "Direct Manufacturer Fleet Rebate"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed Showroom Photos
INSERT INTO public.showroom_photos (car_id, url, caption, category, uploaded_by) VALUES
('tata-nexon', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', 'Front 3/4 Stance with Bi-Functional LED Headlamps', 'EXTERIOR', 'Bafna Tata Motors Flagship (Shivajinagar Pune)'),
('tata-nexon', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', 'Dual-Tone Leatherette Cabin & Digital Instrument Cluster', 'INTERIOR', 'Bafna Tata Motors Flagship (Shivajinagar Pune)'),
('tata-nexon', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', 'Connected X-Factor LED Taillight & Dual-Tone Aero Roof', 'REAR', 'Bafna Tata Motors Flagship (Shivajinagar Pune)'),
('tata-nexon', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', 'Showroom Stock Ready for PDI & 7-Day Fast Delivery', 'SHOWROOM_FLOOR', 'Bafna Tata Motors Flagship (Shivajinagar Pune)'),
('hyundai-creta', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', 'Parametric Jewel Chrome Grille & Horizon LED Positioning Lamp', 'EXTERIOR', 'Garve Hyundai (Baner Pune)'),
('hyundai-creta', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', 'Seamless Dual 10.25-inch Display & Ventilated Front Seats', 'COCKPIT', 'Garve Hyundai (Baner Pune)')
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- CARFAIR DYNAMIC RESET SCRIPT (RUN IN SUPABASE SQL EDITOR)
-- Clears all static demo data and enables full showroom dynamic read/write access
-- ==============================================================================

-- 1. Disable Row Level Security (RLS) so the frontend showroom portal can 
-- directly add, update, and delete vehicles and buyer pools via PostgREST:
ALTER TABLE IF EXISTS public.cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.car_variants DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.buying_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.group_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reverse_bids DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.deal_lock_passes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dealers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.showroom_photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.quotation_audits DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.fuel_card_claims DISABLE ROW LEVEL SECURITY;

-- 2. Grant full permissions to anon & authenticated roles:
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 3. Truncate all demo cars, variants, groups, and bids (Fresh Clean Slate):
TRUNCATE TABLE public.deal_lock_passes CASCADE;
TRUNCATE TABLE public.reverse_bids CASCADE;
TRUNCATE TABLE public.group_members CASCADE;
TRUNCATE TABLE public.buying_groups CASCADE;
TRUNCATE TABLE public.car_variants CASCADE;
TRUNCATE TABLE public.cars CASCADE;
TRUNCATE TABLE public.showroom_photos CASCADE;

-- Note: Dealerships table is preserved with your 3 verified partner showrooms.

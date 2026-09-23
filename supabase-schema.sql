-- ====================================================================
-- SUPABASE SCHEMA FOR AMAZON AFFILIATE HUB (DEALNEST / SMARTNEST)
-- ====================================================================
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- It creates the 'deals' table and 'site_settings' table with public read/write access.

-- 1. Create deals table
CREATE TABLE IF NOT EXISTS public.deals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'amazon-deals',
  store TEXT DEFAULT 'Amazon',
  original_price TEXT,
  deal_price TEXT,
  discount TEXT,
  rating TEXT DEFAULT '4.8',
  reviews_count TEXT DEFAULT '1,000+',
  badge TEXT DEFAULT '🔥 Top Deal',
  image TEXT,
  affiliate_url TEXT,
  is_top_pick BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create site_settings table (for amazon tag, site name, flash banner, etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Create policies allowing public read access (for all website visitors)
DROP POLICY IF EXISTS "Public can read deals" ON public.deals;
CREATE POLICY "Public can read deals" ON public.deals
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read settings" ON public.site_settings;
CREATE POLICY "Public can read settings" ON public.site_settings
  FOR SELECT USING (true);

-- 5. Create policies allowing public insert/update/delete (for admin operations using anon key)
DROP POLICY IF EXISTS "Public can insert deals" ON public.deals;
CREATE POLICY "Public can insert deals" ON public.deals
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update deals" ON public.deals;
CREATE POLICY "Public can update deals" ON public.deals
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete deals" ON public.deals;
CREATE POLICY "Public can delete deals" ON public.deals
  FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public can insert settings" ON public.site_settings;
CREATE POLICY "Public can insert settings" ON public.site_settings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update settings" ON public.site_settings;
CREATE POLICY "Public can update settings" ON public.site_settings
  FOR UPDATE USING (true);

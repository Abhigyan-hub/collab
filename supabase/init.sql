-- Supabase initialization SQL for Room Finder
-- Run this in Supabase Dashboard -> SQL Editor -> New Query

-- Create room_listings table
-- Ensure pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS room_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('1 BHK', '2 BHK', '1 Bed', '2 Bed', '3 Bed')),
  tenant_type TEXT NOT NULL CHECK (tenant_type IN ('Bachelor', 'Family', 'Girls', 'Working professionals')),
  owner_type TEXT NOT NULL CHECK (owner_type IN ('Direct Owner', 'Agent')),
  contact_number TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE room_listings ENABLE ROW LEVEL SECURITY;

-- Policies
-- Users can view their own listings
CREATE POLICY "Users can view own listings" ON public.room_listings
  FOR SELECT USING (auth.uid() = owner_id);

-- Users can insert their own listings
CREATE POLICY "Users can insert own listings" ON public.room_listings
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Users can update their own listings
CREATE POLICY "Users can update own listings" ON public.room_listings
  FOR UPDATE USING (auth.uid() = owner_id);

-- Users can delete their own listings
CREATE POLICY "Users can delete own listings" ON public.room_listings
  FOR DELETE USING (auth.uid() = owner_id);

-- Optional: create index on owner_id for faster queries
CREATE INDEX IF NOT EXISTS idx_room_listings_owner_id ON room_listings(owner_id);

-- Notes:
-- 1) If you prefer public visibility for testing, you can temporarily relax policies,
--    but for production it's recommended to keep RLS with appropriate checks.
-- 2) Run this query in Supabase SQL editor or via the supabase CLI.

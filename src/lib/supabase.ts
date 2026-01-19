import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface RoomListing {
  id?: string
  owner_id: string
  title: string
  location: string
  price: number
  property_type: '1 BHK' | '2 BHK' | '1 Bed' | '2 Bed' | '3 Bed'
  tenant_type: 'Bachelor' | 'Family' | 'Girls' | 'Working professionals'
  owner_type: 'Direct Owner' | 'Agent'
  contact_number: string
  images: string[]
  description?: string
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  email?: string
  phone?: string
  full_name?: string
  role: 'room_owner' | 'room_finder'
  created_at?: string
}

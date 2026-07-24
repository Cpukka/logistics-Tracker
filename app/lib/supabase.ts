import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema
export const TABLES = {
  USERS: 'users',
  SHIPMENTS: 'shipments',
  DRIVERS: 'drivers',
  VEHICLES: 'vehicles',
  DELIVERY_EVENTS: 'delivery_events',
  ROUTES: 'routes',
  CUSTOMERS: 'customers',
  ANALYTICS: 'analytics',
}
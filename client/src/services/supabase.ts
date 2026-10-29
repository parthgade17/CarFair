import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from Vite environment variables
const env = (import.meta as any).env || {};
const supabaseUrl: string = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey: string = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    supabaseUrl.includes('.supabase.co') &&
    supabaseAnonKey.length > 20
  );
};

// Create a singleton Supabase client instance
// If credentials are not yet set, we instantiate with dummy strings to avoid crash
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://dummy-carfair.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'dummy-anon-key'
);

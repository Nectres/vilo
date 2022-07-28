import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://anzajasiohqbrpjjapng.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

export const supabase = new SupabaseClient(supabaseUrl, supabaseKey);
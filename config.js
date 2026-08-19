const SUPABASE_URL = "https://gfhcqbosxtcuvxttmzsm.supabase.co";
const SUPABASE_ANON = "sb_publishable_yFwUs9GLJb8PvnB5Qj8rAA_vLF32P6l";
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);
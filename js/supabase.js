// Supabase client helper for Glory Verse (static build).
// Fill window.GV_CONFIG in your HTML or via a secure server-side render.
// Never commit real keys; use .env / hosting env vars in production.

export function getSupabase() {
  const cfg = window.GV_CONFIG || {};
  if (cfg.mockMode) {
    console.info('[GloryVerse] Running in MOCK MODE');
    return null;
  }
  if (!window.supabase) {
    console.warn('[GloryVerse] Supabase JS not loaded');
    return null;
  }
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('[GloryVerse] Supabase config belum diisi');
    return null;
  }
  return window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
}

export const supabase = getSupabase();

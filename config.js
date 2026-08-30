window.SUPABASE_URL = "https://gfhcqbosxtcuvxttmzsm.supabase.co";
window.SUPABASE_ANON = "publis key : sb_publishable_yFwUs9GLJb8PvnB5Qj8rAA_vLF32P6l";

function initDb(){
  if(typeof supabase === 'undefined'){
    setTimeout(initDb, 100);
    return;
  }
  window.db = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
  console.log('✅ Supabase connected');
}
initDb();

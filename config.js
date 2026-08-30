// config.js - GloryVerse
window.SUPABASE_URL = "https://gfhcqbosxtcuvxttmzsm.supabase.co";
window.SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaGNxYm9zeHRjdXZ4dHRtenNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5ODUyODQsImV4cCI6MjA0MDU2MTI4NH0.CHANGE_ME";

function initDb(){
  if(typeof supabase === 'undefined'){
    setTimeout(initDb, 100);
    return;
  }
  window.db = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
  console.log('✅ Supabase connected');
}
initDb();

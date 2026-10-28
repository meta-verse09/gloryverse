// Glory Verse - core logic (rewritten, independent from MyProfitLand)
(function () {
  'use strict';

  window.GV = window.GV || {};

  GV.mockPlayer = {
    id: 'ADVAN',
    name: 'ADVAN',
    avatar: 'https://mplstatic.com/avatars/b98a727e0b490619d96855788a47d410.jpg?1788961460',
    country: 'Maldives',
    countryCode: 'MV',
    region: 'Krsko',
    level: 29,
    xp: 11810,
    xpMax: 16091,
    energy: 62.41,
    health: 95.0,
    gold: 360.72,
    diamond: 12,
    euro: 0.03,
    svct: 106.95,
    ruf: 0.00,
    activeWar: true,
  };

  GV.buyBusiness = function (state, business, goldRef) {
    if (goldRef.value < business.base_price_gold) {
      return { ok: false, reason: 'insufficient_gold' };
    }
    goldRef.value -= business.base_price_gold;
    var existing = state.owned.find(function (o) { return o.business_id === business.id; });
    if (existing) existing.quantity += 1;
    else state.owned.push({ business_id: business.id, quantity: 1 });
    return { ok: true };
  };

  GV.totalProfitPerSecond = function (state, businesses) {
    return state.owned.reduce(function (acc, o) {
      var b = businesses.find(function (x) { return x.id === o.business_id; });
      return acc + (b ? b.profit_per_second * o.quantity : 0);
    }, 0);
  };

  GV.tickProfit = function (state, businesses, goldRef, onRender) {
    setInterval(function () {
      goldRef.value += GV.totalProfitPerSecond(state, businesses);
      if (typeof onRender === 'function') onRender();
    }, 1000);
  };

  GV.startClock = function (selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    var tick = function () {
      el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false });
    };
    tick();
    setInterval(tick, 1000);
  };

  // Supabase helper
  GV.getSupabase = function () {
    var cfg = window.GV_CONFIG || {};
    if (cfg.mockMode) return null;
    if (!window.supabase) return null;
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') return null;
    return window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  };
})();

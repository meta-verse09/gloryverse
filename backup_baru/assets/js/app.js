import { renderHeader, renderTopbar, renderSidebar } from './shell.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderPlaceholder } from './pages/placeholder.js';

/* ============ ROUTES ============ */
const ROUTES = {
  '/dashboard':           { title: 'Dashboard',      render: renderDashboard },
  '/activity/work':       { title: 'Work',           render: (m) => renderPlaceholder(m, 'Work') },
  '/activity/war':        { title: 'War Activity',   render: (m) => renderPlaceholder(m, 'War Activity') },
  '/market/local':        { title: 'Local Market',   render: (m) => renderPlaceholder(m, 'Local Goods Market') },
  '/market/global':       { title: 'Global Market',  render: (m) => renderPlaceholder(m, 'Global Goods Market') },
  '/country/accountancy': { title: 'Accountancy',    render: (m) => renderPlaceholder(m, 'Accountancy') },
  '/org/local':           { title: 'Organizations',  render: (m) => renderPlaceholder(m, 'Local Organizations') },
  '/rank/level':          { title: 'Rankings',       render: (m) => renderPlaceholder(m, 'Player Level Ranking') },
  '/community/forums':    { title: 'Forums',         render: (m) => renderPlaceholder(m, 'Forums') },
  '/companies':           { title: 'My Companies',   render: (m) => renderPlaceholder(m, 'My Companies') },
};

/* ============ BOOT ============ */
function boot() {
  renderHeader();
  renderTopbar(currentPath());
  renderSidebar();
  handleRoute();

  window.addEventListener('hashchange', () => {
    renderTopbar(currentPath());
    handleRoute();
  });
}

function currentPath() {
  return (location.hash || '#/dashboard').replace('#', '') || '/dashboard';
}

function handleRoute() {
  const path = currentPath();
  const main = document.getElementById('gv-main');
  const route = ROUTES[path];

  if (route) {
    document.title = `${route.title} · GloryVerse`;
    route.render(main);
  } else {
    renderPlaceholder(main, 'Page Not Found');
    document.title = 'Not Found · GloryVerse';
  }
  main.scrollTop = 0;
}

document.addEventListener('DOMContentLoaded', boot);

import { renderHeader, renderTopbar, renderSidebar } from './shell.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderWallet } from './pages/wallet.js';
import { renderPlaceholder } from './pages/placeholder.js';

/* ============ SUPABASE INIT ============ */
let supabase = null;
(function initSupabase() {
  const CFG = window.GV_CONFIG;
  if (CFG.mockMode) {
    console.info('[GloryVerse] Running in MOCK MODE');
    return;
  }
  if (!window.supabase) return;
  if (!CFG.supabaseAnonKey || CFG.supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('[GloryVerse] Supabase anon key belum diisi');
    return;
  }
  supabase = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey);
  console.info('[GloryVerse] Supabase connected:', CFG.supabaseUrl);
})();
window.GV_SUPABASE = () => supabase;

/* ============ ROUTES ============ */
const ROUTES = {
  '/dashboard':      { title: 'Dashboard',      render: renderDashboard },
  '/wallet':         { title: 'Wallet',         render: (m, p) => renderWallet(m, { tab: 'topup' }) },
  '/wallet/topup':   { title: 'Top Up',         render: (m) => renderWallet(m, { tab: 'topup' }) },
  '/wallet/withdraw':{ title: 'Withdraw',       render: (m) => renderWallet(m, { tab: 'withdraw' }) },
  '/wallet/history': { title: 'Wallet History', render: (m) => renderWallet(m, { tab: 'history' }) },

  // placeholders
  '/companies':      { title: 'My Companies',   render: (m) => renderPlaceholder(m, 'My Companies') },
  '/activity/work':  { title: 'Work',           render: (m) => renderPlaceholder(m, 'Work') },
  '/market/local':   { title: 'Local Market',   render: (m) => renderPlaceholder(m, 'Local Goods Market') },
  '/country/accountancy': { title: 'Accountancy', render: (m) => renderPlaceholder(m, 'Accountancy') },
  '/rank/level':     { title: 'Rankings',       render: (m) => renderPlaceholder(m, 'Player Level Ranking') },
  '/community/forums':{ title: 'Forums',        render: (m) => renderPlaceholder(m, 'Forums') },
};

/* ============ BOOT ============ */
function boot() {
  renderHeader();
  renderTopbar(currentPath());
  renderSidebar();
  handleRoute();

  window.addEventListener('hashchange', () => {
    renderTopbar(currentPath());
    handleRoute();
  });
}

function currentPath() {
  return (location.hash || '#/dashboard').replace('#', '') || '/dashboard';
}

function handleRoute() {
  const path = currentPath();
  const main = document.getElementById('gv-main');
  const route = ROUTES[path];

  if (route) {
    document.title = `${route.title} · GloryVerse`;
    route.render(main, route);
  } else {
    renderPlaceholder(main, 'Page Not Found');
    document.title = 'Not Found · GloryVerse';
  }
  main.scrollTop = 0;
}

document.addEventListener('DOMContentLoaded', boot);

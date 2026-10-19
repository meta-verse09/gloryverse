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

import { mockPlayer } from './data.js';

/* ============ HEADER ============ */
export function renderHeader() {
  const el = document.getElementById('gv-header');
  const p = mockPlayer;
  el.innerHTML = `
    <a href="#/dashboard" class="gv-brand">
      <div class="gv-brand-text">Glory<span>Verse</span></div>
    </a>

    <div class="gv-header-search">
      <input type="text" placeholder="Search players, companies, countries…">
    </div>

    <div class="gv-header-right">
      <div class="gv-clock" title="Server time (London)">
        <span class="gv-clock-time" id="gv-clock-time">--:--:--</span>
        <div class="gv-clock-bar" title="Next medal session: ${p.medalsProgress}%">
          <div style="width:${p.medalsProgress}%"></div>
        </div>
      </div>

      <a class="gv-label gv-label--success" href="#/dashboard">
        <i class="fa-solid fa-arrow-trend-up"></i> Income (20232)
      </a>
      <a class="gv-label gv-label--warning" href="#/dashboard">
        <i class="fa-solid fa-bell"></i> Alerts (9569)
      </a>
      <a class="gv-label gv-label--light" href="#/dashboard">
        <i class="fa-solid fa-envelope"></i> Messages (0)
      </a>
      <a class="gv-label gv-label--icon gv-label--light" href="#/dashboard" title="Notepad">
        <i class="fa-solid fa-file-lines"></i>
      </a>
      <a class="gv-label gv-label--icon gv-label--light" href="#/settings" title="Settings">
        <i class="fa-solid fa-gear"></i>
      </a>
      <a class="gv-label gv-label--icon gv-label--light" href="#/logout" title="Logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </a>
    </div>
  `;
  startClock();
}

function startClock() {
  const node = document.getElementById('gv-clock-time');
  if (!node) return;
  const tick = () => {
    node.textContent = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour12: false,
    });
  };
  tick();
  setInterval(tick, 1000);
}

/* ============ TOPBAR ============ */
const NAV = [
  { label: 'Dashboard', icon: 'fa-gauge-high', href: '#/dashboard' },
  {
    label: 'Activity', icon: 'fa-bolt',
    items: [
      { label: 'Work',                icon: 'fa-briefcase',        href: '#/activity/work' },
      { label: 'War Activity',        icon: 'fa-crosshairs',       href: '#/activity/war' },
      { label: 'Daily Hero',          icon: 'fa-star',             href: '#/activity/hero' },
      { label: 'North Korea Wars',    icon: 'fa-flag',             href: '#/activity/nk' },
      { label: 'Lookout Posts',       icon: 'fa-binoculars',       href: '#/activity/lookouts' },
      { label: 'Newspapers',          icon: 'fa-newspaper',        href: '#/activity/newspapers' },
      { label: 'The Local Bar',       icon: 'fa-glass-martini',    href: '#/activity/bar' },
      { divider: true },
      { label: 'Offers',              icon: 'fa-tag',              href: '#/activity/offers' },
      { label: 'Offers Contest',      icon: 'fa-trophy',           href: '#/activity/contests' },
    ]
  },
  {
    label: 'Market', icon: 'fa-store',
    items: [
      { label: 'Local Goods Market',  icon: 'fa-location-dot', href: '#/market/local' },
      { label: 'Global Goods Market', icon: 'fa-globe',        href: '#/market/global' },
      { divider: true },
      { label: 'Financial Market',    icon: 'fa-chart-line',   href: '#/market/financial' },
      { label: 'Recruits Auctions',   icon: 'fa-users',        href: '#/market/recruits' },
      { label: 'Real Estate Market',  icon: 'fa-house',        href: '#/market/realestate' },
      { label: 'Company Auctions',    icon: 'fa-shop',         href: '#/market/companies' },
      { label: 'Medals Market',       icon: 'fa-medal',        href: '#/market/medals' },
      { label: 'Regions Market',      icon: 'fa-flag',         href: '#/market/regions' },
      { divider: true },
      { label: 'Medals Shop',         icon: 'fa-certificate',  href: '#/market/shop' },
      { divider: true },
      { label: 'Victory Tokens',      icon: 'fa-rocket',       href: '#/market/vct' },
    ]
  },
  {
    label: 'Country', icon: 'fa-flag',
    items: [
      { label: 'Accountancy',      icon: 'fa-chart-pie',  href: '#/country/accountancy' },
      { label: 'Statistics',       icon: 'fa-chart-area', href: '#/country/statistics' },
      { label: 'Regions',          icon: 'fa-map',        href: '#/country/regions' },
      { label: 'Resources',        icon: 'fa-cubes',      href: '#/country/resources' },
      { label: 'Storage',          icon: 'fa-database',   href: '#/country/storage' },
      { label: 'Taxes & Laws',     icon: 'fa-file-lines', href: '#/country/taxes' },
      { label: 'Government',       icon: 'fa-users',      href: '#/country/gov' },
      { label: 'Law Proposals',    icon: 'fa-feather',    href: '#/country/laws' },
      { label: 'Elections',        icon: 'fa-vote-yea',   href: '#/country/elections' },
      { label: 'Patriots',         icon: 'fa-hand-fist',  href: '#/country/patriots' },
      { label: 'Army',             icon: 'fa-crosshairs', href: '#/country/army' },
      { label: 'Companies',        icon: 'fa-shop',       href: '#/country/companies' },
    ]
  },
  {
    label: 'Organizations', icon: 'fa-sitemap',
    items: [
      { label: 'Local Organizations',  icon: 'fa-location-dot', href: '#/org/local' },
      { label: 'Global Organizations', icon: 'fa-globe',        href: '#/org/global' },
      { divider: true },
      { label: 'Organization Panel',   icon: 'fa-gear',         href: '#/org/panel' },
    ]
  },
  {
    label: 'Rankings', icon: 'fa-ranking-star',
    items: [
      { label: 'Player Level',     icon: 'fa-ranking-star', href: '#/rank/level' },
      { label: 'Net Worth',        icon: 'fa-sack-dollar',  href: '#/rank/networth' },
      { label: 'Euros',            icon: 'fa-euro-sign',    href: '#/rank/euros' },
      { label: 'Gold',             icon: 'fa-coins',        href: '#/rank/gold' },
      { label: 'Energy',           icon: 'fa-bolt',         href: '#/rank/energy' },
      { label: 'Economic Score',   icon: 'fa-chart-line',   href: '#/rank/econ' },
      { label: 'War Damage',       icon: 'fa-explosion',    href: '#/rank/damage' },
      { label: 'Top Wars',         icon: 'fa-burst',        href: '#/rank/wars' },
      { label: 'Recruits Count',   icon: 'fa-users',        href: '#/rank/recruits' },
      { label: 'Recruits Income',  icon: 'fa-money-bill-trend-up', href: '#/rank/recruits-income' },
      { divider: true },
      { label: 'Countries — Citizenship', icon: 'fa-flag', href: '#/rank/citizens' },
      { label: 'Countries — Military',    icon: 'fa-shield', href: '#/rank/military' },
      { label: 'Countries — Regions',     icon: 'fa-map',  href: '#/rank/regions' },
      { label: 'Countries — Activity',    icon: 'fa-chart-simple', href: '#/rank/activity' },
    ]
  },
  {
    label: 'Community', icon: 'fa-comments',
    items: [
      { label: 'Forums',                 icon: 'fa-comments',           href: '#/community/forums' },
      { label: 'Code of Conduct',        icon: 'fa-scale-balanced',     href: '#/community/conduct' },
      { label: 'Documentation',          icon: 'fa-book',               href: '#/community/docs' },
      { divider: true },
      { label: 'Arena Fund',             icon: 'fa-trophy',             href: '#/community/arena' },
      { label: 'Global Market Fund',     icon: 'fa-globe',              href: '#/community/gmfund' },
      { label: 'War Fund',               icon: 'fa-bomb',               href: '#/community/warfund' },
      { divider: true },
      { label: 'Private Country Auction',icon: 'fa-gavel',              href: '#/community/private-country' },
      { label: 'Referral Rights Auction',icon: 'fa-user-plus',          href: '#/community/referral' },
      { divider: true },
      { label: 'Alliances',              icon: 'fa-handshake',          href: '#/community/alliances' },
      { label: 'Latest Citizens',        icon: 'fa-user-clock',         href: '#/community/citizens' },
      { label: 'Citizenship Changes',    icon: 'fa-right-left',         href: '#/community/citizenship' },
      { label: 'Abandoned Recruits',     icon: 'fa-user-slash',         href: '#/community/abandoned' },
    ]
  },
];

export function renderTopbar(currentRoute = '') {
  const el = document.getElementById('gv-topbar');
  el.innerHTML = `
    <ul class="gv-nav">
      ${NAV.map(item => {
        if (!item.items) {
          const active = currentRoute === item.href.replace('#', '') ? 'active' : '';
          return `
            <li class="gv-nav-item ${active}">
              <a href="${item.href}">
                <i class="fa-solid ${item.icon}"></i>${item.label}
              </a>
            </li>`;
        }
        return `
          <li class="gv-nav-item">
            <a>
              <i class="fa-solid ${item.icon}"></i>${item.label}
              <span class="caret">▼</span>
            </a>
            <ul class="gv-dropdown">
              ${item.items.map(sub => sub.divider
                ? `<li class="gv-divider"></li>`
                : `<li><a href="${sub.href}"><i class="fa-solid ${sub.icon}"></i>${sub.label}</a></li>`
              ).join('')}
            </ul>
          </li>`;
      }).join('')}
    </ul>
  `;
}

/* ============ SIDEBAR ============ */
export function renderSidebar() {
  const el = document.getElementById('gv-sidebar');
  const p = mockPlayer;

  el.innerHTML = `
    <div class="gv-player-card">
      <img class="gv-player-avatar" src="${p.avatar}" alt="${p.name}">
      <div class="gv-player-name">${p.name}</div>
      <div class="gv-player-loc">
        <img src="https://myprofitland.com/img/country_flags/16/${p.countryCode.toLowerCase()}.png">
        ${p.country} · ${p.region}
      </div>
      ${p.activeWar ? `
        <span class="gv-war-flag">
          <i class="fa-solid fa-crosshairs"></i> Active War
        </span>` : ''}
    </div>

    <div class="gv-stat">
      <div class="gv-stat-head"><span>Energy</span><b>${p.energy.toFixed(2)}%</b></div>
      <div class="gv-bar gv-bar--energy"><div style="width:${p.energy}%"></div></div>
    </div>

    <div class="gv-stat">
      <div class="gv-stat-head"><span>Health</span><b>${p.health.toFixed(1)}%</b></div>
      <div class="gv-bar gv-bar--health"><div style="width:${p.health}%"></div></div>
    </div>

    <div class="gv-stat">
      <div class="gv-stat-head"><span>Level ${p.level}</span><b>${p.xp}/${p.xpMax}</b></div>
      <div class="gv-bar gv-bar--xp"><div style="width:${((p.xp/p.xpMax)*100).toFixed(0)}%"></div></div>
    </div>

    <div class="gv-resources">
      <div class="gv-res-row">
        <i class="fa-solid fa-v" style="color:var(--gold)"></i>
        <span>sVCT</span><b>${p.svct.toFixed(3)}</b>
      </div>
      <div class="gv-res-row">
        <i class="fa-solid fa-euro-sign" style="color:#60a5fa"></i>
        <span>Euro</span><b>${p.euro.toFixed(2)}</b>
      </div>
      <div class="gv-res-row">
        <i class="fa-solid fa-coins" style="color:var(--gold-bright)"></i>
        <span>Gold</span><b>${p.gold.toFixed(2)}</b>
      </div>
      <div class="gv-res-row">
        <i class="fa-solid fa-money-bill" style="color:var(--cyan)"></i>
        <span>RUF</span><b>${p.ruf.toFixed(2)}</b>
      </div>
    </div>

    <div class="gv-alert gv-alert--info">
      <b>Breakfast</b> with 20% energy, served at 06:00 — you have <b>7 units</b>.
      <a href="#/activity/bar">Buy more</a>
    </div>

    <ul class="gv-sidebar-links">
      <li><a href="#/companies">My Companies</a></li>
      <li><a href="#/inventory">My Inventory</a></li>
      <li><a href="#/companion">My Companion</a></li>
      <li><a href="#/vehicles">My Vehicles</a></li>
      <li><a href="#/financials">My Finances</a></li>
      <li><a href="#/weapons">My Weapons &amp; Info</a></li>
      <li><a href="#/clothing">My Clothing</a></li>
      <li><a href="#/realestate">My Real Estate</a></li>
      <li><a href="#/recruits">My Recruits</a></li>
      <li><a href="#/medals">My Medals</a></li>
      <li><a href="#/newspapers">My Newspapers</a></li>
      <li><a href="#/regions">My Regions</a></li>
    </ul>

    <div class="gv-sidebar-actions">
      <button class="gv-btn gv-btn--gold gv-btn--sm" style="flex:1">
        <i class="fa-solid fa-download"></i> Invest
      </button>
      <button class="gv-btn gv-btn--red gv-btn--sm" style="flex:1">
        <i class="fa-solid fa-upload"></i> Withdraw
      </button>
    </div>
  `;
}

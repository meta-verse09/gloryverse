import { mockPlayer, mockCompanies, mockFriends, mockShouts, mockActivity, mockWars } from '../data.js';

const COMPANY_IMG = (icon) => `https://myprofitland.com/img/assets/buildings-companies/${icon}.png`;
const FLAG = (code) => `https://myprofitland.com/img/country_flags/16/${code}.png`;

export function renderDashboard(main) {
  const p = mockPlayer;

  main.innerHTML = `
    <div class="gv-page-header">
      <div>
        <h1 class="gv-page-title">Welcome back, <span>${p.name}</span></h1>
        <div class="gv-page-sub">Here's your empire at a glance.</div>
      </div>
      <div class="gv-flex" style="gap:8px">
        <button class="gv-btn gv-btn--ghost"><i class="fa-solid fa-rotate"></i> Refresh</button>
        <button class="gv-btn gv-btn--gold"><i class="fa-solid fa-bolt"></i> Quick Actions</button>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="gv-grid gv-grid--kpi gv-mb-lg">
      <div class="gv-kpi gv-kpi--energy">
        <div class="gv-kpi-label">Energy</div>
        <div class="gv-kpi-value">${p.energy.toFixed(1)}<small>%</small></div>
        <div class="gv-kpi-foot"><i class="fa-solid fa-bolt"></i> Regenerating</div>
        <i class="fa-solid fa-bolt gv-kpi-icon"></i>
      </div>
      <div class="gv-kpi gv-kpi--health">
        <div class="gv-kpi-label">Health</div>
        <div class="gv-kpi-value">${p.health.toFixed(0)}<small>%</small></div>
        <div class="gv-kpi-foot"><i class="fa-solid fa-heart-pulse"></i> Stable</div>
        <i class="fa-solid fa-heart-pulse gv-kpi-icon"></i>
      </div>
      <div class="gv-kpi gv-kpi--xp">
        <div class="gv-kpi-label">Level</div>
        <div class="gv-kpi-value">${p.level}</div>
        <div class="gv-kpi-foot"><i class="fa-solid fa-arrow-up"></i> ${p.xp}/${p.xpMax} XP</div>
        <i class="fa-solid fa-star gv-kpi-icon"></i>
      </div>
      <div class="gv-kpi gv-kpi--gold">
        <div class="gv-kpi-label">Gold</div>
        <div class="gv-kpi-value">${p.gold.toFixed(0)}<small>.${p.gold.toFixed(2).split('.')[1]}</small></div>
        <div class="gv-kpi-foot"><i class="fa-solid fa-coins"></i> Available balance</div>
        <i class="fa-solid fa-coins gv-kpi-icon"></i>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="gv-grid gv-grid--2">

      <!-- LEFT -->
      <div>
        <!-- My Companies -->
        <div class="gv-card gv-mb-md">
          <div class="gv-card-head">
            <h3 class="gv-card-title"><i class="fa-solid fa-building"></i> My Companies</h3>
            <a class="gv-btn gv-btn--ghost gv-btn--sm" href="#/companies">View All</a>
          </div>
          <div class="gv-company-list">
            ${mockCompanies.slice(0, 5).map(c => `
              <div class="gv-company-mini">
                <img src="${COMPANY_IMG(c.icon)}" alt="${c.type}">
                <div>
                  <div class="gv-company-mini-name">${c.name}</div>
                  <div class="gv-company-mini-sub">
                    ${c.type} · <img src="${FLAG(c.local.flag)}"> ${c.local.code}: ${c.local.val}
                  </div>
                </div>
                <div class="gv-text-right">
                  <div style="color:var(--gold-bright);font-weight:700;font-size:13px">
                    <i class="fa-solid fa-coins"></i> ${c.gold.toFixed(2)}
                  </div>
                  <a class="gv-btn gv-btn--ghost gv-btn--sm gv-mt-sm" href="#/companies/${c.id}">Manage</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="gv-card gv-mb-md">
          <div class="gv-card-head">
            <h3 class="gv-card-title"><i class="fa-solid fa-clock-rotate-left"></i> Recent Activity</h3>
          </div>
          <div class="gv-feed">
            ${mockActivity.map(a => `
              <div class="gv-feed-item">
                <div class="gv-feed-icon"><i class="fa-solid ${a.icon}"></i></div>
                <div class="gv-feed-text">${a.text}</div>
                <div class="gv-feed-time">${a.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Active Wars -->
        <div class="gv-card">
          <div class="gv-card-head">
            <h3 class="gv-card-title"><i class="fa-solid fa-crosshairs" style="color:var(--red)"></i> Active Wars</h3>
          </div>
          ${mockWars.map(w => `
            <div class="gv-company-mini gv-mb-sm">
              <div class="gv-feed-icon" style="background:rgba(230,57,70,.15);color:var(--red-bright)">
                <i class="fa-solid fa-burst"></i>
              </div>
              <div>
                <div class="gv-company-mini-name">${w.attacker} <span style="color:var(--text-muted)">vs</span> ${w.defender}</div>
                <div class="gv-company-mini-sub">Damage: <b style="color:var(--red-bright)">${w.damage}</b> · War #${w.id}</div>
              </div>
              <a class="gv-btn gv-btn--red gv-btn--sm" href="#/war/${w.id}">Join</a>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- RIGHT -->
      <div>
        <!-- Friends Online -->
        <div class="gv-card gv-mb-md">
          <div class="gv-card-head">
            <h3 class="gv-card-title"><i class="fa-solid fa-user-group"></i> Friends</h3>
            <a class="gv-btn gv-btn--ghost gv-btn--sm" href="#/community/citizens">View All</a>
          </div>
          ${mockFriends.slice(0, 6).map(f => `
            <div class="gv-friend">
              <div class="gv-status gv-status--${f.status}"></div>
              <div class="gv-friend-name"><a href="#/profile/${f.id}">${f.name}</a></div>
              <div class="gv-friend-loc"><img src="${FLAG(f.flag)}"></div>
            </div>
          `).join('')}
        </div>

        <!-- World Shouts -->
        <div class="gv-card">
          <div class="gv-card-head">
            <h3 class="gv-card-title"><i class="fa-solid fa-bullhorn"></i> Worldwide Shouts</h3>
          </div>
          ${mockShouts.slice(0, 3).map(s => `
            <div class="gv-shout">
              ${s.text}<br>
              <b>by ${s.by}</b> <img src="${FLAG(s.flag)}" style="display:inline;width:12px;vertical-align:-1px">
              <small>· ${s.time}</small>
            </div>
          `).join('')}
          <button class="gv-btn gv-btn--gold gv-btn--block gv-mt-sm">
            <i class="fa-solid fa-plus"></i> Post a Shout (2 gold)
          </button>
        </div>
      </div>

    </div>
  `;
}

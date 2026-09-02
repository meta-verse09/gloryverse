/* COMPANY MANAGEMENT POPUP - Logic */

// Data dummy company
const companyData = {
  id: 1,
  name: 'ADVAN - Solar Panel Farm',
  icon: '☀️',
  type: 'utility',
  balance: 57.76,
  worth: 0,
  currency: 'LEU',
  products: [
    { name: 'Electricity', icon: '⚡', stock: 6.38, capacity: 400, cost: 4.85, sellPrice: 0.049, active: true, licensed: 307 }
  ],
  materials: [],
  transactions: [
    { type: 'Gold', desc: 'Sold Electricity to Global Market', time: '10 hours ago', value: -2.25 },
    { type: 'Gold', desc: 'Company sold 150 Electricity', time: '18 hours ago', value: 15 },
    { type: 'Gold', desc: 'Paid fee to Global Fund', time: '1 day ago', value: -0.105 }
  ],
  alerts: [
    { message: 'Citizen Sennintan worked and produced 2.108 of Steel', time: '2 months ago' }
  ],
  managers: [
    { name: 'ADVAN', country: 'Monaco', wage: 0, permissions: ['Sales', 'Finances', 'Branches', 'Production', 'Inventory', 'Other', 'Workplaces'] }
  ],
  branches: [
    { region: 'Betawi', resources: { Coal: 22, Coffee: 26, Corn: 45 } }
  ],
  workplaces: [
    { worker: 'Player1', job: 'Gathering', productivity: 82.18, timeLeft: '2h 15m' }
  ],
  upgrades: [
    { level: 'I', desc: '+10% productivity', price: 5 },
    { level: 'II', desc: '+20% productivity', price: 10 },
    { level: 'III', desc: '+30% productivity', price: 15 }
  ]
};

// Buka Management Popup
window.openManagement = function(companyId) {
  const company = companyData;
  
  // Fill header
  document.getElementById('mgmt-icon').textContent = company.icon;
  document.getElementById('mgmt-title').textContent = company.name;
  document.getElementById('mgmt-balance').textContent = company.balance + ' Gold | 0 ' + company.currency;
  
  // Render semua tab
  renderFinanceTab(company);
  renderAlertsTab(company);
  renderManagersTab(company);
  renderSettingsTab(company);
  renderInventoryTab(company);
  renderWorkplacesTab(company);
  renderBranchesTab(company);
  
  // Hide tab Workplaces untuk utility company
  const workplacesTab = document.querySelector('.mgmt-tab:nth-child(6)');
  if (company.type === 'utility') {
    if (workplacesTab) workplacesTab.style.display = 'none';
  }
  
  // Show popup
  document.getElementById('mgmt-overlay').style.display = 'block';
  document.getElementById('mgmt-popup').classList.add('show');
  
  // Set default tab
  switchMgmtTab('finance');
};

// Tutup Management Popup
window.closeManagement = function() {
  document.getElementById('mgmt-overlay').style.display = 'none';
  document.getElementById('mgmt-popup').classList.remove('show');
};

// Switch Tab
window.switchMgmtTab = function(tabName) {
  // Update active tab button
  document.querySelectorAll('.mgmt-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Find the button that was clicked or match by onclick
  const buttons = document.querySelectorAll('.mgmt-tab');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabName)) {
      btn.classList.add('active');
    }
  });
  
  // Show active content
  document.querySelectorAll('.mgmt-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  const activeContent = document.getElementById('tab-' + tabName);
  if (activeContent) activeContent.classList.add('active');
};

// Render Tab Finance
function renderFinanceTab(company) {
  document.getElementById('finance-balance').textContent = company.balance.toFixed(2) + ' Gold';
  document.getElementById('finance-worth').textContent = company.worth.toFixed(2) + ' Euro';
  
  const tbody = document.getElementById('transactions-body');
  if (company.transactions && company.transactions.length > 0) {
    tbody.innerHTML = company.transactions.map(t => `
      <tr>
        <td>${t.type}</td>
        <td>${t.desc}</td>
        <td>${t.time}</td>
        <td style="color:${t.value >= 0 ? '#28a745' : '#dc3545'}; font-weight:700;">
          ${t.value >= 0 ? '+' : ''}${t.value.toFixed(3)}
        </td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No transactions yet</td></tr>';
  }
}

// Render Tab Alerts
function renderAlertsTab(company) {
  const tbody = document.getElementById('alerts-body');
  if (company.alerts && company.alerts.length > 0) {
    tbody.innerHTML = company.alerts.map(a => `
      <tr>
        <td>${a.message}</td>
        <td>${a.time}</td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No alerts</td></tr>';
  }
}

// Render Tab Managers
function renderManagersTab(company) {
  const tbody = document.getElementById('managers-body');
  if (company.managers && company.managers.length > 0) {
    tbody.innerHTML = company.managers.map(m => `
      <tr>
        <td><strong>${m.name}</strong><br><small>${m.country}</small></td>
        <td>${m.wage}</td>
        <td>${m.permissions.map(p => '✅ ' + p).join('<br>')}</td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No managers</td></tr>';
  }
}

// Render Tab Settings
function renderSettingsTab(company) {
  const tbody = document.getElementById('upgrades-body');
  if (company.upgrades && company.upgrades.length > 0) {
    tbody.innerHTML = company.upgrades.map(u => `
      <tr>
        <td>Productivity Upgrade ${u.level}</td>
        <td>${u.desc}</td>
        <td>${u.price} Euro</td>
        <td><button class="mgmt-btn-green">Buy Upgrade</button></td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No upgrades available</td></tr>';
  }
  
  const nameInput = document.getElementById('company-name-input');
  if (nameInput) {
    nameInput.value = company.name;
  }
}

// Render Tab Inventory
function renderInventoryTab(company) {
  // Materials
  const matTbody = document.getElementById('materials-body');
  if (company.materials && company.materials.length > 0) {
    matTbody.innerHTML = company.materials.map(m => `
      <tr>
        <td>${m.icon} ${m.name}</td>
        <td>
          <div class="stock-bar-container">
            <div class="stock-bar"><div class="stock-bar-fill" style="width:${(m.stock/m.capacity)*100}%"></div></div>
            <span class="stock-text">${m.stock} / ${m.capacity}</span>
          </div>
        </td>
        <td>${m.cost}</td>
        <td><button class="mgmt-btn-gray">Orders Market</button></td>
      </tr>
    `).join('');
  } else {
    matTbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No materials (Utility Company)</td></tr>';
  }
  
  // Products
  const prodTbody = document.getElementById('products-body');
  if (company.products && company.products.length > 0) {
    prodTbody.innerHTML = company.products.map(p => `
      <tr>
        <td>${p.icon} <strong>${p.name}</strong><br>
          <span class="status-badge ${p.active ? 'status-active' : 'status-stopped'}">
            ${p.active ? 'Active' : 'Stopped'}
          </span>
          <small>${p.licensed} licensed</small>
        </td>
        <td>
          <div class="stock-bar-container">
            <div class="stock-bar"><div class="stock-bar-fill" style="width:${(p.stock/p.capacity)*100}%"></div></div>
            <span class="stock-text">${p.stock} / ${p.capacity}</span>
          </div>
        </td>
        <td>${p.cost}<br><small>${p.sellPrice} per unit</small></td>
        <td><button class="mgmt-btn-green">Orders Market</button></td>
      </tr>
    `).join('');
  } else {
    prodTbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No products</td></tr>';
  }
}

// Render Tab Workplaces
function renderWorkplacesTab(company) {
  const tbody = document.getElementById('workplaces-body');
  if (company.workplaces && company.workplaces.length > 0) {
    tbody.innerHTML = company.workplaces.map(w => `
      <tr>
        <td>${w.worker}</td>
        <td>${w.job}</td>
        <td>${w.productivity}%</td>
        <td>${w.timeLeft}</td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No active workplaces</td></tr>';
  }
}

// Render Tab Branches
function renderBranchesTab(company) {
  const tbody = document.getElementById('branches-body');
  if (company.branches && company.branches.length > 0) {
    tbody.innerHTML = company.branches.map(b => `
      <tr>
        <td><strong>${b.region}</strong></td>
        <td>${Object.entries(b.resources).map(([k,v]) => `${k}: ${v}`).join(', ')}</td>
        <td><button class="mgmt-btn-gray">New Branch</button></td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">No branches</td></tr>';
  }
}

// ESC key to close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeManagement();
  }
});

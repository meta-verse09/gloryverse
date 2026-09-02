/* ============================================
   COMPANY PAGE - Logic
   ============================================ */

// Data Company Types (sama seperti MyProfitLand)
const companyTypes = {
  utilities: [
    { id: 'solar-farm', name: 'Solar Panel Farm', icon: '☀️', desc: 'Menghasilkan listrik. Tidak butuh bahan baku. Listrik dibutuhkan perusahaan lain.', cost: 0 },
    { id: 'water-well', name: 'Water Well Drilling', icon: '💧', desc: 'Menghasilkan air. Tidak butuh bahan baku. Air dibutuhkan perusahaan lain.', cost: 0 }
  ],
  services: [
    { id: 'milk-coffee-shop', name: 'Milk and Coffee Shop', icon: '☕', desc: 'Menghasilkan Milk Jugs & Coffee. Butuh Processed Milk & Coffee Beans.', cost: 30 },
    { id: 'house-construction', name: 'House Construction', icon: '🏠', desc: 'Membangun rumah. Butuh Wood, Steel, Stone.', cost: 30 },
    { id: 'attack-weapons', name: 'Attack Weapons Factory', icon: '⚔️', desc: 'Menghasilkan senjata serang. Butuh Steel & Wood.', cost: 30 },
    { id: 'defence-weapons', name: 'Defence Weapons Factory', icon: '️', desc: 'Menghasilkan senjata pertahanan. Butuh Steel & Wood.', cost: 30 },
    { id: 'clothes-factory', name: 'Clothes Factory', icon: '', desc: 'Menghasilkan pakaian. Butuh Fabrics, Polyester, Leather.', cost: 30 },
    { id: 'vehicles-factory', name: 'Vehicles Factory', icon: '🚗', desc: 'Menghasilkan kendaraan. Butuh vehicle parts, steel, fabrics.', cost: 30 },
    { id: 'winery', name: 'Winery', icon: '🍷', desc: 'Menghasilkan wine. Butuh Grapes.', cost: 30 },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', desc: 'Menghasilkan Food & Coffee. Butuh Wheat Flour, Meat, Coffee Beans.', cost: 30 },
    { id: 'cheese-shop', name: 'Cheese Shop', icon: '🧀', desc: 'Menghasilkan Cheese. Butuh Raw Milk.', cost: 30 },
    { id: 'filling-station', name: 'Filling Station', icon: '⛽', desc: 'Menjual bahan bakar. Butuh Processed Fuel.', cost: 30 },
    { id: 'newspaper', name: 'Newspaper', icon: '', desc: 'Menghasilkan artikel. Butuh paper & ink.', cost: 5 },
    { id: 'brewery', name: 'Brewery', icon: '🍺', desc: 'Menghasilkan beer. Butuh wheat.', cost: 30 },
    { id: 'notary', name: 'Notary', icon: '📜', desc: 'Menghasilkan dokumen legal. Butuh paper.', cost: 30 },
    { id: 'knowledge-academy', name: 'Knowledge Academy', icon: '🎓', desc: 'Menghasilkan knowledge books.', cost: 30 },
    { id: 'bank', name: 'Bank', icon: '🏦', desc: 'Transfer Gold & memberikan pinjaman. Butuh paper.', cost: 30 },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', desc: 'Menjual produk kesehatan.', cost: 30 }
  ],
  consumer: [
    { id: 'cow-farm', name: 'Cow Farm', icon: '🐄', desc: 'Menghasilkan Raw Milk. Butuh Wheat.', cost: 30 },
    { id: 'milk-factory', name: 'Milk Factory', icon: '🥛', desc: 'Menghasilkan Processed Milk. Butuh Raw Milk.', cost: 30 },
    { id: 'foundry', name: 'Foundry', icon: '🏭', desc: 'Menghasilkan Steel. Butuh Iron & Coal.', cost: 30 },
    { id: 'refinery', name: 'Refinery', icon: '🛢️', desc: 'Menghasilkan Processed Oil. Butuh Oil.', cost: 30 },
    { id: 'fabrics-factory', name: 'Fabrics Factory', icon: '🧵', desc: 'Menghasilkan Fabrics. Butuh Cotton.', cost: 30 },
    { id: 'plastics-factory', name: 'Plastics Factory', icon: '', desc: 'Menghasilkan Plastics. Butuh Chemical Compounds.', cost: 30 },
    { id: 'parts-factory', name: 'Parts Factory', icon: '⚙️', desc: 'Menghasilkan vehicle parts. Butuh Steel.', cost: 30 },
    { id: 'mill', name: 'Mill', icon: '', desc: 'Menghasilkan Wheat Flour & Corn Flour. Butuh Wheat & Corn.', cost: 30 },
    { id: 'paper-mill', name: 'Paper Mill', icon: '', desc: 'Menghasilkan paper & cotton paper. Butuh wood & cotton.', cost: 30 },
    { id: 'military-factory', name: 'Military Factory', icon: '🎖️', desc: 'Menghasilkan senjata mass destruction.', cost: 30 },
    { id: 'glass-factory', name: 'Glass Factory', icon: '🪟', desc: 'Menghasilkan windows & glass panels. Butuh Sand.', cost: 30 },
    { id: 'recycling-center', name: 'Recycling Center', icon: '️', desc: 'Menghasilkan produk dari scrap.', cost: 30 },
    { id: 'fertilizing-factory', name: 'Fertilizing Factory', icon: '🌱', desc: 'Menghasilkan fertilizer. Butuh Manure.', cost: 30 },
    { id: 'pig-farm', name: 'Pig Farm', icon: '🐷', desc: 'Menghasilkan bacon. Butuh Wheat.', cost: 30 },
    { id: 'bakery', name: 'Bakery', icon: '🍞', desc: 'Menghasilkan bread. Butuh Wheat Flour.', cost: 30 }
  ],
  gathering: [
    { id: 'iron-mine', name: 'Iron Mine', icon: '⛏️', desc: 'Menghasilkan Iron. Digunakan untuk senjata, rumah, transportasi.', cost: 30 },
    { id: 'wood-cutter', name: 'Wood Cutter', icon: '', desc: 'Menghasilkan Wood. Digunakan untuk senjata, rumah, transportasi.', cost: 30 },
    { id: 'stone-quarry', name: 'Stone Quarry', icon: '', desc: 'Menghasilkan Stone. Digunakan untuk rumah.', cost: 30 },
    { id: 'coffee-plantation', name: 'Coffee Plantation', icon: '☕', desc: 'Menghasilkan Coffee Beans. Digunakan untuk Coffee.', cost: 30 },
    { id: 'coal-mine', name: 'Coal Mine', icon: '', desc: 'Menghasilkan Coal. Digunakan untuk Foundry.', cost: 30 },
    { id: 'vineyard', name: 'Vineyard', icon: '🍇', desc: 'Menghasilkan Grapes. Digunakan untuk Wine.', cost: 30 },
    { id: 'oil-extraction', name: 'Oil Extraction', icon: '🛢️', desc: 'Menghasilkan Oil. Digunakan untuk Refinery.', cost: 30 },
    { id: 'cotton-plantation', name: 'Cotton Plantation', icon: '🌿', desc: 'Menghasilkan Cotton. Digunakan untuk Fabrics.', cost: 30 },
    { id: 'cereal-farm', name: 'Cereal Farm', icon: '🌾', desc: 'Menghasilkan Wheat & Corn.', cost: 30 },
    { id: 'uranium-mine', name: 'Uranium Mine', icon: '☢️', desc: 'Menghasilkan Uranium. Digunakan untuk senjata nuklir.', cost: 30 },
    { id: 'sand-pit', name: 'Sand Pit', icon: '️', desc: 'Menghasilkan Sand. Digunakan untuk Glass Factory.', cost: 30 },
    { id: 'vegetable-farm', name: 'Vegetable Farm', icon: '🥕', desc: 'Menghasilkan Vegetables. Digunakan untuk Food & Pig Farm.', cost: 30 },
    { id: 'herbs-plantation', name: 'Herbs Plantation', icon: '', desc: 'Menghasilkan Herbs. Digunakan untuk Botanical Factory.', cost: 30 }
  ]
};

// Dummy Data: My Companies (nanti dari Supabase)
const myCompanies = [
  { id: 1, type: 'solar-farm', name: 'ADVAN - Solar Panel Farm', owner: 'You', gold: 57.78, license: 'EU: 0', workplaces: 1 },
  { id: 2, type: 'clothes-factory', name: 'ADVAN - Clothes Factory', owner: 'You', gold: 1.95, license: 'MFR: 18.47', workplaces: 1 }
];

// Dummy Data: Managing Companies
const managingCompanies = [
  { id: 101, type: 'iron-mine', name: 'Bulux - Philippines Iron Mine Corp', owner: 'Bulux', country: 'Philippines', workplaces: 5 }
];

// Current state
let currentMainTab = 'my-companies';
let currentSubTab = 'utilities';
let selectedCompany = null;

// Initialize
window.initCompanyPage = function() {
  renderMyCompanies();
  renderManagingCompanies();
  renderNewCompanies(currentSubTab);
};

// Switch Main Tab
window.switchMainTab = function(tab) {
  currentMainTab = tab;
  
  // Update active tab
  document.querySelectorAll('.company-main-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Show/hide content
  document.getElementById('tab-my-companies').style.display = tab === 'my-companies' ? 'block' : 'none';
  document.getElementById('tab-start-new').style.display = tab === 'start-new' ? 'block' : 'none';
};

// Switch Sub Tab
window.switchSubTab = function(tab) {
  currentSubTab = tab;
  
  // Update active tab
  document.querySelectorAll('.company-sub-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Render companies
  renderNewCompanies(tab);
};

// Render My Companies
function renderMyCompanies() {
  const grid = document.getElementById('my-company-grid');
  
  if (myCompanies.length === 0) {
    grid.innerHTML = '<p style="color:rgba(255,255,255,0.5); text-align:center; padding:30px;">Kamu belum memiliki perusahaan. Mulai perusahaan pertamamu!</p>';
    return;
  }
  
  grid.innerHTML = myCompanies.map(company => {
    const type = findCompanyType(company.type);
    return `
      <div class="company-card">
        <div class="company-card-header">
          <div class="company-card-icon">${type.icon}</div>
          <div class="company-card-title">
            <h4>${company.name}</h4>
            <div class="company-card-stats">
              <span>💰 Gold: ${company.gold}</span>
              <span> ${company.license}</span>
              <span>🏭 WP: ${company.workplaces}</span>
            </div>
          </div>
        </div>
        <div class="company-card-desc">${type.desc}</div>
        <div class="company-card-actions">
          <button class="btn-management" onclick="openManagement(${company.id})">Management</button>
          <button class="btn-workplace">🏭</button>
          <button class="btn-edit">✏️</button>
        </div>
      </div>
    `;
  }).join('');
}

// Render Managing Companies
function renderManagingCompanies() {
  const grid = document.getElementById('managing-company-grid');
  
  if (managingCompanies.length === 0) {
    grid.innerHTML = '<p style="color:rgba(255,255,255,0.5);">Tidak ada perusahaan yang kamu kelola.</p>';
    return;
  }
  
  grid.innerHTML = managingCompanies.map(company => {
    const type = findCompanyType(company.type);
    return `
      <div class="company-card">
        <div class="company-card-header">
          <div class="company-card-icon">${type.icon}</div>
          <div class="company-card-title">
            <h4>${company.name}</h4>
            <div class="company-card-stats">
              <span> Owner: ${company.owner}</span>
              <span>🌍 ${company.country}</span>
              <span>🏭 WP: ${company.workplaces}</span>
            </div>
          </div>
        </div>
        <div class="company-card-desc">${type.desc}</div>
        <div class="company-card-actions">
          <button class="btn-management">Management</button>
        </div>
      </div>
    `;
  }).join('');
}

// Render New Companies
function renderNewCompanies(category) {
  const grid = document.getElementById('new-company-grid');
  const companies = companyTypes[category] || [];
  
  grid.innerHTML = companies.map(company => `
    <div class="company-card">
      <div class="company-card-header">
        <div class="company-card-icon">${company.icon}</div>
        <div class="company-card-title">
          <h4>${company.name}</h4>
        </div>
      </div>
      <div class="company-card-desc">${company.desc}</div>
      <div class="company-card-actions">
        <button class="btn-open-company" onclick="openCompanyPopup('${company.id}', '${category}')">
          Open Company
        </button>
      </div>
      <div style="margin-top:8px; font-size:11px; color:rgba(255,255,255,0.5);">
        (Costs: ${company.cost} Euro)
      </div>
    </div>
  `).join('');
}

// Find Company Type
function findCompanyType(id) {
  for (let category in companyTypes) {
    const found = companyTypes[category].find(c => c.id === id);
    if (found) return found;
  }
  return { icon: '🏭', desc: 'Company', name: 'Unknown' };
}

// Open Company Popup
window.openCompanyPopup = function(companyId, category) {
  const company = companyTypes[category].find(c => c.id === companyId);
  if (!company) return;
  
  selectedCompany = company;
  
  // Fill popup
  document.getElementById('popup-company-title').textContent = 'Buka ' + company.name;
  document.getElementById('popup-company-icon').textContent = company.icon;
  document.getElementById('popup-company-name').textContent = company.name;
  document.getElementById('popup-company-desc').textContent = company.desc;
  document.getElementById('popup-cost').textContent = company.cost + ' Euro';
  
  // Show popup
  document.getElementById('company-popup-overlay').style.display = 'block';
  document.getElementById('company-popup').style.display = 'block';
};

// Close Company Popup
window.closeCompanyPopup = function() {
  document.getElementById('company-popup-overlay').style.display = 'none';
  document.getElementById('company-popup').style.display = 'none';
  selectedCompany = null;
};

// Confirm Open Company
window.confirmOpenCompany = function() {
  if (!selectedCompany) {
    alert('Error: Company tidak valid.');
    return;
  }
  
  // Success
  alert(`Berhasil membuka ${selectedCompany.name}!\nBiaya: ${selectedCompany.cost} Euro\n\nSekarang kamu bisa membuka Workplace dan merekrut worker.`);
  
  closeCompanyPopup();
  
  // TODO: Nanti di sini kita akan:
  // 1. Kurangi Euro player
  // 2. Simpan company ke database
  // 3. Berikan production license
  // 4. Update UI
};

// Search Company
window.searchCompany = function() {
  const searchTerm = document.getElementById('search-company').value.toLowerCase();
  const cards = document.querySelectorAll('#my-company-grid .company-card');
  
  cards.forEach(card => {
    const name = card.querySelector('h4').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

// Auto init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initCompanyPage);
} else {
  window.initCompanyPage();
}

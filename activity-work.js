/* ============================================
   ACTIVITY WORK - Logic
   ============================================ */

// Dummy Data Company (nanti diganti dengan data dari Supabase)
const companyData = {
  gathering: [
    { employer: 'Poa - Coffee Plantation', owner: 'Poa', company: 'Coffee Plantation', wage: 14.0, skill: 'Gathering', skillLevel: 100 },
    { employer: 'Poa - Wood Cutter', owner: 'Poa', company: 'Wood Cutter', wage: 14.0, skill: 'Gathering', skillLevel: 100 },
    { employer: 'Poa - Cotton Plantation', owner: 'Poa', company: 'Cotton Plantation', wage: 14.0, skill: 'Gathering', skillLevel: 100 },
    { employer: 'Budi - Rice Farm', owner: 'Budi', company: 'Rice Farm', wage: 12.5, skill: 'Gathering', skillLevel: 85 },
    { employer: 'Siti - Tea Garden', owner: 'Siti', company: 'Tea Garden', wage: 11.0, skill: 'Gathering', skillLevel: 70 }
  ],
  hand: [
    { employer: 'Andi - Furniture', owner: 'Andi', company: 'Furniture Maker', wage: 16.0, skill: 'Hand Working', skillLevel: 90 },
    { employer: 'Rina - Craft', owner: 'Rina', company: 'Handicraft', wage: 13.5, skill: 'Hand Working', skillLevel: 75 }
  ],
  service: [
    { employer: 'Hotel Mewah', owner: 'Budi', company: 'Luxury Hotel', wage: 18.0, skill: 'Guest Service', skillLevel: 95 },
    { employer: 'Restaurant Elite', owner: 'Siti', company: 'Fine Dining', wage: 15.0, skill: 'Guest Service', skillLevel: 80 }
  ],
  engineering: [
    { employer: 'Tech Corp', owner: 'Andi', company: 'Engineering Firm', wage: 25.0, skill: 'Engineering', skillLevel: 100 },
    { employer: 'Build Co', owner: 'Rina', company: 'Construction', wage: 20.0, skill: 'Engineering', skillLevel: 85 }
  ],
  writing: [
    { employer: 'News Daily', owner: 'Budi', company: 'Newspaper', wage: 12.0, skill: 'Writing', skillLevel: 90 },
    { employer: 'Blog Inc', owner: 'Siti', company: 'Content Agency', wage: 10.0, skill: 'Writing', skillLevel: 70 }
  ],
  extraction: [
    { employer: 'Mine Corp', owner: 'Andi', company: 'Gold Mine', wage: 22.0, skill: 'Extraction', skillLevel: 95 },
    { employer: 'Quarry Ltd', owner: 'Rina', company: 'Stone Quarry', wage: 18.0, skill: 'Extraction', skillLevel: 80 }
  ]
};

// Current state
let currentTab = 'gathering';
let currentCompany = null;
let currentCaptcha = '';

// Initialize
window.initWorkPage = function() {
  renderWorkTable(currentTab);
  updateTabCounts();
  generateCaptcha();
};

// Switch Tab
window.switchWorkTab = function(tab) {
  currentTab = tab;
  
  // Update active tab
  document.querySelectorAll('.work-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Render table
  renderWorkTable(tab);
};

// Render Table
function renderWorkTable(category) {
  const tbody = document.getElementById('work-table-body');
  const data = companyData[category] || [];
  
  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:rgba(255,255,255,0.5); padding:30px;">
          Tidak ada perusahaan tersedia untuk kategori ini.
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = data.map((item, index) => `
    <tr>
      <td>
        <span class="employer-name">${item.employer}</span>
        <span class="employer-owner">Owner: ${item.owner}</span>
      </td>
      <td>${item.company}</td>
      <td>
        <span class="wage-value">${item.wage.toFixed(1)}</span>
        <span class="wage-unit">MFR / Hour</span>
      </td>
      <td>
        <button class="btn-work" onclick="openWorkPopup(${index}, '${category}')">Work</button>
      </td>
    </tr>
  `).join('');
}

// Update Tab Counts
function updateTabCounts() {
  Object.keys(companyData).forEach(category => {
    const countEl = document.getElementById('count-' + category);
    if (countEl) {
      countEl.textContent = companyData[category].length;
    }
  });
}

// Open Work Popup
window.openWorkPopup = function(index, category) {
  const company = companyData[category][index];
  currentCompany = company;
  
  // Fill popup data
  document.getElementById('popup-company-name').textContent = company.employer;
  document.getElementById('popup-company-full').textContent = company.employer;
  document.getElementById('popup-wage').textContent = company.wage.toFixed(1);
  document.getElementById('popup-skill-name').textContent = company.skill;
  document.getElementById('popup-skill-label').textContent = company.skill;
  document.getElementById('popup-skill-value').textContent = company.skillLevel + '/100';
  document.getElementById('popup-skill-bar').style.width = company.skillLevel + '%';
  
  // Generate new captcha
  generateCaptcha();
  
  // Show popup
  document.getElementById('work-popup-overlay').style.display = 'block';
  document.getElementById('work-popup').style.display = 'block';
};

// Close Work Popup
window.closeWorkPopup = function() {
  document.getElementById('work-popup-overlay').style.display = 'none';
  document.getElementById('work-popup').style.display = 'none';
  document.getElementById('captcha-input').value = '';
  currentCompany = null;
};

// Generate CAPTCHA
function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptcha = captcha;
  document.getElementById('captcha-code').textContent = captcha;
}

// Confirm Work
window.confirmWork = function() {
  const input = document.getElementById('captcha-input').value.toUpperCase();
  
  if (input !== currentCaptcha) {
    alert('CAPTCHA salah! Silakan coba lagi.');
    generateCaptcha();
    document.getElementById('captcha-input').value = '';
    return;
  }
  
  if (!currentCompany) {
    alert('Error: Company tidak valid.');
    return;
  }
  
  // Success - mulai kerja (nanti integrasi dengan Supabase)
  alert(`Berhasil mulai bekerja di ${currentCompany.employer}!\nDurasi: 4 jam\nUpah: ${currentCompany.wage} MFR/Hour`);
  
  closeWorkPopup();
  
  // TODO: Nanti di sini kita akan:
  // 1. Simpan data kerja ke Supabase
  // 2. Kurangi energy player
  // 3. Set timer 4 jam
  // 4. Update UI
};

// Show Work History
window.showWorkHistory = function() {
  alert('Fitur Work History akan segera hadir!');
  // TODO: Nanti redirect ke halaman work-history.html
};

// Auto init saat load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initWorkPage);
} else {
  window.initWorkPage();
}

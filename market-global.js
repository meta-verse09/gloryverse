/* ============================================
   MARKET GLOBAL - Logic
   ============================================ */

// Data Dummy Produk (Nanti diganti dengan data dari Database)
const globalMarketData = {
  food: {
    beer: {
      icon: '🍺',
      name: 'Beer Pint ⭐⭐',
      desc: 'Beer is consumed when you buy it, giving its energy bonus straight away. You can only consume beer once every 6 hours.',
      sold: '292 (91.24 Gold)',
      energy: '8%',
      currency: 'Gold',
      items: [
        { company: 'Coi Kush - Brewery', country: 'Germany', owner: 'Coi Kush', stock: 6, unit: 'Cups', price: 0.22, margin: 41.52 },
        { company: 'Beer mex', country: 'Mexico', owner: 'mmggzz', stock: 70, unit: 'Cups', price: 0.22, margin: 128.76 },
        { company: 'IGM Beer', country: 'Man', owner: 'mmggzz', stock: 89, unit: 'Cups', price: 0.22, margin: 145.86 }
      ]
    },
    coffee: {
      icon: '☕',
      name: 'Coffee ⭐',
      desc: 'When purchased, Coffee is stored in your inventory and then its consumed when you want, however it has a cooldown of 5 minutes.',
      sold: '1234 (224.45 Gold)',
      energy: '5%',
      currency: 'Gold',
      items: [
        { company: 'Lux - Milk and Coffee Shop', country: 'Luxembourg', owner: 'Tinku122', stock: 19, unit: 'Cups', price: 0.23, margin: 358.72 },
        { company: 'Homer - Milk and Coffee Shop', country: 'Saudi Arabia', owner: 'HOMER', stock: 20, unit: 'Cups', price: 0.23, margin: 201.84 }
      ]
    }
    // Tambahkan kategori lain nanti (Dairy, Wine, Meals)
  },
  clothing: {
    shoes: {
      icon: '👞',
      name: 'Nice Shoes ⭐⭐',
      desc: 'Clothes give you energy over a span of 24 hours, the energy is distributed each hour and they last 15 days.',
      sold: '5 (6.66 Gold)',
      energy: '3%',
      currency: 'Gold',
      items: [
        { company: 'VIA BANK or LOCAL MARKET', country: 'Estonia', owner: 'Minecodersam', stock: 9, unit: 'Units', price: 1.50, margin: 40.09 }
      ]
    }
  }
  // Tambahkan kategori lain nanti (Attack, Defence, Books, Vehicles, Other)
};

// State saat ini
let currentMainCat = 'food';
let currentSubCat = 'beer';

// Initialize saat halaman load
window.initMarket = function() {
  renderProductInfo();
  renderTable();
};

// Fungsi Ganti Main Category (Food, Clothing, dll)
window.switchMainCategory = function(cat) {
  currentMainCat = cat;
  
  // Update tombol active
  document.querySelectorAll('.market-main-tab').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Sembunyikan semua sub-tabs
  document.querySelectorAll('.market-sub-tabs').forEach(el => el.style.display = 'none');
  
  // Tampilkan sub-tabs yang sesuai
  const subTabsContainer = document.getElementById('subtabs-' + cat);
  if (subTabsContainer) {
    subTabsContainer.style.display = 'flex';
    // Set sub-category pertama sebagai default jika ada
    const firstBtn = subTabsContainer.querySelector('.market-sub-tab');
    if (firstBtn) {
        // Simulasi klik tombol pertama
        const subCat = firstBtn.getAttribute('onclick').match(/'([^']+)'/g)[1].replace(/'/g, '');
        switchSubCategory(cat, subCat);
    }
  }
};

// Fungsi Ganti Sub Category (Beer, Coffee, dll)
window.switchSubCategory = function(mainCat, subCat) {
  currentMainCat = mainCat;
  currentSubCat = subCat;
  
  // Update tombol active di dalam sub-tabs yang sedang aktif
  const activeContainer = document.getElementById('subtabs-' + mainCat);
  if (activeContainer) {
    activeContainer.querySelectorAll('.market-sub-tab').forEach(btn => btn.classList.remove('active'));
    // Cari tombol yang diklik (sedikit tricky karena event target mungkin berbeda, kita cari berdasarkan onclick)
    const buttons = activeContainer.querySelectorAll('.market-sub-tab');
    for (let btn of buttons) {
        if (btn.getAttribute('onclick').includes(subCat)) {
            btn.classList.add('active');
            break;
        }
    }
  }
  
  renderProductInfo();
  renderTable();
};

// Render Info Produk di atas tabel
function renderProductInfo() {
  const data = globalMarketData[currentMainCat] && globalMarketData[currentMainCat][currentSubCat];
  
  if (data) {
    document.getElementById('product-icon').textContent = data.icon;
    document.getElementById('product-name').textContent = data.name;
    document.getElementById('product-desc').textContent = data.desc;
    document.getElementById('product-sold').textContent = 'Sold 24h: ' + data.sold;
    document.getElementById('product-energy').textContent = 'Energy Bonus: ' + data.energy;
  }
}

// Render Tabel Penjualan
function renderTable() {
  const tbody = document.getElementById('market-table-body');
  const data = globalMarketData[currentMainCat] && globalMarketData[currentMainCat][currentSubCat];
  
  if (!data || !data.items) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">Belum ada data untuk kategori ini.</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.items.map(item => `
    <tr>
      <td>
        <div class="company-info">
          <div class="company-avatar">🏢</div>
          <div>
            <span class="company-name">${item.company}</span>
            <span class="company-country">Country: ${item.country} 🇮🇩</span>
            <span class="company-owner">Owner: ${item.owner}</span>
          </div>
        </div>
      </td>
      <td>
        <span class="stock-value">${item.stock}</span>
        <span class="stock-unit">${item.unit}</span>
      </td>
      <td>
        <span class="price-value">${item.price.toFixed(2)}</span>
        <span class="price-unit">${data.currency} / unit</span>
        <span class="price-margin">Margin: ${item.margin}%</span>
      </td>
      <td>
        <div class="buy-controls">
          <input type="number" class="buy-input" value="1" min="1">
          <button class="btn-buy">🛒</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Jalankan saat load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initMarket);
} else {
  window.initMarket();
}

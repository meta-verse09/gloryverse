/* ============================================
   MARKET LOCAL - Logic
   ============================================ */

// Data Dummy Produk Local Market (Mata uang: Currency)
const localMarketData = {
  food: {
    beer: {
      icon: '🍺',
      name: 'Bir Lokal ⭐⭐',
      desc: 'Bir dikonsumsi saat kamu membelinya, memberikan bonus energi langsung. Kamu hanya bisa minum bir sekali setiap 6 jam.',
      sold: '150 (75.00 Currency)',
      energy: '8%',
      currency: 'Currency',
      items: [
        { company: 'Bintang Brewery', country: 'Indonesia', owner: 'Budi', stock: 50, unit: 'Botol', price: 5000, margin: 25.00 },
        { company: 'Anker Brewery', country: 'Indonesia', owner: 'Siti', stock: 30, unit: 'Botol', price: 4800, margin: 20.50 }
      ]
    },
    coffee: {
      icon: '☕',
      name: 'Kopi Lokal ⭐',
      desc: 'Saat dibeli, kopi disimpan di inventaris dan dikonsumsi kapan saja. Ada cooldown 5 menit.',
      sold: '500 (100.00 Currency)',
      energy: '5%',
      currency: 'Currency',
      items: [
        { company: 'Kapal Api Coffee', country: 'Indonesia', owner: 'Joko', stock: 100, unit: 'Cangkir', price: 2000, margin: 15.00 }
      ]
    }
    // Nanti bisa ditambah Dairy, Wine, Meals
  },
  clothing: {
    shoes: {
      icon: '👞',
      name: 'Sepatu Lokal ⭐',
      desc: 'Sepatu memberikan energi selama 24 jam, didistribusikan per jam dan bertahan 15 hari.',
      sold: '10 (5000 Currency)',
      energy: '3%',
      currency: 'Currency',
      items: [
        { company: 'Komodo Shoes', country: 'Indonesia', owner: 'Agus', stock: 20, unit: 'Pasang', price: 150000, margin: 30.00 }
      ]
    }
  }
  // Nanti bisa ditambah Attack, Defence, Books, Vehicles, Other
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
  const data = localMarketData[currentMainCat] && localMarketData[currentMainCat][currentSubCat];
  
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
  const data = localMarketData[currentMainCat] && localMarketData[currentMainCat][currentSubCat];
  
  if (!data || !data.items) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:rgba(255,255,255,0.5);">Belum ada data untuk kategori ini.</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.items.map(item => `
    <tr>
      <td>
        <div class="company-info">
          <div class="company-avatar"></div>
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
        <span class="price-value">${item.price.toLocaleString('id-ID')}</span>
        <span class="price-unit">${data.currency} / unit</span>
        <span class="price-margin">Margin: ${item.margin}%</span>
      </td>
      <td>
        <div class="buy-controls">
          <input type="number" class="buy-input" value="1" min="1">
          <button class="btn-buy"></button>
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

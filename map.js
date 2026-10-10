
// gloryverse.id - Peta Klik 11 Juta Lahan Jawa
// Taruh file ini di folder repo GitHub lu, misal: /public/map.js

// Pakai H3 dari 【entity-Uber¦canonical_name=Uber】 - 1 hex = 1 lahan
import * as h3 from 'https://cdn.jsdelivr.net/npm/h3-js@4.1.0/+esm';

const map = L.map('map').setView([-6.2, 106.8], 7); // Tengah Jawa

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let claimedLands = {}; // Nanti ini dari Cloudflare D1 lu, sekarang 0 dulu

map.on('click', async function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  // KLIK -> JADI HEX ID (Ini 11 juta lahan nya bray, tanpa bikin 11 juta baris!)
  const hexId = h3.latLngToCell(lat, lng, 9); // Level 10 = sekitar 0.1 hektar / lahan

  // Cek udah diklaim belum (sekarang pasti belum karena masih 0)
  if(claimedLands[hexId]) {
    alert(`Lahan ${hexId} udah punya ${claimedLands[hexId]}`);
    return;
  }

  // Kalau belum, tawarin klaim
  const boundary = h3.cellToBoundary(hexId);
  const polygon = L.polygon(boundary, {color: 'cyan'}).addTo(map);

  const ok = confirm(`Mau klaim lahan ini?\nID: ${hexId}\nLokasi: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);

  if(ok) {
    // SIMPAN 1 BARIS DOANG KE CLOUDFLARE WORKER gv-mi lu yang di foto tadi
    // Ini nanti yang jadi 40/40/20 pas nonton iklan $0.01 Adscend
    await fetch('https://gv-mi.your-worker.workers.dev/claim', {
      method: 'POST',
      body: JSON.stringify({ hexId, lat, lng, owner: 'player_jawa_01' })
    });

    claimedLands[hexId] = 'player_jawa_01';
    polygon.setStyle({color: 'gold'});
    alert('Lahan berhasil diklaim bray!');
  } else {
    map.removeLayer(polygon);
  }
});

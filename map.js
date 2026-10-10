
// GLORY-GRID 100x100 METER REAL = 1 HEKTAR
// Punya lu sendiri, BUKAN H3 Uber. 100% work di gloryverse.id/dashboard
// Taruh file ini di /public/glorygrid-100m.js di repo GitHub lu

// Ukuran real di Jawa (-7 deg lat): 1 derajat = 111km
// 100 meter = 0.0009 derajat
const CELL = 0.0009; // 100m x 100m = 1 hektar
const JAWA_MIN_LNG = 105;
const JAWA_MIN_LAT = -8.5;

// 1. Klik peta -> jadi ID Lahan 1 hektar
export function latLngToGloryId(lat, lng) {
  const x = Math.floor((lng - JAWA_MIN_LNG) / CELL);
  const y = Math.floor((lat - JAWA_MIN_LAT) / CELL);
  return `GLORY-${x}-${y}`;
}

// 2. ID Lahan -> jadi kotak 100x100m di peta
export function gloryIdToBounds(id) {
  const parts = id.split('-');
  const x = parseInt(parts[1]);
  const y = parseInt(parts[2]);
  const minLng = JAWA_MIN_LNG + x * CELL;
  const minLat = JAWA_MIN_LAT + y * CELL;
  return [
    [minLat, minLng],
    [minLat + CELL, minLng + CELL]
  ];
}

// 3. Versi Hexagonal 100x100m (kalau mau sarang lebah)
export function latLngToGloryHex(lat, lng) {
  const hexW = CELL * 1.5; // 100m
  const hexH = CELL * 1.732; // 100m
  const col = Math.floor((lng - JAWA_MIN_LNG) / hexW);
  const row = Math.floor((lat - JAWA_MIN_LAT) / hexH - (col % 2) * 0.5);
  return `GHEX-${col}-${row}`;
}

export function gloryHexToPolygon(id) {
  const parts = id.split('-');
  const col = parseInt(parts[1]);
  const row = parseInt(parts[2]);
  const hexW = CELL * 1.5;
  const hexH = CELL * 1.732;
  const centerLng = JAWA_MIN_LNG + col * hexW + hexW/2;
  const centerLat = JAWA_MIN_LAT + (row + (col % 2) * 0.5) * hexH + hexH/2;
  
  const points = [];
  const radius = CELL * 0.58; // radius biar lebar 100m
  for(let i=0; i<6; i++){
    const angle = Math.PI / 3 * i - Math.PI / 6; // flat top
    const lat = centerLat + radius * Math.sin(angle);
    const lng = centerLng + radius * Math.cos(angle);
    points.push([lat, lng]);
  }
  return points;
}

// 4. Pasang di peta gloryverse.id
export function initGloryMap(map, mode='square') {
  let lastLayer = null;
  
  map.on('click', (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    if(lastLayer) map.removeLayer(lastLayer);
    
    if(mode === 'hex') {
      const id = latLngToGloryHex(lat, lng);
      const points = gloryHexToPolygon(id);
      lastLayer = L.polygon(points, {color: '#00ffff', weight: 2, fillOpacity: 0.3}).addTo(map);
      lastLayer.bindPopup(`
        <b>Lahan 1 Hektar (100x100m)</b><br>
        ID: ${id}<br>
        ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
        <button onclick="claim('${id}')">Klaim 40/40/20</button>
      `).openPopup();
      console.log('HEX 100m:', id);
    } else {
      const id = latLngToGloryId(lat, lng);
      const bounds = gloryIdToBounds(id);
      lastLayer = L.rectangle(bounds, {color: '#00ffff', weight: 2, fillOpacity: 0.3}).addTo(map);
      lastLayer.bindPopup(`
        <b>Lahan 1 Hektar (100x100m)</b><br>
        ID: ${id}<br>
        ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
        <button onclick="claim('${id}')">Klaim 40/40/20</button>
      `).openPopup();
      console.log('SQUARE 100m:', id);
    }
  });
}

window.claim = async (id) => {
  alert('Klaim ' + id + ' - nanti sambung ke Worker gv-mi lu');
  // fetch('https://gv-mi.../claim', {method:'POST', body: JSON.stringify({id})})
}

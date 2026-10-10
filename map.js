
// GLORY-HEX 100x100 METER - PUNYA LU SENDIRI, BUKAN UBER
// 1 hex = 100m x 100m = 1 hektar real di Jawa

const HEX_SIZE = 0.0005; // 100m di equator Jawa (-6 deg)
const JAWA = { minLat: -8.2, minLng: 105 };

// Klik peta -> jadi ID Hex 100m
function latLngToGloryHex(lat, lng) {
  // Rumus sarang lebah sederhana
  const x = (lng - JAWA.minLng) / (HEX_SIZE * 1.5);
  const y = (lat - JAWA.minLat) / (HEX_SIZE * 1.732);
  
  const col = Math.round(x);
  const row = Math.round(y - (col % 2) * 0.5);
  
  return `GLORY-HEX-${col}-${row}`; // Contoh: GLORY-HEX-1234-5678
}

// ID Hex -> jadi segi 6 di peta (100x100m)
function gloryHexToPolygon(id) {
  const [_, col, row] = id.split('-').slice(2).map(Number);
  const centerLng = JAWA.minLng + col * HEX_SIZE * 1.5;
  const centerLat = JAWA.minLat + (row + (col % 2) * 0.5) * HEX_SIZE * 1.732;
  
  const points = [];
  for(let i=0; i<6; i++){
    const angle = Math.PI / 3 * i;
    points.push([
      centerLat + HEX_SIZE * Math.sin(angle),
      centerLng + HEX_SIZE * Math.cos(angle)
    ]);
  }
  return points; // 6 titik = 1 hex 100x100m
}

// Pasang di map:
map.on('click', e => {
  const id = latLngToGloryHex(e.latlng.lat, e.latlng.lng);
  const hexPoints = gloryHexToPolygon(id);
  L.polygon(hexPoints, {color: 'cyan'}).addTo(map);
  console.log("Klaim lahan 1 hektar:", id);
});

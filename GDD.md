# 📜 GLORYVERSE — GAME DESIGN DOCUMENT (GDD)

> **"Enter the arena. Become a legend."**
> 🌐 `gloryverse.id` · **Edisi Launch:** 17 Agustus 2026

---

## 🧭 Daftar Isi
1. [Visi & Identitas](#1️⃣-visi--identitas)
2. [Akun & Progression](#2️⃣-akun--progression)
3. [Ekonomi](#3️⃣-ekonomi)
4. [Militer & Arena](#4️⃣-militer--arena)
5. [Organisasi & War Negara](#5️⃣-organisasi--war-negara)
6. [Pertahanan](#6️⃣-pertahanan)
7. [Sosial & Retensi](#7️⃣-sosial--retensi)
8. [Monetisasi](#8️⃣-monetisasi)
9. [UI/UX](#9️⃣-uiux)
10. [Teknikal](#🔟-teknikal)
11. [Log Keputusan](#📋-log-keputusan-d-xx)
12. [Status Implementasi](#📊-status-implementasi)

---

## 1️⃣ Visi & Identitas
- Game web **strategi-ekonomi berjiwa e-sports**: ekonomi membangun, arena & war membuktikan, rank memamerkan.
- Terinspirasi *MyProfitLand* namun **beridentitas sendiri**: war negara, MV (vehicle militer), push rank, dan signature moment **"GLORY!"**.
- **Ringan & cepat** (mobile-browser friendly), tanpa aset berat. *(D-04)*
- **Platform:** Netlify (statis) + Supabase (Postgres + Auth + RLS) + domain **gloryverse.id**.

## 2️⃣ Akun & Progression
- Register/login via **Supabase Auth**; **username permanen**.
- **Profile + wallet otomatis tercipta** saat daftar (`init_player` / trigger).
- Pangkat: **Kadet → … → Kapten → … → Jenderal** (push rank).
- **Loadout gating:** Kapten = Heavy Tank · Jenderal = Bomber Jet.

## 3️⃣ Ekonomi
- **Mata uang:** Koin lokal (utama) · Gold (premium) · Euro (fund / internasional).
- **Kerja:** 3 shift/hari · +15 koin/shift · −25 energi/shift · **cooldown 4 jam/shift**, divalidasi server. *(D-23, D-69)*
- **Energi:** cap 100 · reset harian · **regen +1%/10 menit** + offline regen. *(D-74)*
- **Market:** item & consumables.
- **Company:** produksi & upah.
- **Fund:** investasi + dividen euro.
- **Transactions:** semua arus uang tercatat.

## 4️⃣ Militer & Arena
- **MV:** Heavy Tank (hp140/dmg12) · Bomber Jet (hp80/dmg18).
- **Arena MV:** wave 1v1; kemenangan = **momen "GLORY!"** (flash emas + confetti + fanfare + teriakan). *(D-67)*
- **REV / KS:** killstreak = **+10% damage/KS** (cap 10); mati = KS reset + bintang copot. *(D-68)*

## 5️⃣ Organisasi & War Negara
- **Org:** role & specialization.
- **War negara:** durasi **24 jam** · attacker maksimal **2×/hari** · **defense terbuka** (gang-bang diperbolehkan). *(D-71)*
- **Consumables war:** hit 5 menit · energi · kopi/moka/milk · War Shield 350k/48 jam. *(D-70)*

## 6️⃣ Pertahanan
- **Bunker:** fortifikasi region **level 0–3** · reduksi damage **20/35/50%** · biaya **100/250/500** koin. *(D-72)*

## 7️⃣ Sosial & Retensi
- **News / Worldwide Shouts:** posting bayar **2 Gold** (anti-spam). *(D-73)*
- **Rankings:** Top Warrior (KS) · Top Org (damage) · Top Sultan (koin).
- **Missions:** tujuan harian + reward (loop retensi).
- **Energy regen** = hook balik.

## 8️⃣ Monetisasi
- **Offerwall** (AdGem, dll) = **gold faucet**.
- **Gold sink:** shout, bunker, item premium.
- Payout via **PayPal** · kredit via **postback server** (anti-fraud).
- *(Offerwall: publisher terdaftar; integrasi ditunda.)*

## 9️⃣ UI/UX
- Landing **3 kolom**: Menu (kiri) · **banner super-wide swing 3D kiri-kanan** (rotateY, bukan street-view) di tengah · Status (kanan).
- **Emblem emas** bergoyang + tema **dark + gold**.

## 🔟 Teknikal
- **10 tabel:** `profiles, wallets, items, companies, funds, transactions, wars, war_hits, organizations, memberships`.
- **RPC:** `do_work`, `init_player` · **RLS** aktif (anti-cheat server-side).
- **16 layar UI** siap colok data asli.
- **Struktur repo/folder:**
```
gloryverse-web/
  ├─ index.html  (redirect → login)
  ├─ login.html  home.html  game.html  market.html  company.html
  ├─ finance.html  transactions.html  hangar.html  war.html  warrior.html
  ├─ org.html  war_org.html  bunker.html  rank.html  missions.html  news.html
  ├─ config.js  _redirects  emblem.png  banner.jpg  GDD.md
```

## 📋 Log Keputusan (D-xx)
| No | Keputusan |
|---|---|
| D-04 | Ringan & cepat (mobile-friendly) |
| D-23 | Kerja 3 shift/hari · +15 koin · −25 energi |
| D-67 | Momen "GLORY!" saat menang arena |
| D-68 | REV/KS: +10% damage/KS (cap 10), mati = reset + bintang copot |
| D-69 | Cooldown 4 jam antar shift (server-side) |
| D-70 | Consumables war: hit 5m, kopi/moka/milk, WS 350k/48j |
| D-71 | War 24 jam · 2 attack/hari · defense terbuka |
| D-72 | Bunker level 0–3 · reduksi 20/35/50% · biaya 100/250/500 |
| D-73 | Shout bayar 2 Gold (anti-spam) |
| D-74 | Energi regen +1%/10 mnt + offline regen |

## 📊 Status Implementasi (per launching)
| Bagian | Status |
|---|---|
| Auth + Home + Work | ✅ ONLINE (data asli) |
| 13 layar lain | 🟡 mock/demo → siap di-colok |
| Offerwall | ⏳ terdaftar, integrasi ditunda |
| HTTPS gloryverse.id | ⏳ terbit otomatis |

---

---
## 📎 ADENDUM A-01 (24 Agu 2026) — Sesi "Room Dunia"
> Poin di bawah resmi menjadi bagian GDD. Bila bertentangan dengan pasal lama, adendum menang.

### A. Revisi Fakta
- A-1 Hosting: **Cloudflare Pages + Workers** (bukan Netlify).
- A-2 RPC kerja lapangan: `work_once(uid, coin, en)` — samakan penamaan dengan `do_work`.
- A-3 Tabel ke-11: `mv_rounds(id, uid, nama, spot, jarak_km, skor, mode, created_at)`.
- A-4 Layar ONLINE data asli: forum, missions, news, mapverse.
- A-5 **AdSense** = pilar monetisasi (berdampingan dengan offerwall).

### B. Pasal Baru
- B-1 **MAPVERSE — Arena Dunia**: panorama layar penuh; pin atlas (Leaflet+OSM); skor = 5000×(1−d/20000)²; koin = skor/100; 5 ronde/sesi; Bisikan Burung Hantu (Llama, 3/ronde); Papan Juara Top Explorer. Roadmap: biaya ⚡10/ronde.
- B-2 **Sumber foto berjenjang**: 60% Pustaka Benih (KV `mv-store`, panen Mapillary, thumb 1024) → Wikimedia (casual) → Mapillary live → AI Nusantara (darurat saja). Filosofi: **meta segar** untuk pro.
- B-3 **19 pangkat** Unrank→Panglima Glory via **Damage Last Hit** (0→5.000.000); loadout gating tetap.
- B-4 **Referral 1 tingkat**: pajak 10% aktivitas / 5% top-up / 3% turnamen, **ditanggung kas** (opsi A); anti-abuse ≥5 ronde + email; gelar Perekrut.
- B-5 **Misi Sosial**: bonus follow akun resmi; komplit +200 & gelar Duta GloryVerse.
- B-6 **Turnamen**: Piala Mingguan (agregat mv_rounds) & Piala Region.
- B-7 **Mabar** (roadmap): kamar 4 digit, spot sama, timer 60 dtk, realtime.
- B-8 **War v2 UI**: atas eDominacy (bendera, bar tarik-ulur, kartu unit, banner = panorama MapVerse) × bawah MyProfitLand (roster, war fund, buff Nusantara).
- B-9 **Kamus Meta**: halaman edukasi meta untuk komunitas.

### C. Log Keputusan
| D-75 | MapVerse = arena foto nyata, skor berbasis jarak |
| D-76 | Pustaka Benih KV = sumber utama arena pro |
| D-77 | Wikimedia = arena casual |
| D-78 | AI Nusantara = mode terpisah / darurat |
| D-79 | Referral 1 tingkat, pajak ditanggung kas |
| D-80 | Follow sosmed berbonus |
| D-81 | Piala Mingguan & Piala Region |
| D-82 | Mabar realtime |
| D-83 | AdSense pilar monetisasi |
| D-84 | War v2 fusion eDominacy × MyProfitLand |
| D-85 | 19 pangkat Damage Last Hit |

---
### A. Revisi Konsep
- Panorama 360° = VISUAL SIGNATURE SAJA (tetap ber-swing, tanpa interaksi klik yang kompleks).
- Aktivitas ekonomi (Kebun, Kerja, Company) = halaman terpisah dengan tombol di bawah panorama.
- 10 region = 10 gambar panorama berbeda sesuai ciri khas daerah (dikurasi manual oleh komandan).
- Company tier 1 = berbeda per region sesuai sumber daya (A-05).

### B. Pasal Baru: Transportasi Umum
- Setiap perpindahan antar region = **jarak km × kecepatan konstan**.
- Rumus dasar: kecepatan bus umum = 60 km/jam, kereta = 100 km/jam, pesawat = 600 km/jam.
- Contoh: Solok ↔ Jakarta (Betawi) = 900 km → bus 15 jam, kereta 9 jam, pesawat 1,5 jam.
- Selama perjalanan = **timer real-time** (player bisa main MapVerse/kerja sambil menunggu).
- Bisa "batal perjalanan" dengan refund 50%.

### C. Urutan Fondasi
- Pondasi #5: Transportasi Umum (buka akses antar region).
- Pondasi #6: Company Kendaraan (perusahaan angkutan milik player).
- Pondasi #7: Company tier 2–3 (pabrik lanjutan).

### D. Log Keputusan
| D-98 | Panorama visual-only, aktivitas via tombol di bawah |
| D-99 | 10 panorama unik per region (ciri khas daerah) |
| D-100 | Company tier 1 berbeda per region |
| D-101 | Transportasi umum mendahului company kendaraan |
| D-102 | Timer perjalanan = real-time (selaras dunia nyata) |

## 📎 ADENDUM A-02 (24 Agu 2026) — Dasbor Admin & Player
### A. Pasal Baru
- C-1 **Dasbor Player "Markas"**: profil terpadu — identitas & emblem, pangkat + progress bar, statistik (KS, skor MapVerse, akurasi), dompet & transaksi, referral & downline, gelar/medali, status misi sosial.
- C-2 **Dasbor Admin "Ruang Kendali"**: warga (cari/mute/BAN/moderator), ekonomi (koin beredar, koreksi ter-log), moderasi (antrian laporan), siaran News, analitik (DAU, ronde/hari), kontrol turnamen.
- C-3 **Keamanan**: kolom `role` di profiles; RLS admin memeriksa `role='admin'` server-side; tabel `admin_logs` untuk audit setiap tindakan admin.
### B. Log Keputusan
| D-86 | Dasbor player = Markas (penyatuan data yang sudah ada) |
| D-87 | Dasbor admin = Ruang Kendali, RLS role + audit log |

---

---
## 📎 ADENDUM A-03 (24 Agu 2026) — Visi 10 Tahun & Profil Warga
### A. Visi Strategis
- V-1 Target usia: 10 tahun+. Keberlanjutan menang atas hype.
- V-2 Warga sasaran: pria 35–55 ("bapak-bapak") — hiburan, waktu terbatas, daya beli ada, haus status & sosialisasi.
- V-3 Monetisasi rupiah (top-up/offerwall) mulai bulan 6 (± Feb 2027). Bulan 1–5 = fase royal gratis.
- V-4 Posisi GloryVerse: "warung kopi digital yang ada mainannya" — tempat nongkrong harian, bukan game viral sebulan.
### B. Konsekuensi Desain
- B-10 Async & singkat: semua aktivitas inti selesai 5–10 menit per kunjungan.
- B-11 Mode teks besar / kontras tinggi (aksesibilitas mata).
- B-12 Status > kecepatan: pangkat, gelar, medali, hall of fame = mesin retensi utama.
- B-13 Tombol bagikan skor & referral dioptimalkan untuk grup WhatsApp.
- B-14 Badge "Warga Pendiri" permanen untuk 1.000 pendaftar pertama.
- B-15 Jadwal ramah bapak: war akhir pekan, turnamen malam hari.
- B-16 HUT negara tiap 17 Agustus = event tahunan (lahir 17-08-2026).
### C. Log Keputusan
| D-88 | Usia target 10 tahun+; keberlanjutan > hype |
| D-89 | Demografi: bapak-bapak 35–55 |
| D-90 | Monetisasi rupiah mulai bulan 6 |
| D-91 | Badge Warga Pendiri (1.000 pertama) |
| D-92 | Mode teks besar + share WA = fitur dasar |
- Katalog 30 motif terkunci (9 keluarga); merah = Hiu Pusek, Tali Sirah,
  dan 1 hiu merah penuh (nama terluka → riset lapau).
- Arah seni: blok cetak kayu hitam-putih + aksen merah; aset SVG ringan.
| D-110 | Katalog motif & arah seni terkunci |

---

## 📎 ADENDUM A-04 (25 Agu 2026) — Rumus Damage
Formula: `Final = (Energi*Senjata*Rank*KS/100)*Bunker*Baju`
Contoh 3648: `(94.48*3000*1.1*1.3/100)*0.9 = 3648`. Baju 9/10 = 0.9, kalau 10/10 jadi 4053.

---
## 📎 ADENDUM A-05 (26 Agu 2026) — Halaman Detail Region
### A. Pasal Baru
- Setiap region punya halaman detail (region.html) dengan 8 tab:
  👥 Warga Lokal · 🌾 Sumber Daya (replenish tgl 1 & 15) · ♻️ Bank Sampah
  (−25%⚡ → +) ·  Cabang · 💼 Lapangan Kerja · 🛒 Jual-Beli ·
  🚌 Transportasi · 📍 Region Terdekat (jarak km nyata) · 🕐 Pergerakan.
- Sumber daya per region:
  Solok 👑 Padi/Kopi/Sayur/Ikan Danau/Kayu/Batu • Betawi Sayur/Ikan/Rempah/Pasir •
  Priangan Teh/Kopi/Sayur/Tembakau • Banten Pasir/Batu/Ikan/Gula •
  Mataram Padi/Jati/Tembakau/Kapas • Arek Kopi/Tembakau/Gula/Garam/Ikan •
  Bali Kelapa/Ikan/Rempah/Kopi • Medan Sawit/Tembakau/Karet/Kopi •
  Borneo Kayu/Batu Bara/Sawit/Besi • Makassar Kakao/Ikan/Padi/Mete.
### B. Log Keputusan
| D-92 | Halaman region detail 8 tab, rasa Indonesia |
| D-93 | Bank Sampah = lokalisasi Recyclable Waste |
| D-94 | Jarak region dari koordinat kota nyata |

---
## 📎 ADENDUM A-06 (28 Agu 2026) — Dunia Hidup
- Panorama 360° = PANGGUNG GAME (bukan hiasan).
- Aktivitas = hotspot di dalam panorama, sesuai sumber daya region (A-05).
- Klik hotspot → overlay aktivitas di atas panorama.
- Warga online tampil sebagai avatar + nama di atasnya, di dalam dunia.
- Mabar = berbagi panggung yang sama, skor live.
| D-95 | Panorama = panggung game |
| D-96 | Hotspot aktivitas per region |
| D-97 | Avatar + nama warga di dalam dunia |

---
## 📎 ADENDUM A-07 (28 Agu 2026) — Interaksi & Transportasi
- Panorama tetap swing; tombol aksi di BAWAH gambar.
- 10 gambar region baru sesuai ciri khas; sistem fallback otomatis sampai gambar di-upload.
- Kebun Sayur, RAW, company tier-1 = sesuai region.
- Transportasi umum DIDAHULUKAN sebelum company kendaraan.
- Waktu & biaya proporsional jarak (haversine):
  🚌 Bus: 0,5 dtk/km • −1⚡/100 km · 🚆 Train: 0,25 dtk/km • −1⚡/200 km.
- ✈️ Pesawat menyusul bersama company kendaraan.
| D-98 | Tombol aksi di bawah panorama |
| D-99 | Transportasi umum sebelum company kendaraan |
| D-100 | Waktu/biaya perjalanan proporsional jarak |

---
## 📎 ADENDUM A-08 (28 Agu 2026) — Arena War Negara
- Format MyProfitLand, tampilan eDominacy; gambar tengah STATIS + Ken Burns (bukan swing).
- Countdown 24 jam di tengah arena.
- Damage Breakdown transparan (rumus A-04, server-side).
- 👑 Ibukota (Solok) KEBAL serangan.
- Pemenang menguasai region (region_owner) + loot 50🪙/peserta.
| D-101 | War 24 jam, timer tengah arena |
| D-102 | Ibukota kebal |
| D-103 | Gambar perang statis + Ken Burns |

---
## 📎 ADENDUM A-09 (29 Agu 2026) — Meja Koa Ceki
### A. Aturan Inti (v0.2 final)
- 4 pemain/2 tim berseberangan • 180 kartu (30 motif × 6) • deal 2-2-2-2 ×3.
- Giliran: ambil tengah/klaim buangan → susun → buang terbuka di depan area.
- Set terbuka di meja: KOA(2) KAKI(3) MATA(3).
- Klaim berebut = siapa cepat dia dapat (jendela reaksi realtime).
- Menang = 3 set + deklarasi CEKI (titik hijau di atas nama).
### B. Produk
- Kategori MEJA BUDAYA ibukota Solok; latar lapau/Rumah Gadang.
- Fase: 1) latihan vs bot → 2) meja 4 realtime → 3) Piala Koa Ceki Solok.
- Semua room Mabar wajib menampilkan nama player.
### C. Log Keputusan
| D-104 | Koa Ceki = meja budaya pertama |
| D-105 | Race-claim "siapa cepat dia dapat" |
| D-106 | Deklarasi CEKI = titik hijau + nama |
- Tangan individu tertutup (juga dari partner); bentrok motif = fitur sosial.
- Tim menang bila salah satu anggota CEKI.
- Layar REVEAL akhir ronde + sorot bentrok + tombol share WA.
| D-107 | Bentrok partner = momen cerita + share WA |
- Katalog 30 motif terkunci (9 keluarga); merah = Hiu Pusek, Tali Sirah,
  dan 1 hiu merah penuh (nama terluka → riset lapau).
- Arah seni: blok cetak kayu hitam-putih + aksen merah; aset SVG ringan.
| D-110 | Katalog motif & arah seni terkunci |


*© 2026 GloryVerse — Muhammad Gazali. Dokumen ini sumber kebenaran desain; semua fitur baru wajib selaras dengannya.*

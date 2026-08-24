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

## 📎 ADENDUM A-02 (24 Agu 2026) — Dasbor Admin & Player
### A. Pasal Baru
- C-1 **Dasbor Player "Markas"**: profil terpadu — identitas & emblem, pangkat + progress bar, statistik (KS, skor MapVerse, akurasi), dompet & transaksi, referral & downline, gelar/medali, status misi sosial.
- C-2 **Dasbor Admin "Ruang Kendali"**: warga (cari/mute/BAN/moderator), ekonomi (koin beredar, koreksi ter-log), moderasi (antrian laporan), siaran News, analitik (DAU, ronde/hari), kontrol turnamen.
- C-3 **Keamanan**: kolom `role` di profiles; RLS admin memeriksa `role='admin'` server-side; tabel `admin_logs` untuk audit setiap tindakan admin.
### B. Log Keputusan
| D-86 | Dasbor player = Markas (penyatuan data yang sudah ada) |
| D-87 | Dasbor admin = Ruang Kendali, RLS role + audit log |

*© 2026 GloryVerse — Muhammad Gazali. Dokumen ini sumber kebenaran desain; semua fitur baru wajib selaras dengannya.*

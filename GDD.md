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
*© 2026 GloryVerse — Muhammad Gazali. Dokumen ini sumber kebenaran desain; semua fitur baru wajib selaras dengannya.*

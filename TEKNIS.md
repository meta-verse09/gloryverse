# TEKNIS — GLORYVERSE
## Stack
- Hosting: Cloudflare Pages, repo GitHub meta-verse09/gloryverse → gloryverse.id
- Backend: Supabase (auth, profiles, mv_rounds)
- Worker: gv-ai.m-gazali1975.workers.dev (AI + Mapillary + Wiki + benih)
- KV: namespace mv-store, binding variabel MV di gv-ai (key: seeds)

## Endpoint worker gv-ai (POST JSON)
- {prompt, max_tokens} → teks AI (chain TEXT_MODELS)
- {prompt, image_url, max_tokens} → visi AI
- {mly_rand:1} → spot acak {url,name,lat,lng,src/fb}
- {mly:id} → detail gambar Mapillary
- {harvest:1} → panen benih ke KV, balas {ok:N}
- GET → cek kesehatan

## Rahasia & lokasi
- Token Mapillary: baris 1 worker (MLY_DIRECT)
- Kunci Supabase: config.js
- AI binding: env.AI di gv-ai

## Tabel & RPC
- profiles(id, username, coin, energy, ...)
- mv_rounds(uid, nama, spot, jarak_km, skor, mode, created_at)
- RPC work_once(uid, coin, en)

## Halaman
index/home, game, work_vege, missions, news, forum, market, rank, war, war_org, warrior, bunker, hangar, company, finance, org, transactions, login, mapverse, privacy, terms

## Perintah console berguna
- Panen benih: fetch('https://gv-ai.m-gazali1975.workers.dev/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({harvest:1})}).then(r=>r.json()).then(console.log)

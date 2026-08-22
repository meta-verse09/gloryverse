/* ===== ADSENSE VERIFIKASI ===== */
(function(){
 if(!document.querySelector('script[src*="adsbygoogle"]')){
  var s=document.createElement('script');
  s.async=true;
  s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3008754794200206';
  s.crossOrigin='anonymous';
  document.head.appendChild(s);
 }
})();
/* layout.js v2 — mesin template + logo otomatis */
const $=id=>document.getElementById(id);
const D=document.body.dataset;

/* Logo kiri-atas di SEMUA halaman */
document.head.insertAdjacentHTML('beforeend',
 '<style>.logo img{height:34px;border-radius:8px;background:#fff;padding:2px 8px;box-shadow:0 2px 8px #0008}</style>');
const lg=document.querySelector('.logo');
if(lg) lg.innerHTML='<img src="logo.png" alt="GloryVerse">';

/* Sidebar otomatis */
$('left').innerHTML=`<div class="box"><b id="pName">Player</b>
 <div class="bar" style="margin-top:6px"><i id="pEn" style="width:100%"></i></div>
 <small style="color:var(--mut)">⚡ Energi</small></div>
 <div class="box menu"><a href="home.html">🏠 Home</a><a href="game.html">⚒️ Work</a>
 <a href="market.html">🛒 Market</a><a href="war.html">⚔️ War</a>
 <a href="bunker.html">🛡️ Bunker</a><a href="rank.html">🏆 Rankings</a>
 <a href="missions.html">📋 Missions</a><a href="news.html">📰 News</a><a href="forum.html">🛋️ Forum</a><a href="mapverse.html">🗺️ MapVerse</a></div>`;
$('right').innerHTML=`<div class="box"><h3>🟢 Teman Online</h3><div id="friends"></div></div>
 <div class="box"><h3>📢 Shout Dunia</h3><div id="shouts"></div>
 <input id="shMsg" placeholder="teriak sesuatu..."><button class="btn" id="shBtn">Kirim</button></div>`;
if($('locName'))$('locName').innerText=D.title||'';

/* Panorama 360 */
const pano=$('pano'); pano.style.backgroundImage=`url('${D.img}')`;
const img=new Image(); img.src=D.img;
let tileW=1600,pos=0,drag=null,auto=true,t=0,friends=[];
img.onload=()=>{tileW=pano.clientHeight*(img.width/img.height);paint()};
const mod=(n,m)=>((n%m)+m)%m, hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)};
pano.onpointerdown=e=>{drag={x:e.clientX,pos};auto=false;pano.setPointerCapture(e.pointerId)};
pano.onpointermove=e=>{if(drag){pos=drag.pos+(e.clientX-drag.x);paint()}};
['pointerup','pointercancel'].forEach(v=>pano.addEventListener(v,()=>{drag=null;setTimeout(()=>auto=true,2500)}));
function paint(){pano.style.backgroundPositionX=pos+'px';
 $('markers').innerHTML=friends.map(f=>`<span class="mk" style="left:${mod(f.x*tileW+pos,tileW)}px">🟢 ${f.name}</span>`).join('')}
(function loop(){if(auto){t+=.004;pos=Math.sin(t)*tileW*.3;paint()}requestAnimationFrame(loop)})();

/* Jam + siang/malam real-time */
function phase(h){
 if(h>=5&&h<8)return{i:'🌅',f:'sepia(.35) saturate(1.2) brightness(.95)',c:'#ff9a3c44'};
 if(h>=8&&h<16)return{i:'☀️',f:'none',c:'transparent'};
 if(h>=16&&h<19)return{i:'🌇',f:'sepia(.45) hue-rotate(-25deg) brightness(.88)',c:'#ff6a0055'};
 return{i:'🌙',f:'brightness(.42) saturate(.65) hue-rotate(10deg)',c:'#0a1a3c99'}}
setInterval(()=>{const n=new Date(),p=phase(n.getHours());
 $('clock').innerText=p.i+' '+[n.getHours(),n.getMinutes(),n.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':');
 pano.style.filter=p.f; $('sky').style.background=p.c},1000);

/* Cuaca region */
(async()=>{try{
 const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${D.lat||-6.2}&longitude=${D.lon||106.8}&current=weather_code`);
 const c=(await r.json()).current.weather_code; let w='☀️ Cerah',fx='';
 if([45,48].includes(c)){w='🌫️ Kabut';fx='fog'}
 else if([51,53,55,61,63,65,80,81,82].includes(c)){w='🌧️ Hujan';fx='rain'}
 else if([71,73,75,85,86].includes(c)){w='❄️ Salju';fx='snow'}
 else if([2,3].includes(c)){w='☁️ Mendung';fx='cloud'}
 $('wthr').innerText=w; $('fx').className=fx;
}catch(e){}})();

/* Presence + shouts */
(async()=>{try{
 const {data:{session}}=await db.auth.getSession();
 if(session){const uid=session.user.id,now=()=>new Date().toISOString();
  await db.from('profiles').update({last_seen:now()}).eq('id',uid);
  setInterval(()=>db.from('profiles').update({last_seen:now()}).eq('id',uid),60000);
  const five=new Date(Date.now()-300000).toISOString();
  const {data}=await db.from('profiles').select('username').neq('id',uid).gte('last_seen',five);
  friends=(data||[]).map(p=>({name:p.username,x:(hash(p.username)%1000)/1000}));
  $('friends').innerHTML=friends.length?friends.map(f=>`<div class="fr">🟢 ${f.name}</div>`).join(''):'<small style="color:var(--mut)">Belum ada yang online.</small>';
  const {data:p}=await db.from('profiles').select('username').eq('id',uid).single();
  $('pName').innerText=p?.username||'Player'; paint();}
 const load=async()=>{const {data}=await db.from('shouts').select('*').order('id',{ascending:false}).limit(15);
  $('shouts').innerHTML=(data||[]).map(s=>`<div class="sh"><b>${s.username}</b> ${s.msg}<small>${ago(s.created_at)}</small></div>`).join('')};
 load(); setInterval(load,15000);
 $('shBtn').onclick=async()=>{const m=$('shMsg').value.trim();if(!m)return;
  const {data:{session}}=await db.auth.getSession(); if(!session)return alert('login dulu');
  const {data:p}=await db.from('profiles').select('username').eq('id',session.user.id).single();
  await db.from('shouts').insert({user_id:session.user.id,username:p.username,msg:m});
  $('shMsg').value=''; load()};
}catch(e){console.log(e)}})();
function ago(t){const s=(Date.now()-new Date(t))/1000;if(s<60)return'baru saja';if(s<3600)return Math.floor(s/60)+' mnt lalu';if(s<86400)return Math.floor(s/3600)+' jam lalu';return Math.floor(s/86400)+' hari lalu'}

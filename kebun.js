/* kebun.js — minigame panen DI DALAM dunia */
(function(){
 const CD=4*3600000;
 const cdLeft=()=>{const t=+localStorage.getItem('gv_harv')||0;const d=Date.now()-t;return d>=CD?0:CD-d};
 const fmt=ms=>Math.floor(ms/3600000)+'j '+Math.floor(ms%3600000/60000)+'m';
 window.onHS=function(h){
  if(h.act!=='kebun'){toast(h.lb+': segera hadir!');return}
  const hl=cdLeft();
  openOvl(`<h3 style="color:var(--gold)">🌱 Kebun Sayur — Panen 30 detik</h3>
   <p class="dim" style="font-size:12px">1 tomat = 1 🪙 • cooldown 4 jam</p>
   <div id="kgame" style="position:relative;height:300px;width:min(560px,80vw);border-radius:12px;overflow:hidden;border:1px solid var(--gold);background:url('kb_bg.jpeg') center/cover">
    <div style="position:absolute;top:6px;left:8px;right:8px;display:flex;justify-content:space-between;font-weight:900;color:#fff;text-shadow:0 2px 4px #000;z-index:5">
     <span>🧺 <b id="kscr">0</b></span><span>⏱ <b id="ktmr">30</b></span></div>
    <div id="kov" style="position:absolute;inset:0;background:#000a;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#fff;z-index:9">
     <b id="kovT">${hl?'⏳ BERIKUTNYA DALAM '+fmt(hl):'SIAP PANEN?'}</b>
     <button class="btn" id="kovB" ${hl?'disabled':''}>${hl?'Terkunci':'MULAI'}</button>
    </div>
   </div>`);
  if(hl)return;
  const SP=[[20,52],[33,47],[44,58],[27,68],[40,74],[18,70],[47,45]];
  let sk=0,si=30,run=false,iv=null;
  const G=document.getElementById('kgame');
  const spawn=i=>{const t=document.createElement('img');t.src='kb_tomat.png';
   t.style.cssText='position:absolute;width:64px;cursor:pointer;left:'+SP[i%SP.length][0]+'%;top:'+SP[i%SP.length][1]+'%';
   t.onclick=()=>{if(!run)return;sk++;document.getElementById('kscr').innerText=sk;t.style.display='none';
    setTimeout(()=>{const s2=SP[Math.floor(Math.random()*SP.length)];t.style.left=s2[0]+'%';t.style.top=s2[1]+'%';t.style.display='block'},1500)};
   G.appendChild(t)};
  for(let i=0;i<5;i++)spawn(i);
  document.getElementById('kovB').onclick=()=>{document.getElementById('kov').style.display='none';run=true;sk=0;si=30;
   document.getElementById('kscr').innerText=0;
   iv=setInterval(()=>{si--;document.getElementById('ktmr').innerText=si;if(si<=0)end()},1000)};
  function end(){run=false;clearInterval(iv);document.getElementById('kov').style.display='flex';
   document.getElementById('kovT').innerText='⏰ PANEN: '+sk;
   const b=document.getElementById('kovB');b.innerText='KLAIM '+sk+' 🪙';b.onclick=klaim}
  async function klaim(){try{
   const {data:{session}}=await db.auth.getSession();if(!session){alert('Login dulu!');return}
   await db.rpc('work_once',{uid:session.user.id,coin:sk,en:0});
   localStorage.setItem('gv_harv',String(Date.now()));
   const b=document.getElementById('kovB');b.innerText='✅ '+sk+' 🪙 MASUK';b.disabled=true;
   const w=await db.from('wallets').select('local_coin').eq('user_id',session.user.id).single();
   const c=document.getElementById('coin');if(c)c.innerText=w.data?.local_coin??0;
  }catch(e){alert('Gagal klaim: '+String(e&&e.message||e))}}
 };
})();

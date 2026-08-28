/* dividen.js — produksi harian perusahaan */
(function(){
 const card=document.createElement('div');card.className='card';
 card.innerHTML='<h3>💵 Dividen Harian</h3><p class="dim">Kebun Sayur 20 • Warung 30 • Kopi 50 • Tambang 80 • Bank 150 (per 24 jam).</p><button class="btn" id="divBtn" style="width:100%">KLAIM DIVIDEN</button>';
 const main=document.querySelector('main');if(main)main.appendChild(card);
 $('divBtn').onclick=async()=>{try{
  const {data:{session}}=await db.auth.getSession();if(!session){alert('Login dulu!');return}
  const r=await db.rpc('claim_dividend',{p_uid:session.user.id});const res=r.data||{};
  if(res.ok){alert('💵 +'+res.total+' 🪙 dividen masuk!');
   const w=await db.from('wallets').select('local_coin').eq('user_id',session.user.id).single();
   const c=document.getElementById('coin');if(c)c.innerText=w.data?.local_coin??0;}
  else alert('Gagal: '+(res.err||'-'));
 }catch(e){alert('Gagal: '+String(e&&e.message||e))}};
})();

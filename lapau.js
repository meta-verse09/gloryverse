/* lapau.js v5 — WASIT KOA CEKI (Robust + Safe Binding) */
(function(){
  'use strict';
  
  // ===== SHIM PHASE =====
  if(typeof window.phase !== 'function' && typeof window.phaseOf === 'function'){
    window.phase = window.phaseOf;
  }
  
  // ===== KATALOG MOTIF =====
  var FAM=['HIU','JARUM','SUDUNG','BENGKOK','TALI','PECAH','BATUNG','SISIR','BABI'];
  var VAR={HIU:['Babak','Kucing','Penci','Bunga','Kasut','Panjang'],JARUM:['Wajik','Besar','Kecil'],
  SUDUNG:['Putih','Hitam','Pinggang'],BENGKOK:['Hitam','Besar','Kecil'],TALI:['Merah','Bulat','Kecil'],
  PECAH:['Manik','Delapan','Halus'],BATUNG:['Manik','Enam','Kecil'],SISIR:['Besar','Kecil','Bendera'],BABI:['Pusat','Besar','Kecil']};
  var RED={'HIU/Penci':1,'HIU/Babak':2,'TALI/Merah':1};
  var MID=[];FAM.forEach(function(f){VAR[f].forEach(function(n){MID.push({f:f,n:n,red:RED[f+'/'+n]||0})})});
  
  // ===== FUNGSI SVG =====
  window.svg = function(m){
    try {
      var M=MID[m],v=VAR[M.f].indexOf(M.n),field=M.red==2?'#8B0000':'#0a0a0a';
      var W='stroke="#f5f0e6" stroke-width="2.5" fill="none"',g='',i,n,cx,cy;
      if(M.f=='HIU'){
        if(v==0){g='<path d="M16 24 h28 M16 32 h28 M16 40 h28 M16 100 h28 M16 108 h28 M16 116 h28" '+W+'/>'}
        if(v==1){g='<path d="M20 28 l10 12 -10 12 M30 28 l-10 12 10 12 M20 100 l10 12 -10 12 M30 100 l-10 12 10 12" '+W+'/>'}
        if(v==2){g='<circle cx="30" cy="34" r="8" '+W+'/><circle cx="30" cy="34" r="4" '+W+'/><circle cx="30" cy="106" r="8" '+W+'/><circle cx="30" cy="106" r="4" '+W+'/>'}
        if(v==3){g='<path d="M22 26 v12 h16 v-12 M22 102 v12 h16 v-12" '+W+'/><path d="M24 30 h12 M24 106 h12" '+W+'/>'}
        if(v==4){g='<rect x="22" y="26" width="16" height="16" '+W+'/><rect x="22" y="98" width="16" height="16" '+W+'/><path d="M26 30 h8 M26 102 h8" '+W+'/>'}
        if(v==5){g='<path d="M20 24 h20 v8 h-20 M20 108 h20 v8 h-20" '+W+'/><path d="M24 28 v4 M36 28 v4 M24 112 v4 M36 112 v4" '+W+'/>'}
      }
      if(M.f=='JARUM'){
        if(v==0){g='<path d="M30 22 l14 18 -14 18 -14 -18 z M30 100 l10 14 -10 14 -10 -14 z" '+W+'/>'}
        if(v==1){g='<path d="M30 26 l10 14 -10 14 -10 -14 z M26 60 l4 6 -4 6 -4 -6 z M30 94 l10 14 -10 14 -10 -14 z" '+W+'/>'}
        if(v==2){g='<path d="M30 30 l8 12 -8 12 -8 -12 z M22 66 l8 12 -8 12 -8 -12 z M30 102 l8 12 -8 12 -8 -12 z" '+W+'/>'}
      }
      if(M.f=='SUDUNG'){
        if(v==0){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="10" '+W+'/><circle cx="30" cy="'+cy+'" r="5" '+W+'/>'}}
        if(v==1){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="9" '+W+'/>'}}
        if(v==2){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="8" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>'}}
      }
      if(M.f=='BENGKOK'){
        if(v==0){g='<path d="M20 22 v96 h20 M40 22 h-8 M20 118 h8" '+W+'/>'}
        if(v==1){g='<path d="M40 22 v96 h-20 M20 22 h8 M40 118 h-8" '+W+'/>'}
        if(v==2){g='<path d="M20 22 v96 h20 M40 22 v56 M20 118 h8" '+W+'/>'}
      }
      if(M.f=='TALI'){
        if(v==0){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="11" '+W+'/><circle cx="30" cy="'+cy+'" r="7" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>'}}
        if(v==1){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="10" '+W+'/><circle cx="30" cy="'+cy+'" r="4" '+W+'/>'}}
        if(v==2){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="9" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>'}}
      }
      if(M.f=='PECAH'){
        if(v==0){g+='<circle cx="22" cy="30" r="6" '+W+'/><circle cx="38" cy="30" r="6" '+W+'/>';g+='<circle cx="22" cy="58" r="6" '+W+'/><circle cx="38" cy="58" r="6" '+W+'/>';g+='<circle cx="22" cy="86" r="6" '+W+'/><circle cx="38" cy="86" r="6" '+W+'/>';g+='<circle cx="30" cy="114" r="6" '+W+'/>'}
        if(v==1){for(i=0;i<8;i++){cx=22+(i%2)*16;cy=26+Math.floor(i/2)*30;g+='<circle cx="'+cx+'" cy="'+cy+'" r="5" '+W+'/>'}}
        if(v==2){for(i=0;i<12;i++){cx=20+(i%3)*10;cy=24+Math.floor(i/3)*24;g+='<circle cx="'+cx+'" cy="'+cy+'" r="4" '+W+'/>'}}
      }
      if(M.f=='BATUNG'){
        if(v==0){for(i=0;i<3;i++){cy=28+i*32;g+='<circle cx="24" cy="'+cy+'" r="6" '+W+'/><circle cx="36" cy="'+cy+'" r="6" '+W+'/>'}}
        if(v==1){for(i=0;i<2;i++){cy=34+i*56;g+='<circle cx="24" cy="'+cy+'" r="7" '+W+'/><circle cx="36" cy="'+cy+'" r="7" '+W+'/>'}}
        if(v==2){for(i=0;i<2;i++){cy=38+i*48;g+='<circle cx="24" cy="'+cy+'" r="8" '+W+'/><circle cx="36" cy="'+cy+'" r="8" '+W+'/>'}}
      }
      if(M.f=='SISIR'){
        if(v==0){for(i=0;i<8;i++){g+='<path d="M18 '+(22+i*14)+' h24" '+W+'/>'}}
        if(v==1){for(i=0;i<6;i++){g+='<path d="M18 '+(28+i*16)+' h24" '+W+'/>'}}
        if(v==2){for(i=0;i<5;i++){g+='<path d="M18 '+(30+i*20)+' h24" '+W+'/>'}}
      }
      if(M.f=='BABI'){
        if(v==0){g+='<circle cx="30" cy="32" r="10" '+W+'/>';g+='<rect x="20" y="56" width="20" height="24" '+W+'/>';g+='<rect x="20" y="84" width="20" height="24" '+W+'/>'}
        if(v==1){g+='<rect x="20" y="28" width="20" height="24" '+W+'/>';g+='<rect x="20" y="58" width="20" height="24" '+W+'/>';g+='<rect x="20" y="88" width="20" height="24" '+W+'/>'}
        if(v==2){g+='<rect x="20" y="34" width="20" height="20" '+W+'/>';g+='<rect x="20" y="62" width="20" height="20" '+W+'/>';g+='<rect x="20" y="90" width="20" height="20" '+W+'/>'}
      }
      var lab='<text x="30" y="137" font-size="10" fill="#151515" text-anchor="middle" font-family="monospace">'+String(m+1).padStart(2,'0')+'</text>';
      return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><rect x="8" y="8" width="44" height="124" fill="'+field+'"/>'+g+lab+'</svg>';
    } catch(e){
      console.error('svg error:', e);
      return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><text x="30" y="75" text-anchor="middle" font-size="10">ERR</text></svg>';
    }
  };
  
  // ===== STATE =====
  var hands=[[],[],[],[]],disc=[[],[],[],[]],pile=[],turn=0,fase='idle',sel=-1,wins=[0,0,0,0],rid=0,last=null,over=false,mkT=null;
  var SEATS=[{n:'Kamu',bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];
  var IS_HOST=true,MY=0,ROOM=null,started=false,seated=false,knockT=null,pollT=null,lastMsgId=0;
  var MYNAME='Kamu',MYSID=Math.random().toString(36).slice(2,8);
  
  // ===== UTILS =====
  function $(id){return document.getElementById(id)}
  function cnt(h){var c=[];for(var i=0;i<30;i++)c[i]=0;h.forEach(function(m){c[m]++});return c}
  function win12(c){var t=0,i;for(i=0;i<30;i++)t+=c[i];if(t!=12)return false;
   for(var p=0;p<30;p++){if(c[p]<2)continue;var tr=[];for(var m=0;m<30;m++){if(c[m]-(m==p?2:0)>=3)tr.push(m)}
    for(var a=0;a<tr.length;a++)for(var b=a+1;b<tr.length;b++)for(var d=b+1;d<tr.length;d++){
     var cc=c.slice();cc[p]-=2;cc[tr[a]]-=3;cc[tr[b]]-=3;cc[tr[d]]-=3;
     var ok=true,s=0;for(i=0;i<30;i++){if(cc[i]<0)ok=false;s+=cc[i]}
     if(ok&&s==1)return true}}
   return false}
  function cokiOf(h){var c=cnt(h);for(var m=0;m<30;m++){c[m]++;var w=win12(c);c[m]--;if(w)return m}return -1}
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
  function stat(t){var el=$('stat');if(el)el.innerText=t}
  function showMakan(v){var el=$('bMakan');if(el)el.style.display=v?'inline-block':'none'}
  
  // ===== NETWORK (REST Polling) =====
  function send(o){
    if(!ROOM||!window.db)return;
    o.sid=MYSID;
    try{db.from('ceki_msg').insert({room:ROOM,kind:(o.ev||o.act)||'m',payload:o})}catch(e){console.warn('send err:',e)}
  }
  function initRoom(code){
    ROOM=code;
    if(pollT)clearInterval(pollT);
    if(window.db){
      db.from('ceki_msg').select('id').eq('room',code).order('id',{ascending:false}).limit(1).then(function(r){
        lastMsgId=(r.data&&r.data[0])?r.data[0].id:0;
      });
      pollT=setInterval(function(){
        if(!ROOM)return;
        db.from('ceki_msg').select('*').eq('room',ROOM).gt('id',lastMsgId).order('id',{ascending:true}).limit(20).then(function(r){
          (r.data||[]).forEach(function(row){lastMsgId=row.id;handle(row.payload)})
        })
      },1500);
    }
  }
  function handle(p){
    if(!p||p.sid==MYSID)return;
    if(IS_HOST){
      if(p.act=='join'){
        var got=-1;
        for(var i=1;i<4;i++){if(SEATS[i].sid==p.sid){got=i;break}}
        if(got<0){for(var i=1;i<4;i++){if(SEATS[i].bot){SEATS[i]={n:p.name,bot:false,taken:true,sid:p.sid};got=i;break}}}
        if(got>=0)sendLobby()
      }
      if(p.act=='cabut'&&started&&turn==p.seat)doCabut(p.seat);
      if(p.act=='makan'&&started&&turn==p.seat)doMakan(p.seat);
      if(p.act=='turun'&&started&&turn==p.seat)doTurun(p.seat,p.card);
      if(p.act=='koa'&&started&&turn==p.seat&&win12(cnt(hands[p.seat])))doKoa(p.seat);
    } else {
      if(p.ev=='lobby'){
        p.seats.forEach(function(s,i){
          if(s&&s.sid==MYSID){MY=i;seated=true;if(knockT){clearInterval(knockT);knockT=null}}
          if(s)SEATS[i]=s
        });
        drawLobby()
      }
      if(p.ev=='state'){
        hands=p.hands;disc=p.disc;pile=Array(p.pile);last=p.last;turn=p.turn;fase=p.fase;wins=p.wins;over=p.over;
        p.names.forEach(function(n,i){SEATS[i].n=n});
        started=true;
        var lobby=$('lobby'),game=$('gameArea');
        if(lobby)lobby.style.display='none';
        if(game)game.style.display='block';
        if(over){
          var ovT=$('ovT'),ovM=$('ovM'),ov=$('ov');
          if(ovT)ovT.innerText=p.ovT;
          if(ovM)ovM.innerText=p.ovM;
          if(ov)ov.style.display='flex'
        } else {
          var ov=$('ov');if(ov)ov.style.display='none'
        }
        render()
      }
    }
  }
  function sendLobby(){if(IS_HOST)SEATS[0].sid=MYSID;send({ev:'lobby',seats:SEATS})}
  function drawLobby(){
    var el=$('seatList');
    if(!el)return;
    var h='';SEATS.forEach(function(s){h+='<span class="chip">'+(s.bot?'🤖':'🙂')+' '+(s.n||'kosong')+'</span> '});
    h+='<div class="dim" style="margin-top:6px">'+(IS_HOST?'‍️ Kamu HOST — biarkan halaman TERBUKA.':'⏳ Tamu — menunggu host memulai...')+'</div>';
    el.innerHTML=h;
    var bStart=$('bStart');if(bStart)bStart.style.display=IS_HOST?'block':'none'
  }
  
  // ===== RENDER =====
  function render(){
    if(turn==MY&&!over&&fase=='draw'&&hands[MY].length>=12)fase='discard';
    var pileEl=$('pile');if(pileEl)pileEl.innerText=pile.length;
    var lastEl=$('lastD');if(lastEl)lastEl.innerHTML=(last!=null)?svg(last.card):'';
    for(var p=0;p<4;p++){
      var nEl=$('n'+p),sEl=$('s'+p),aEl=$('a'+p),cEl=$('c'+p),dEl=$('d'+p);
      if(nEl)nEl.innerText=SEATS[p].n;
      if(sEl)sEl.innerText='★'.repeat(wins[p]);
      if(aEl)aEl.innerText=SEATS[p].bot?'':'🙂';
      if(cEl)cEl.style.display=(cokiOf(hands[p])>=0?'block':'none');
      if(p!=MY&&dEl)dEl.innerHTML=disc[p].slice(-4).map(function(){return '<span class="mini"></span>'}).join('')
    }
    var hh='';hands[MY].forEach(function(m,i){hh+='<span class="cd'+(i==sel?' sel':'')+'" data-i="'+i+'">'+svg(m)+'</span>'});
    var handEl=$('hand');if(handEl)handEl.innerHTML=hh;
    var els=document.querySelectorAll('.cd');
    for(var k=0;k<els.length;k++){(function(el){el.onclick=function(){sel=+el.dataset.i;render()}})(els[k])}
    var my=(turn==MY)&&!over&&started;
    var bCabut=$('bCabut'),bTurun=$('bTurun'),bKoa=$('bKoa'),bSusun=$('bSusun');
    if(bCabut)bCabut.style.display=(my&&fase=='draw')?'inline-block':'none';
    if(bTurun)bTurun.style.display=(my&&fase=='discard'&&sel>=0)?'inline-block':'none';
    if(bKoa)bKoa.style.display=(my&&fase=='discard'&&win12(cnt(hands[MY])))?'inline-block':'none';
    if(bSusun)bSusun.style.display=my?'inline-block':'none';
    if(my&&fase=='draw'&&last&&cnt(hands[MY])[last.card]>=2)showMakan(true);
    if(my){stat(fase=='draw'?'Giliranmu: CABUT (atau MAKAN)':'Tangan 12: KETUK kartu → TURUN')}
    var info=$('info');if(info)info.innerText='Tangan: '+hands[MY].length+' • Tumpukan: '+pile.length;
    if(IS_HOST&&started)sendState()
  }
  function sendState(){send({ev:'state',hands:hands,disc:disc,pile:pile.length,last:last,turn:turn,fase:fase,wins:wins,over:over,ovT:$('ovT')?$('ovT').innerText:'',ovM:$('ovM')?$('ovM').innerText:'',names:SEATS.map(function(s){return s.n})})}
  
  // ===== GAME LOGIC =====
  function startRound(){
    rid++;if(mkT)clearTimeout(mkT);
    var all=[];for(var m=0;m<30;m++)for(var c=0;c<6;c++)all.push(m);
    var deck=shuffle(all);hands=[[],[],[],[]];disc=[[],[],[],[]];pile=deck.slice();last=null;over=false;sel=-1;
    for(var i=0;i<11;i++)for(var p=0;p<4;p++)hands[p].push(pile.pop());
    turn=0;fase='draw';
    var ov=$('ov');if(ov)ov.style.display='none';
    started=true;
    var lobby=$('lobby'),game=$('gameArea');
    if(lobby)lobby.style.display='none';
    if(game)game.style.display='block';
    render();showMakan(false)
  }
  function doCabut(s){showMakan(false);if(mkT)clearTimeout(mkT);hands[s].push(pile.pop());fase='discard';if(s==MY)sel=-1;render()}
  function doMakan(s){if(!last)return;showMakan(false);if(mkT)clearTimeout(mkT);hands[s].push(last.card);disc[last.from].pop();last=null;turn=s;fase='discard';render()}
  function doTurun(s,card){var idx=hands[s].indexOf(card);if(idx<0)return;var m=hands[s].splice(idx,1)[0];disc[s].push(m);last={card:m,from:s};fase='idle';showMakan(false);render();afterMyDiscard(s)}
  function doKoa(s){endRound(s,'KOA!')}
  function afterMyDiscard(s){
    var r=rid;
    for(var b=0;b<4;b++){
      if(b==s)continue;
      if(SEATS[b].bot&&cnt(hands[b])[last.card]>=2&&Math.random()<0.5){
        setTimeout(function(){if(r!=rid)return;
          hands[b].push(last.card);disc[last.from].pop();last=null;stat(SEATS[b].n+' MAKAN kartu!');botFinish(b)},700);
        return
      }
    }
    setTimeout(function(){if(r==rid)next()},600)
  }
  function next(){turn=(turn+1)%4;route()}
  function route(){
    if(!started)return;
    if(SEATS[turn].bot){botTurn(turn)}
    else if(turn==MY){fase='draw';render()}
    else {fase='draw';render();stat('Giliran '+SEATS[turn].n+'...')}
  }
  function botTurn(i){
    var r=rid;setTimeout(function(){if(r!=rid||!started)return;
      if(last&&cnt(hands[i])[last.card]>=2&&Math.random()<0.6){hands[i].push(last.card);disc[last.from].pop();last=null}
      else{if(!pile.length){endRound(-1,'Seri');return}hands[i].push(pile.pop())}
      if(win12(cnt(hands[i]))){endRound(i,'KOA!');return}
      botFinish(i)},900)
  }
  function botFinish(i){
    var r=rid,c=cnt(hands[i]),best=null;
    for(var m=0;m<30;m++){if(hands[i].indexOf(m)>=0){if(best==null||c[m]<c[best])best=m}}
    if(best==null)best=hands[i][0];
    hands[i].splice(hands[i].indexOf(best),1);disc[i].push(best);last={card:best,from:i};render();
    setTimeout(function(){if(r!=rid)return;
      if(!SEATS[MY].bot&&cnt(hands[MY])[best]>=2&&turn==MY){showMakan(true);stat(SEATS[i].n+' buang '+MID[best].f+' — MAKAN?');
        mkT=setTimeout(function(){showMakan(false);next()},2500)}
      else next()},400)
  }
  function endRound(w,why){
    over=true;rid++;if(mkT)clearTimeout(mkT);showMakan(false);
    if(w>=0)wins[w]++;
    var done=(w>=0&&wins[w]>=3);
    var ovT=$('ovT'),ovM=$('ovM'),ov=$('ov');
    if(ovT)ovT.innerText=(w==MY)?(' '+why+' KAMU SAMPAI!'):(w>=0)?(SEATS[w].n+' SAMPAI — Kamu Kalah :('):'🤝 SERI';
    var msg=(done?'🏆 JUARA MATCH (PUTUS!): '+SEATS[w].n+' • ':'')+'Skor ★: '+wins.join(' • ');
    if(w!=MY&&w>=0)msg+=' — Awak coki duluan, urang yang sampai 😭';
    if(ovM)ovM.innerText=msg;
    if(ov)ov.style.display='flex';
    render()
  }
  
  // ===== BINDING TOMBOL (DIBUNGKUS TRY-CATCH) =====
  function bindButtons(){
    console.log('🔧 Binding tombol...');
    
    // bSolo
    try {
      var bSolo=$('bSolo');
      if(bSolo){
        bSolo.onclick=function(){
          console.log('▶️ SOLO clicked');
          IS_HOST=true;
          SEATS=[{n:MYNAME,bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];
          startRound()
        };
        console.log('✅ bSolo bound')
      }
    } catch(e){console.error('bSolo bind error:',e)}
    
    // bBuat
    try {
      var bBuat=$('bBuat');
      if(bBuat){
        bBuat.onclick=function(){
          console.log('🌐 BUAT MEJA clicked');
          var code=Math.random().toString(36).slice(2,6).toUpperCase();
          try{localStorage.setItem('gv_ceki_host',code)}catch(e){}
          SEATS=[{n:MYNAME,bot:false,taken:true,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
          IS_HOST=true;
          initRoom(code);sendLobby();
          var roomBox=$('roomBox'),roomCode=$('roomCode'),roomLink=$('roomLink'),joinCode=$('joinCode');
          if(roomBox)roomBox.style.display='block';
          if(roomCode)roomCode.innerText=code;
          if(roomLink)roomLink.innerText='gloryverse.id/ceki?room='+code;
          if(joinCode)joinCode.value='';
          drawLobby();
          console.log('✅ Room created:',code)
        };
        console.log('✅ bBuat bound')
      }
    } catch(e){console.error('bBuat bind error:',e)}
    
    // bStart
    try {
      var bStart=$('bStart');
      if(bStart){
        bStart.onclick=function(){
          console.log('🚀 MULAI clicked');
          for(var i=1;i<4;i++){if(!SEATS[i].n)SEATS[i]={n:['','Uni Ros','Angku Mansur','Buya Datuk'][i],bot:true}}
          startRound()
        };
        console.log('✅ bStart bound')
      }
    } catch(e){console.error('bStart bind error:',e)}
    
    // bJoin
    try {
      var bJoin=$('bJoin');
      if(bJoin){
        bJoin.onclick=function(){
          var codeEl=$('joinCode');
          if(!codeEl)return;
          var c=codeEl.value.trim().toUpperCase();
          if(!c){alert('Masukkan kode meja!');return}
          console.log('🤝 GABUNG:',c);
          IS_HOST=false;seated=false;
          SEATS=[{n:MYNAME,bot:false,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
          initRoom(c);send({act:'join',name:MYNAME,sid:MYSID});
          if(knockT)clearInterval(knockT);
          knockT=setInterval(function(){if(!seated)send({act:'join',name:MYNAME,sid:MYSID})},3000);
          var roomBox=$('roomBox'),roomCode=$('roomCode'),roomLink=$('roomLink');
          if(roomBox)roomBox.style.display='block';
          if(roomCode)roomCode.innerText=c;
          if(roomLink)roomLink.innerText='gloryverse.id/ceki?room='+c;
          drawLobby();
          setTimeout(function(){if(!seated&&!started){
            var rl=$('roomLink');
            if(rl)rl.innerText='⚠️ Host belum terdeteksi — pastikan host membuka halamannya (ketukan otomatis berlanjut).'
          }},8000)
        };
        console.log('✅ bJoin bound')
      }
    } catch(e){console.error('bJoin bind error:',e)}
    
    // Tombol game
    try {
      var bCabut=$('bCabut');
      if(bCabut)bCabut.onclick=function(){if(IS_HOST)doCabut(0);else send({act:'cabut',seat:MY})};
      var bMakan=$('bMakan');
      if(bMakan)bMakan.onclick=function(){if(IS_HOST)doMakan(0);else send({act:'makan',seat:MY})};
      var bTurun=$('bTurun');
      if(bTurun)bTurun.onclick=function(){var card=hands[MY][sel];sel=-1;if(IS_HOST)doTurun(0,card);else send({act:'turun',seat:MY,card:card})};
      var bKoa=$('bKoa');
      if(bKoa)bKoa.onclick=function(){if(IS_HOST)doKoa(0);else send({act:'koa',seat:MY})};
      var bSusun=$('bSusun');
      if(bSusun)bSusun.onclick=function(){hands[MY].sort(function(a,b){return a-b});sel=-1;render()};
      console.log('✅ Game buttons bound')
    } catch(e){console.error('Game buttons bind error:',e)}
    
    // Overlay buttons
    try {
      var ovL=$('ovL');
      if(ovL)ovL.onclick=function(){if(IS_HOST){for(var i=0;i<4;i++)if(wins[i]>=3)wins=[0,0,0,0];startRound()}else{var ov=$('ov');if(ov)ov.style.display='none'}};
      var ovWA=$('ovWA');
      if(ovWA)ovWA.onclick=function(){var ovM=$('ovM');var t=encodeURIComponent('KOA CEKI — LAPAU SOLOK\n'+(ovM?ovM.innerText:'')+'\nMainkan: gloryverse.id/

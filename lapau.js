/* lapau.js — WASIT MEJA KOA CEKI (solo + mabar realtime) */
if(typeof window.phase!=='function'&&typeof window.phaseOf==='function')window.phase=window.phaseOf;
var FAM=['HIU','JARUM','SUDUNG','BENGKOK','TALI','PECAH','BATUNG','SISIR','BABI'];
var VAR={HIU:['Babak','Kucing','Penci','Bunga','Kasut','Panjang'],JARUM:['Wajik','Besar','Kecil'],
SUDUNG:['Putih','Hitam','Pinggang'],BENGKOK:['Hitam','Besar','Kecil'],TALI:['Merah','Bulat','Kecil'],
PECAH:['Manik','Delapan','Halus'],BATUNG:['Manik','Enam','Kecil'],SISIR:['Besar','Kecil','Bendera'],BABI:['Pusat','Besar','Kecil']};
var RED={'HIU/Penci':1,'HIU/Babak':2,'TALI/Merah':1};
var MID=[];FAM.forEach(function(f){VAR[f].forEach(function(n){MID.push({f:f,n:n,red:RED[f+'/'+n]||0})})});
function svg(m){var M=MID[m],v=VAR[M.f].indexOf(M.n),field=M.red==2?'#a1171f':'#151515';
 var W='stroke="#f5f0e6" stroke-width="3" fill="none"',g='',i,n;
 if(M.f=='HIU'){n=v+1;g='<path d="M14 20 h32" '+W+'/>';for(i=0;i<n;i++)g+='<rect x="18" y="'+(30+i*28)+'" width="24" height="20" '+W+'/>';}
 if(M.f=='JARUM'){n=v+1;for(i=0;i<n;i++)g+='<path d="M30 '+(18+i*34)+' l12 14 -12 14 -12 -14 z" '+W+'/>';}
 if(M.f=='SUDUNG'){n=v+2;for(i=0;i<n;i++)g+='<circle cx="30" cy="'+(26+i*(88/(n-1)))+'" r="8" '+W+'/>';}
 if(M.f=='BENGKOK'){if(v==0)g='<path d="M20 20 v100 h20" '+W+'/>';if(v==1)g='<path d="M40 20 v100 h-20" '+W+'/>';if(v==2)g='<path d="M20 20 v100 h20 M40 20 v60" '+W+'/>';}
 if(M.f=='TALI'){n=3-v;for(i=0;i<n;i++){var cy=30+i*(80/Math.max(n-1,1));g+='<circle cx="30" cy="'+cy+'" r="11" '+W+'/><circle cx="30" cy="'+cy+'" r="'+(3+v*2)+'" '+W+'/>'}}
 if(M.f=='PECAH'){n=4+v;for(i=0;i<n;i++)g+='<circle cx="'+(20+(i%2)*18)+'" cy="'+(24+Math.floor(i/2)*26)+'" r="6" '+W+'/>';}
 if(M.f=='BATUNG'){n=2+v;for(i=0;i<n;i++){g+='<circle cx="24" cy="'+(28+i*(84/Math.max(n-1,1)))+'" r="5" '+W+'/><circle cx="36" cy="'+(28+i*(84/Math.max(n-1,1)))+'" r="5" '+W+'/>'}}
 if(M.f=='SISIR'){n=3+v;for(i=0;i<n;i++)g+='<path d="M18 '+(26+i*(88/(n-1)))+' h24" '+W+'/>';}
 if(M.f=='BABI'){g='<circle cx="30" cy="32" r="12" '+W+'/>';for(i=0;i<v+1;i++)g+='<rect x="'+(19+(i%2)*13)+'" y="'+(56+Math.floor(i/2)*26)+'" width="11" height="18" '+W+'/>';}
 var band=M.red==1?'<rect x="10" y="52" width="40" height="34" fill="#a1171f"/>':'';
 var lab='<text x="30" y="137" font-size="10" fill="#151515" text-anchor="middle" font-family="monospace">'+String(m+1).padStart(2,'0')+'</text>';
 return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><rect x="8" y="8" width="44" height="124" fill="'+field+'"/>'+band+g+lab+'</svg>'}
var hands=[[],[],[],[]],disc=[[],[],[],[]],pile=[],turn=0,fase='idle',sel=-1,wins=[0,0,0,0],rid=0,last=null,over=false,mkT=null;
var SEATS=[{n:'Kamu',bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];
var IS_HOST=true,MY=0,ROOM=null,CH=null,started=false,MYNAME='Kamu',MYSID=Math.random().toString(36).slice(2,8);
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
function stat(t){$('stat').innerText=t}
function showMakan(v){$('bMakan').style.display=v?'inline-block':'none'}
function send(o){if(CH)CH.send({type:'broadcast',event:'m',payload:o})}
function render(){if(turn==MY&&!over&&fase=='draw'&&hands[MY].length>=12)fase='discard';
 $('pile').innerText=pile.length;
 $('lastD').innerHTML=(last!=null)?svg(last.card):'';
 for(var p=0;p<4;p++){$('n'+p).innerText=SEATS[p].n;$('s'+p).innerText='★'.repeat(wins[p]);
  $('a'+p).innerText=SEATS[p].bot?'🤖':'🙂';
  $('c'+p).style.display=(cokiOf(hands[p])>=0?'block':'none');
  if(p!=MY)$('d'+p).innerHTML=disc[p].slice(-4).map(function(){return '<span class="mini"></span>'}).join('')}
 var hh='';hands[MY].forEach(function(m,i){hh+='<span class="cd'+(i==sel?' sel':'')+'" data-i="'+i+'">'+svg(m)+'</span>'});
 $('hand').innerHTML=hh;
 var els=document.querySelectorAll('.cd');for(var k=0;k<els.length;k++){els[k].onclick=function(){sel=+this.dataset.i;render()}}
 var my=(turn==MY)&&!over&&started;
 $('bCabut').style.display=(my&&fase=='draw')?'inline-block':'none';
 $('bTurun').style.display=(my&&fase=='discard'&&sel>=0)?'inline-block':'none';
 $('bKoa').style.display=(my&&fase=='discard'&&win12(cnt(hands[MY])))?'inline-block':'none';
 $('bSusun').style.display=my?'inline-block':'none';
 if(my&&fase=='draw'&&last&&cnt(hands[MY])[last.card]>=2)showMakan(true);
 if(my){stat(fase=='draw'?'Giliranmu: CABUT (atau MAKAN)':'Tangan 12: KETUK kartu → TURUN')}
 $('info').innerText='Tangan: '+hands[MY].length+' • Tumpukan: '+pile.length;
 if(IS_HOST&&started)sendState()}
function sendState(){send({ev:'state',hands:hands,disc:disc,pile:pile.length,last:last,turn:turn,fase:fase,wins:wins,over:over,ovT:$('ovT').innerText,ovM:$('ovM').innerText,names:SEATS.map(function(s){return s.n})})}
function startRound(){rid++;if(mkT)clearTimeout(mkT);
 var all=[];for(var m=0;m<30;m++)for(var c=0;c<6;c++)all.push(m);
 var deck=shuffle(all);hands=[[],[],[],[]];disc=[[],[],[],[]];pile=deck.slice();last=null;over=false;sel=-1;
 for(var i=0;i<11;i++)for(var p=0;p<4;p++)hands[p].push(pile.pop());
 turn=0;fase='draw';$('ov').style.display='none';started=true;
 $('lobby').style.display='none';$('gameArea').style.display='block';render();showMakan(false)}
function doCabut(s){showMakan(false);if(mkT)clearTimeout(mkT);hands[s].push(pile.pop());fase='discard';if(s==MY)sel=-1;render()}
function doMakan(s){if(!last)return;showMakan(false);if(mkT)clearTimeout(mkT);hands[s].push(last.card);disc[last.from].pop();last=null;turn=s;fase='discard';render()}
function doTurun(s,card){var idx=hands[s].indexOf(card);if(idx<0)return;var m=hands[s].splice(idx,1)[0];disc[s].push(m);last={card:m,from:s};fase='idle';showMakan(false);render();afterMyDiscard(s)}
function doKoa(s){endRound(s,'KOA!')}
function afterMyDiscard(s){var r=rid;
 for(var b=0;b<4;b++){if(b==s)continue;if(SEATS[b].bot&&cnt(hands[b])[last.card]>=2&&Math.random()<0.5){setTimeout(function(){if(r!=rid)return;
  hands[b].push(last.card);disc[last.from].pop();last=null;stat(SEATS[b].n+' MAKAN kartu!');botFinish(b)},700);return}}
 setTimeout(function(){if(r==rid)next()},600)}
function next(){turn=(turn+1)%4;route()}
function route(){if(!started)return;
 if(SEATS[turn].bot){botTurn(turn)}
 else if(turn==MY){fase='draw';render()}
 else {fase='draw';render();stat('Giliran '+SEATS[turn].n+'...')}}
function botTurn(i){var r=rid;setTimeout(function(){if(r!=rid||!started)return;
 if(last&&cnt(hands[i])[last.card]>=2&&Math.random()<0.6){hands[i].push(last.card);disc[last.from].pop();last=null}
 else{if(!pile.length){endRound(-1,'Seri');return}hands[i].push(pile.pop())}
 if(win12(cnt(hands[i]))){endRound(i,'KOA!');return}
 botFinish(i)},900)}
function botFinish(i){var r=rid,c=cnt(hands[i]),best=null;
 for(var m=0;m<30;m++){if(hands[i].indexOf(m)>=0){if(best==null||c[m]<c[best])best=m}}
 if(best==null)best=hands[i][0];
 hands[i].splice(hands[i].indexOf(best),1);disc[i].push(best);last={card:best,from:i};render();
 setTimeout(function(){if(r!=rid)return;
  if(!SEATS[MY].bot&&cnt(hands[MY])[best]>=2&&turn==MY){showMakan(true);stat(SEATS[i].n+' buang '+MID[best].f+' — MAKAN?');
   mkT=setTimeout(function(){showMakan(false);next()},2500)}
  else next()},400)}
function endRound(w,why){over=true;rid++;if(mkT)clearTimeout(mkT);showMakan(false);
 if(w>=0)wins[w]++;
 var done=(w>=0&&wins[w]>=3);
 $('ovT').innerText=(w==MY)?('🟢 '+why+' KAMU SAMPAI!'):(w>=0)?(SEATS[w].n+' SAMPAI — Kamu Kalah :('):'🤝 SERI';
 var msg=(done?'🏆 JUARA MATCH (PUTUS!): '+SEATS[w].n+' • ':'')+'Skor ★: '+wins.join(' • ');
 if(w!=MY&&w>=0)msg+=' — Awak coki duluan, urang yang sampai 😭';
 $('ovM').innerText=msg;$('ov').style.display='flex';render()}
$('bCabut').onclick=function(){if(IS_HOST)doCabut(0);else send({act:'cabut',seat:MY})};
$('bMakan').onclick=function(){if(IS_HOST)doMakan(0);else send({act:'makan',seat:MY})};
$('bTurun').onclick=function(){var card=hands[MY][sel];sel=-1;if(IS_HOST)doTurun(0,card);else send({act:'turun',seat:MY,card:card})};
$('bKoa').onclick=function(){if(IS_HOST)doKoa(0);else send({act:'koa',seat:MY})};
$('bSusun').onclick=function(){hands[MY].sort(function(a,b){return a-b});sel=-1;render()};
$('ovL').onclick=function(){if(IS_HOST){for(var i=0;i<4;i++)if(wins[i]>=3)wins=[0,0,0,0];startRound()}else $('ov').style.display='none'};
$('ovWA').onclick=function(){var t=encodeURIComponent('KOA CEKI — LAPAU SOLOK\n'+$('ovM').innerText+'\nMainkan: gloryverse.id/ceki');location.href='https://wa.me/?text='+t};
function openRoom(code,host){if(CH){try{db.removeChannel(CH)}catch(e){}}ROOM=code;
 CH=db.channel('ceki_'+code).on('broadcast',function(e){var p=e.payload;
  if(host){
   if(p.act=='join'){for(var i=1;i<4;i++){if(SEATS[i].bot){SEATS[i]={n:p.name,bot:false,taken:true};sendLobby();break}}}
   if(p.act=='cabut'&&started&&turn==p.seat)doCabut(p.seat);
   if(p.act=='makan'&&started&&turn==p.seat)doMakan(p.seat);
   if(p.act=='turun'&&started&&turn==p.seat)doTurun(p.seat,p.card);
   if(p.act=='koa'&&started&&turn==p.seat&&win12(cnt(hands[p.seat])))doKoa(p.seat);
  } else {
   if(p.ev=='lobby'){p.seats.forEach(function(s,i){if(s&&s.sid==MYSID)MY=i;if(s)SEATS[i]=s});drawLobby()}
   if(p.ev=='state'){hands=p.hands;disc=p.disc;pile=Array(p.pile);last=p.last;turn=p.turn;fase=p.fase;wins=p.wins;over=p.over;
    p.names.forEach(function(n,i){SEATS[i].n=n});
    started=true;$('lobby').style.display='none';$('gameArea').style.display='block';
    if(over){$('ovT').innerText=p.ovT;$('ovM').innerText=p.ovM;$('ov').style.display='flex'}else $('ov').style.display='none';
    render()}
  }}).subscribe();
 if(host){IS_HOST=true;sendLobby()}}
function sendLobby(){SEATS.forEach(function(s,i){if(!s.sid&&!s.bot&&i==0)s.sid=MYSID;if(i==0)s.sid=MYSID});send({ev:'lobby',seats:SEATS})}
function drawLobby(){var h='';SEATS.forEach(function(s){h+='<span class="chip">'+(s.bot?'🤖':'🙂')+' '+(s.n||'kosong')+'</span> '});
 h+='<div class="dim" style="margin-top:6px">'+(IS_HOST?'🧑‍⚖️ Kamu HOST — biarkan halaman TERBUKA.':'⏳ Tamu — menunggu host memulai...')+'</div>';
 $('seatList').innerHTML=h;$('bStart').style.display=IS_HOST?'block':'none'}
$('bSolo').onclick=function(){IS_HOST=true;SEATS=[{n:MYNAME,bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];startRound()};
$('bBuat').onclick=function(){var code=Math.random().toString(36).slice(2,6).toUpperCase();
 SEATS=[{n:MYNAME,bot:false,taken:true,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
 openRoom(code,true);$('roomBox').style.display='block';$('roomCode').innerText=code;
 $('roomLink').innerText='gloryverse.id/ceki?room='+code;$('joinCode').value='';drawLobby()};
$('bStart').onclick=function(){for(var i=1;i<4;i++){if(!SEATS[i].n)SEATS[i]={n:['','Uni Ros','Angku Mansur','Buya Datuk'][i],bot:true}}
 IS_HOST=true;startRound()};
$('bJoin').onclick=function(){var c=($('joinCode').value||'').trim().toUpperCase();if(!c)return;
 IS_HOST=false;SEATS=[{n:MYNAME,bot:false,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
 openRoom(c,false);send({act:'join',name:MYNAME,sid:MYSID});
 $('roomBox').style.display='block';$('roomCode').innerText=c;drawLobby()};
(function(){try{db.auth.getSession().then(function(r){var s=r.data&&r.data.session;
 if(s)return db.from('profiles').select('username').eq('id',s.user.id).single().then(function(p){
  if(p.data){MYNAME=p.data.username;SEATS[0].n=MYNAME}});
 }).catch(function(){});}catch(e){}
 var q=new URLSearchParams(location.search).get('room');
 if(q){$('joinCode').value=q;setTimeout(function(){var b=document.getElementById('bJoin');if(b)b.onclick()},600)}})();

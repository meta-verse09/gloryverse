(function(){
'use strict';
console.log('v7.3 loading');
if(typeof window.phase!=='function'&&typeof window.phaseOf==='function')window.phase=window.phaseOf;
var FAM=['HIU','JARUM','SUDUNG','BENGKOK','TALI','PECAH','BATUNG','SISIR','BABI'];
var VAR={HIU:['Babak','Kucing','Penci','Bunga','Kasut','Panjang'],JARUM:['Wajik','Besar','Kecil'],SUDUNG:['Putih','Hitam','Pinggang'],BENGKOK:['Hitam','Besar','Kecil'],TALI:['Merah','Bulat','Kecil'],PECAH:['Manik','Delapan','Halus'],BATUNG:['Manik','Enam','Kecil'],SISIR:['Besar','Kecil','Bendera'],BABI:['Pusat','Besar','Kecil']};
var RED={'HIU/Penci':1,'HIU/Babak':2,'TALI/Merah':1};
var MID=[];FAM.forEach(function(f){VAR[f].forEach(function(n){MID.push({f:f,n:n,red:RED[f+'/'+n]||0})})});
// Mapping kartu ke file PNG (index 0-29)
var CARD_FILES = [
  'hiu-babak.png','hiu-kuciang.png','hiu-aluih.png','hiu-merah.png','hiu-hitam.png','hiu-gadang.png',
  'jarum-wajik.png','jarum-gadang.png','jarum-aluih.png',
  'suduang-putiah.png','suduang-wajik.png','pinggang.png',
  'bengkok-aluih.png','bengkok-gadang.png','bengkok-wajik.png',
  'tali-sirah.png','tali-bulek.png','tali-aluih.png',
  'pacah-manih.png','pacah-lapan.png','pacah-aluih.png',
  'kapik-manih.png','kapik-anam.png','sisia-aluih.png',
  'sisia-gadang.png','bendera.png','batuang-anam.png',
  'babi-pusek.png','babi-gadang.png','babi-aluih.png'
];

window.svg=function(m){
  try{
    var file = CARD_FILES[m] || 'babi-aluih.png';
    var num = String(m+1).padStart(2,'0');
    return '<div style="width:60px;height:140px;position:relative;display:inline-block;margin:2px;">' +
      '<img src="' + file + '" style="width:100%;height:100%;border-radius:6px;" onerror="this.style.display=\'none\'">' +
      '<span style="position:absolute;bottom:2px;left:0;right:0;text-align:center;font-size:9px;color:#151515;font-family:monospace;">' + num + '</span>' +
      '</div>';
  }catch(e){
    return '<div style="width:60px;height:140px;background:#f5f0e6;border-radius:6px;"></div>';
  }
};
var SEATS=[{n:'Kamu',bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];
var hands=[[],[],[],[]],disc=[[],[],[],[]],pile=[],turn=0,fase='idle',sel=-1,wins=[0,0,0,0],rid=0,last=null,over=false,mkT=null;
var IS_HOST=true,MY=0,ROOM=null,started=false,seated=false,knockT=null,pollT=null,lastMsgId=0;
var MYNAME='Kamu',MYSID=Math.random().toString(36).slice(2,8);
var SEATS=[{n:'Kamu',bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];
var hands=[[],[],[],[]],disc=[[],[],[],[]],pile=[],turn=0,fase='idle',sel=-1,wins=[0,0,0,0],rid=0,last=null,over=false,mkT=null;
var IS_HOST=true,MY=0,ROOM=null,started=false,seated=false,knockT=null,pollT=null,lastMsgId=0;
var MYNAME='Kamu',MYSID=Math.random().toString(36).slice(2,8);
function $(id){return document.getElementById(id);}
function cnt(h){var c=[];for(var i=0;i<30;i++)c[i]=0;h.forEach(function(m){c[m]++});return c;}
function win12(c){var t=0,i;for(i=0;i<30;i++)t+=c[i];if(t!==12)return false;for(var p=0;p<30;p++){if(c[p]<2)continue;var tr=[];for(var m=0;m<30;m++){if(c[m]-(m===p?2:0)>=3)tr.push(m);}for(var a=0;a<tr.length;a++)for(var b=a+1;b<tr.length;b++)for(var d=b+1;d<tr.length;d++){var cc=c.slice();cc[p]-=2;cc[tr[a]]-=3;cc[tr[b]]-=3;cc[tr[d]]-=3;var ok=true,s=0;for(i=0;i<30;i++){if(cc[i]<0)ok=false;s+=cc[i];}if(ok&&s===1)return true;}}return false;}
function cokiOf(h){var c=cnt(h);for(var m=0;m<30;m++){c[m]++;var w=win12(c);c[m]--;if(w)return m;}return -1;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function stat(t){var el=$('stat');if(el)el.innerText=t;}
function showMakan(v){var el=$('bMakan');if(el)el.style.display=v?'inline-block':'none';}
function send(o){
  if(!ROOM||!window.db){
    console.error('send fail: no room or db');
    return;
  }
  o.sid=MYSID;
  console.log('Sending to DB:', o);
  
  db.from('ceki_msg').insert({
    room: ROOM,
    kind: (o.ev||o.act)||'m',
    payload: o
  }).then(function(r){
    console.log('DB response:', r);
  }).catch(function(e){
    console.error('DB error:', e);
  });
}
function initRoom(code){ROOM=code;console.log('initRoom:',code);if(pollT)clearInterval(pollT);if(window.db){db.from('ceki_msg').select('id').eq('room',code).order('id',{ascending:false}).limit(1).then(function(r){lastMsgId=(r.data&&r.data[0])?r.data[0].id:0;console.log('lastMsgId:',lastMsgId);});pollT=setInterval(function(){if(!ROOM)return;db.from('ceki_msg').select('*').eq('room',ROOM).gt('id',lastMsgId).order('id',{ascending:true}).limit(30).then(function(r){console.log('poll:',r.data?r.data.length:0);(r.data||[]).forEach(function(row){lastMsgId=row.id;handle(row.payload);});}).catch(function(e){console.error('poll err',e);});},1000);}}
function handle(p){if(!p||p.sid===MYSID)return;console.log('handle:',p.ev||p.act);if(IS_HOST){if(p.act==='join'){var got=-1;for(var i=1;i<4;i++){if(SEATS[i].sid===p.sid){got=i;break;}}if(got<0){for(var i=1;i<4;i++){if(SEATS[i].bot){SEATS[i]={n:p.name,bot:false,taken:true,sid:p.sid};got=i;break;}}}if(got>=0){console.log('join seat:',got);sendLobby();}}if(p.act==='cabut'&&started&&turn===p.seat)doCabut(p.seat);if(p.act==='makan'&&started&&turn===p.seat)doMakan(p.seat);if(p.act==='turun'&&started&&turn===p.seat)doTurun(p.seat,p.card);if(p.act==='koa'&&started&&turn===p.seat&&win12(cnt(hands[p.seat])))doKoa(p.seat);}else{if(p.ev==='lobby'){p.seats.forEach(function(s,i){if(s&&s.sid===MYSID){MY=i;seated=true;if(knockT){clearInterval(knockT);knockT=null;console.log('seated at',i);}}if(s)SEATS[i]=s;});drawLobby();}if(p.ev==='state'){hands=p.hands;disc=p.disc;pile=Array(p.pile);last=p.last;turn=p.turn;fase=p.fase;wins=p.wins;over=p.over;p.names.forEach(function(n,i){SEATS[i].n=n;});started=true;var lobby=$('lobby'),game=$('gameArea');if(lobby)lobby.style.display='none';if(game)game.style.display='block';if(over){var ovT=$('ovT'),ovM=$('ovM'),ov=$('ov');if(ovT)ovT.innerText=p.ovT;if(ovM)ovM.innerText=p.ovM;if(ov)ov.style.display='flex';}else{var ov=$('ov');if(ov)ov.style.display='none';}render();}}}
function sendLobby(){
  if(IS_HOST)SEATS[0].sid=MYSID;
  console.log('sendLobby seats:', SEATS);
  
  // Sederhanakan format seats
  var simpleSeats = SEATS.map(function(s){
    return {
      n: s.n || '',
      bot: s.bot || false,
      taken: s.taken || false,
      sid: s.sid || ''
    };
  });
  
  var payload = {
    ev: 'lobby',
    seats: simpleSeats
  };
  
  console.log('Sending payload:', payload);
  send(payload);
}
function drawLobby(){var el=$('seatList');if(!el)return;var h='';SEATS.forEach(function(s){h+='<span class="chip">'+(s.bot?'BOT:':'')+' '+(s.n||'kosong')+'</span> ';});h+='<div class="dim" style="margin-top:6px">'+(IS_HOST?'Kamu HOST - biarkan halaman TERBUKA.':'Tamu - menunggu host memulai...')+'</div>';el.innerHTML=h;var bStart=$('bStart');if(bStart)bStart.style.display=IS_HOST?'block':'none';}
function render(){if(turn===MY&&!over&&fase==='draw'&&hands[MY].length>=12)fase='discard';var pileEl=$('pile');if(pileEl)pileEl.innerText=pile.length;var lastEl=$('lastD');if(lastEl)lastEl.innerHTML=(last!==null)?svg(last.card):'';for(var p=0;p<4;p++){var nEl=$('n'+p),sEl=$('s'+p),aEl=$('a'+p),cEl=$('c'+p),dEl=$('d'+p);if(nEl)nEl.innerText=SEATS[p].n;if(sEl)sEl.innerText=String.fromCharCode(9733).repeat(wins[p]);if(aEl)aEl.innerText=SEATS[p].bot?'BOT':'';if(cEl)cEl.style.display=(cokiOf(hands[p])>=0)?'block':'none';if(p!==MY&&dEl)dEl.innerHTML=disc[p].slice(-4).map(function(){return '<span class="mini"></span>';}).join('');}var hh='';hands[MY].forEach(function(m,i){hh+='<span class="cd'+(i===sel?' sel':'')+'" data-i="'+i+'">'+svg(m)+'</span>';});var handEl=$('hand');if(handEl)handEl.innerHTML=hh;var els=document.querySelectorAll('.cd');for(var k=0;k<els.length;k++){(function(el){el.onclick=function(){sel=+el.dataset.i;render();};})(els[k]);}var my=(turn===MY)&&!over;var bCabut=$('bCabut'),bTurun=$('bTurun'),bKoa=$('bKoa'),bSusun=$('bSusun');if(bCabut)bCabut.style.display=(my&&fase==='draw')?'inline-block':'none';if(bTurun)bTurun.style.display=(my&&fase==='discard'&&sel>=0)?'inline-block':'none';if(bKoa)bKoa.style.display=(my&&fase==='discard'&&win12(cnt(hands[MY])))?'inline-block':'none';if(bSusun)bSusun.style.display=my?'inline-block':'none';if(my&&fase==='draw'&&last&&cnt(hands[MY])[last.card]>=2)showMakan(true);if(my)stat(fase==='draw'?'Giliranmu: CABUT (atau MAKAN)':'Tangan 12: KETUK kartu lalu TURUN');var info=$('info');if(info)info.innerText='Tangan: '+hands[MY].length+' | Tumpukan: '+pile.length;if(IS_HOST&&started)sendState();}
function sendState(){send({ev:'state',hands:hands,disc:disc,pile:pile.length,last:last,turn:turn,fase:fase,wins:wins,over:over,ovT:$('ovT')?$('ovT').innerText:'',ovM:$('ovM')?$('ovM').innerText:'',names:SEATS.map(function(s){return s.n;})});}
function startRound(){rid++;if(mkT)clearTimeout(mkT);var all=[];for(var m=0;m<30;m++)for(var c=0;c<6;c++)all.push(m);var deck=shuffle(all);hands=[[],[],[],[]];disc=[[],[],[],[]];pile=deck.slice();last=null;over=false;sel=-1;for(var i=0;i<11;i++)for(var p=0;p<4;p++)hands[p].push(pile.pop());turn=0;fase='draw';var ov=$('ov');if(ov)ov.style.display='none';started=true;var lobby=$('lobby'),game=$('gameArea');if(lobby)lobby.style.display='none';if(game)game.style.display='block';render();showMakan(false);}
function doCabut(s){showMakan(false);if(mkT)clearTimeout(mkT);hands[s].push(pile.pop());fase='discard';if(s===MY)sel=-1;render();}
function doMakan(s){if(!last)return;showMakan(false);if(mkT)clearTimeout(mkT);hands[s].push(last.card);disc[last.from].pop();last=null;turn=s;fase='discard';render();}
function doTurun(s,card){var idx=hands[s].indexOf(card);if(idx<0)return;var m=hands[s].splice(idx,1)[0];disc[s].push(m);last={card:m,from:s};fase='idle';showMakan(false);render();afterMyDiscard(s);}
function doKoa(s){endRound(s,'KOA!');}
function afterMyDiscard(s){var r=rid;for(var b=0;b<4;b++){if(b===s)continue;if(SEATS[b].bot&&cnt(hands[b])[last.card]>=2&&Math.random()<0.5){setTimeout(function(){if(r!==rid)return;hands[b].push(last.card);disc[last.from].pop();last=null;stat(SEATS[b].n+' MAKAN kartu!');botFinish(b);},700);return;}}setTimeout(function(){if(r===rid)next();},600);}
function next(){turn=(turn+1)%4;route();}
function route(){if(!started)return;if(SEATS[turn].bot)botTurn(turn);else if(turn===MY){fase='draw';render();}else{fase='draw';render();stat('Giliran '+SEATS[turn].n+'...');}}
function botTurn(i){var r=rid;setTimeout(function(){if(r!==rid||!started)return;if(last&&cnt(hands[i])[last.card]>=2&&Math.random()<0.6){hands[i].push(last.card);disc[last.from].pop();last=null;}else{if(!pile.length){endRound(-1,'Seri');return;}hands[i].push(pile.pop());}if(win12(cnt(hands[i]))){endRound(i,'KOA!');return;}botFinish(i);},900);}
function botFinish(i){var r=rid,c=cnt(hands[i]),best=null;for(var m=0;m<30;m++){if(hands[i].indexOf(m)>=0){if(best===null||c[m]<c[best])best=m;}}if(best===null)best=hands[i][0];hands[i].splice(hands[i].indexOf(best),1);disc[i].push(best);last={card:best,from:i};render();setTimeout(function(){if(r!==rid)return;if(!SEATS[MY].bot&&cnt(hands[MY])[best]>=2&&turn===MY){showMakan(true);stat(SEATS[i].n+' buang '+MID[best].f+' - MAKAN?');mkT=setTimeout(function(){showMakan(false);next();},2500);}else next();},400);}
function endRound(w,why){over=true;rid++;if(mkT)clearTimeout(mkT);showMakan(false);if(w>=0)wins[w]++;var done=(w>=0&&wins[w]>=3);var ovT=$('ovT'),ovM=$('ovM'),ov=$('ov');if(ovT)ovT.innerText=(w===MY)?(why+' KAMU SAMPAI!'):(w>=0)?(SEATS[w].n+' SAMPAI - Kamu Kalah'):'SERI';var msg=(done?'JUARA: '+SEATS[w].n+' | ':'')+'Skor: '+wins.join(' - ');if(w!==MY&&w>=0)msg+=' | Awak coki duluan, urang yang sampai';if(ovM)ovM.innerText=msg;if(ov)ov.style.display='flex';render();}
  function bindButtons(){
console.log('bindButtons start');
var bSolo=$('bSolo');
if(bSolo){bSolo.onclick=function(){console.log('solo click');IS_HOST=true;SEATS=[{n:MYNAME,bot:false},{n:'Uni Ros',bot:true},{n:'Angku Mansur',bot:true},{n:'Buya Datuk',bot:true}];startRound();};console.log('bSolo ok');}

var bBuat=$('bBuat');
if(bBuat){bBuat.onclick=function(){console.log('buat meja click');
var code=Math.random().toString(36).slice(2,6).toUpperCase();
try{localStorage.setItem('gv_ceki_host',code);}catch(e){}
SEATS=[{n:MYNAME,bot:false,taken:true,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
IS_HOST=true;
initRoom(code);
setTimeout(function(){sendLobby();console.log('lobby sent');},1500);
var roomBox=$('roomBox'),roomCode=$('roomCode'),roomLink=$('roomLink'),joinCode=$('joinCode');
if(roomBox)roomBox.style.display='block';
if(roomCode)roomCode.innerText=code;
if(roomLink)roomLink.innerText='gloryverse.id/ceki?room='+code;
if(joinCode)joinCode.value='';
drawLobby();
console.log('room created:',code);};console.log('bBuat ok');}

var bStart=$('bStart');
if(bStart){bStart.onclick=function(){console.log('mulai click');
for(var i=1;i<4;i++){if(!SEATS[i].n)SEATS[i]={n:['','Uni Ros','Angku Mansur','Buya Datuk'][i],bot:true};}
startRound();};console.log('bStart ok');}

var bJoin=$('bJoin');
if(bJoin){bJoin.onclick=function(){
var codeEl=$('joinCode');if(!codeEl)return;
var c=codeEl.value.trim().toUpperCase();if(!c){alert('Masukkan kode meja!');return;}
console.log('gabung:',c);
IS_HOST=false;seated=false;
SEATS=[{n:MYNAME,bot:false,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
initRoom(c);
send({act:'join',name:MYNAME,sid:MYSID});
if(knockT)clearInterval(knockT);
knockT=setInterval(function(){if(!seated)send({act:'join',name:MYNAME,sid:MYSID});},3000);
var roomBox=$('roomBox'),roomCode=$('roomCode'),roomLink=$('roomLink');
if(roomBox)roomBox.style.display='block';
if(roomCode)roomCode.innerText=c;
if(roomLink)roomLink.innerText='gloryverse.id/ceki?room='+c;
drawLobby();
setTimeout(function(){if(!seated&&!started){var rl=$('roomLink');if(rl)rl.innerText='Host belum terdeteksi - pastikan host membuka halamannya.';}},8000);};console.log('bJoin ok');}

var bCabut=$('bCabut');if(bCabut)bCabut.onclick=function(){if(IS_HOST)doCabut(0);else send({act:'cabut',seat:MY});};
var bMakan=$('bMakan');if(bMakan)bMakan.onclick=function(){if(IS_HOST)doMakan(0);else send({act:'makan',seat:MY});};
var bTurun=$('bTurun');if(bTurun)bTurun.onclick=function(){var card=hands[MY][sel];sel=-1;if(IS_HOST)doTurun(0,card);else send({act:'turun',seat:MY,card:card});};
var bKoa=$('bKoa');if(bKoa)bKoa.onclick=function(){if(IS_HOST)doKoa(0);else send({act:'koa',seat:MY});};
var bSusun=$('bSusun');if(bSusun)bSusun.onclick=function(){hands[MY].sort(function(a,b){return a-b;});sel=-1;render();};
console.log('game buttons ok');

var ovL=$('ovL');
if(ovL){ovL.onclick=function(){if(IS_HOST){for(var i=0;i<4;i++)if(wins[i]>=3)wins=[0,0,0,0];startRound();}else{var ov=$('ov');if(ov)ov.style.display='none';}};}
var ovWA=$('ovWA');
if(ovWA){ovWA.onclick=function(){var ovM=$('ovM');var t='KOA CEKI - LAPAU SOLOK\n';if(ovM)t+=ovM.innerText;t+='\nMainkan: gloryverse.id/ceki';location.href='https://wa.me/?text='+encodeURIComponent(t);};};
console.log('bindButtons done');
}

function init(){
console.log('init start');
try{
if(window.db&&db.auth){
db.auth.getSession().then(function(r){var s=r.data&&r.data.session;
if(s)return db.from('profiles').select('username').eq('id',s.user.id).single().then(function(p){
if(p.data){MYNAME=p.data.username;SEATS[0].n=MYNAME;var n0=$('n0');if(n0)n0.innerText=MYNAME;}
});}).catch(function(){});
}
}catch(e){console.warn('auth err',e);}

try{
var q=new URLSearchParams(location.search).get('room');
if(q){
q=q.toUpperCase();
var isHost=false;
try{isHost=localStorage.getItem('gv_ceki_host')===q;}catch(e){}
if(isHost){
console.log('auto host for room:',q);
SEATS=[{n:MYNAME,bot:false,taken:true,sid:MYSID},{n:'',bot:true},{n:'',bot:true},{n:'',bot:true}];
IS_HOST=true;initRoom(q);
setTimeout(function(){sendLobby();},1500);
var roomBox=$('roomBox'),roomCode=$('roomCode'),roomLink=$('roomLink');
if(roomBox)roomBox.style.display='block';
if(roomCode)roomCode.innerText=q;
if(roomLink)roomLink.innerText='gloryverse.id/ceki?room='+q;
drawLobby();
}else{
console.log('auto join room:',q);
var joinCode=$('joinCode');
if(joinCode)joinCode.value=q;
setTimeout(function(){var bJoin=$('bJoin');if(bJoin)bJoin.onclick();},1000);
}
}
}catch(e){console.warn('url err',e);}

bindButtons();
console.log('v7.3 ready');
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{setTimeout(init,100);}
})();

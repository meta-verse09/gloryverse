/* lapau.js v6 — MINIMALIS (SOLO + UI MABAR) */
(function(){
  'use strict';
  console.log('lapau.js v6 loading...');
  
  // Shim phase
  if(typeof window.phase !== 'function' && typeof window.phaseOf === 'function'){
    window.phase = window.phaseOf;
  }
  
  // Katalog motif
  var FAM = ['HIU','JARUM','SUDUNG','BENGKOK','TALI','PECAH','BATUNG','SISIR','BABI'];
  var VAR = {
    HIU:['Babak','Kucing','Penci','Bunga','Kasut','Panjang'],
    JARUM:['Wajik','Besar','Kecil'],
    SUDUNG:['Putih','Hitam','Pinggang'],
    BENGKOK:['Hitam','Besar','Kecil'],
    TALI:['Merah','Bulat','Kecil'],
    PECAH:['Manik','Delapan','Halus'],
    BATUNG:['Manik','Enam','Kecil'],
    SISIR:['Besar','Kecil','Bendera'],
    BABI:['Pusat','Besar','Kecil']
  };
  var RED = {'HIU/Penci':1,'HIU/Babak':2,'TALI/Merah':1};
  var MID = [];
  FAM.forEach(function(f){
    VAR[f].forEach(function(n){
      MID.push({f:f, n:n, red:RED[f+'/'+n]||0});
    });
  });
  
  // Fungsi SVG kartu
  window.svg = function(m){
    try {
      var M = MID[m];
      var v = VAR[M.f].indexOf(M.n);
      var field = M.red === 2 ? '#8B0000' : '#0a0a0a';
      var W = 'stroke="#f5f0e6" stroke-width="2.5" fill="none"';
      var g = '';
      var i, n, cy;
      
      if(M.f === 'HIU'){
        if(v===0) g = '<path d="M16 24 h28 M16 32 h28 M16 40 h28 M16 100 h28 M16 108 h28 M16 116 h28" '+W+'/>';
        if(v===1) g = '<path d="M20 28 l10 12 -10 12 M30 28 l-10 12 10 12 M20 100 l10 12 -10 12 M30 100 l-10 12 10 12" '+W+'/>';
        if(v===2) g = '<circle cx="30" cy="34" r="8" '+W+'/><circle cx="30" cy="34" r="4" '+W+'/><circle cx="30" cy="106" r="8" '+W+'/><circle cx="30" cy="106" r="4" '+W+'/>';
        if(v===3) g = '<path d="M22 26 v12 h16 v-12 M22 102 v12 h16 v-12" '+W+'/>';
        if(v===4) g = '<rect x="22" y="26" width="16" height="16" '+W+'/><rect x="22" y="98" width="16" height="16" '+W+'/>';
        if(v===5) g = '<path d="M20 24 h20 v8 h-20 M20 108 h20 v8 h-20" '+W+'/>';
      }
      if(M.f === 'JARUM'){
        if(v===0) g = '<path d="M30 22 l14 18 -14 18 -14 -18 z M30 100 l10 14 -10 14 -10 -14 z" '+W+'/>';
        if(v===1) g = '<path d="M30 26 l10 14 -10 14 -10 -14 z M26 60 l4 6 -4 6 -4 -6 z M30 94 l10 14 -10 14 -10 -14 z" '+W+'/>';
        if(v===2) g = '<path d="M30 30 l8 12 -8 12 -8 -12 z M22 66 l8 12 -8 12 -8 -12 z M30 102 l8 12 -8 12 -8 -12 z" '+W+'/>';
      }
      if(M.f === 'SUDUNG'){
        for(i=0;i<3;i++){
          cy = 30 + i*40;
          if(v===0) g += '<circle cx="30" cy="'+cy+'" r="10" '+W+'/><circle cx="30" cy="'+cy+'" r="5" '+W+'/>';
          if(v===1) g += '<circle cx="30" cy="'+cy+'" r="9" '+W+'/>';
          if(v===2) g += '<circle cx="30" cy="'+cy+'" r="8" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>';
        }
      }
      if(M.f === 'BENGKOK'){
        if(v===0) g = '<path d="M20 22 v96 h20" '+W+'/>';
        if(v===1) g = '<path d="M40 22 v96 h-20" '+W+'/>';
        if(v===2) g = '<path d="M20 22 v96 h20 M40 22 v56" '+W+'/>';
      }
      if(M.f === 'TALI'){
        for(i=0;i<3;i++){
          cy = 30 + i*40;
          if(v===0) g += '<circle cx="30" cy="'+cy+'" r="11" '+W+'/><circle cx="30" cy="'+cy+'" r="7" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>';
          if(v===1) g += '<circle cx="30" cy="'+cy+'" r="10" '+W+'/><circle cx="30" cy="'+cy+'" r="4" '+W+'/>';
          if(v===2) g += '<circle cx="30" cy="'+cy+'" r="9" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>';
        }
      }
      if(M.f === 'PECAH'){
        if(v===0){
          g += '<circle cx="22" cy="30" r="6" '+W+'/><circle cx="38" cy="30" r="6" '+W+'/>';
          g += '<circle cx="22" cy="58" r="6" '+W+'/><circle cx="38" cy="58" r="6" '+W+'/>';
          g += '<circle cx="22" cy="86" r="6" '+W+'/><circle cx="38" cy="86" r="6" '+W+'/>';
          g += '<circle cx="30" cy="114" r="6" '+W+'/>';
        }
        if(v===1){
          for(i=0;i<8;i++){
            var cx = 22 + (i%2)*16;
            var cy2 = 26 + Math.floor(i/2)*30;
            g += '<circle cx="'+cx+'" cy="'+cy2+'" r="5" '+W+'/>';
          }
        }
        if(v===2){
          for(i=0;i<12;i++){
            var cx3 = 20 + (i%3)*10;
            var cy3 = 24 + Math.floor(i/3)*24;
            g += '<circle cx="'+cx3+'" cy="'+cy3+'" r="4" '+W+'/>';
          }
        }
      }
      if(M.f === 'BATUNG'){
        if(v===0){
          for(i=0;i<3;i++){
            cy = 28 + i*32;
            g += '<circle cx="24" cy="'+cy+'" r="6" '+W+'/><circle cx="36" cy="'+cy+'" r="6" '+W+'/>';
          }
        }
        if(v===1){
          for(i=0;i<2;i++){
            cy = 34 + i*56;
            g += '<circle cx="24" cy="'+cy+'" r="7" '+W+'/><circle cx="36" cy="'+cy+'" r="7" '+W+'/>';
          }
        }
        if(v===2){
          for(i=0;i<2;i++){
            cy = 38 + i*48;
            g += '<circle cx="24" cy="'+cy+'" r="8" '+W+'/><circle cx="36" cy="'+cy+'" r="8" '+W+'/>';
          }
        }
      }
      if(M.f === 'SISIR'){
        n = v===0 ? 8 : v===1 ? 6 : 5;
        for(i=0;i<n;i++){
          var y = v===0 ? 22+i*14 : v===1 ? 28+i*16 : 30+i*20;
          g += '<path d="M18 '+y+' h24" '+W+'/>';
        }
      }
      if(M.f === 'BABI'){
        if(v===0){
          g += '<circle cx="30" cy="32" r="10" '+W+'/>';
          g += '<rect x="20" y="56" width="20" height="24" '+W+'/>';
          g += '<rect x="20" y="84" width="20" height="24" '+W+'/>';
        }
        if(v===1){
          g += '<rect x="20" y="28" width="20" height="24" '+W+'/>';
          g += '<rect x="20" y="58" width="20" height="24" '+W+'/>';
          g += '<rect x="20" y="88" width="20" height="24" '+W+'/>';
        }
        if(v===2){
          g += '<rect x="20" y="34" width="20" height="20" '+W+'/>';
          g += '<rect x="20" y="62" width="20" height="20" '+W+'/>';
          g += '<rect x="20" y="90" width="20" height="20" '+W+'/>';
        }
      }
      
      var lab = '<text x="30" y="137" font-size="10" fill="#151515" text-anchor="middle" font-family="monospace">' + String(m+1).padStart(2,'0') + '</text>';
      return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><rect x="8" y="8" width="44" height="124" fill="'+field+'"/>'+g+lab+'</svg>';
    } catch(e){
      console.error('svg error:', e);
      return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><text x="30" y="75" text-anchor="middle" font-size="10">ERR</text></svg>';
    }
  };
  
  // State game
  var hands = [[],[],[],[]];
  var disc = [[],[],[],[]];
  var pile = [];
  var turn = 0;
  var fase = 'idle';
  var sel = -1;
  var wins = [0,0,0,0];
  var rid = 0;
  var last = null;
  var over = false;
  var mkT = null;
  
  var SEATS = [
    {n:'Kamu', bot:false},
    {n:'Uni Ros', bot:true},
    {n:'Angku Mansur', bot:true},
    {n:'Buya Datuk', bot:true}
  ];
  
  var IS_HOST = true;
  var MY = 0;
  var MYNAME = 'Kamu';
  
  // Utils
  function $(id){ return document.getElementById(id); }
  
  function cnt(h){
    var c = [];
    for(var i=0;i<30;i++) c[i] = 0;
    h.forEach(function(m){ c[m]++; });
    return c;
  }
  
  function win12(c){
    var t = 0;
    for(var i=0;i<30;i++) t += c[i];
    if(t !== 12) return false;
    for(var p=0;p<30;p++){
      if(c[p] < 2) continue;
      var tr = [];
      for(var m=0;m<30;m++){
        if(c[m] - (m===p?2:0) >= 3) tr.push(m);
      }
      for(var a=0;a<tr.length;a++){
        for(var b=a+1;b<tr.length;b++){
          for(var d=b+1;d<tr.length;d++){
            var cc = c.slice();
            cc[p] -= 2;
            cc[tr[a]] -= 3;
            cc[tr[b]] -= 3;
            cc[tr[d]] -= 3;
            var ok = true, s = 0;
            for(var i=0;i<30;i++){
              if(cc[i] < 0) ok = false;
              s += cc[i];
            }
            if(ok && s === 1) return true;
          }
        }
      }
    }
    return false;
  }
  
  function cokiOf(h){
    var c = cnt(h);
    for(var m=0;m<30;m++){
      c[m]++;
      var w = win12(c);
      c[m]--;
      if(w) return m;
    }
    return -1;
  }
  
  function shuffle(a){
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  
  function stat(t){
    var el = $('stat');
    if(el) el.innerText = t;
  }
  
  function showMakan(v){
    var el = $('bMakan');
    if(el) el.style.display = v ? 'inline-block' : 'none';
  }
  
  // Render
  function render(){
    if(turn === MY && !over && fase === 'draw' && hands[MY].length >= 12){
      fase = 'discard';
    }
    
    var pileEl = $('pile');
    if(pileEl) pileEl.innerText = pile.length;
    
    var lastEl = $('lastD');
    if(lastEl) lastEl.innerHTML = (last !== null) ? svg(last.card) : '';
    
    for(var p=0;p<4;p++){
      var nEl = $('n'+p);
      var sEl = $('s'+p);
      var aEl = $('a'+p);
      var cEl = $('c'+p);
      var dEl = $('d'+p);
      
      if(nEl) nEl.innerText = SEATS[p].n;
      if(sEl) sEl.innerText = '★'.repeat(wins[p]);
      if(aEl) aEl.innerText = SEATS[p].bot ? '' : '';
      if(cEl) cEl.style.display = (cokiOf(hands[p]) >= 0) ? 'block' : 'none';
      if(p !== MY && dEl){
        dEl.innerHTML = disc[p].slice(-4).map(function(){
          return '<span class="mini"></span>';
        }).join('');
      }
    }
    
    var hh = '';
    hands[MY].forEach(function(m, i){
      hh += '<span class="cd' + (i === sel ? ' sel' : '') + '" data-i="' + i + '">' + svg(m) + '</span>';
    });
    
    var handEl = $('hand');
    if(handEl) handEl.innerHTML = hh;
    
    var els = document.querySelectorAll('.cd');
    for(var k=0;k<els.length;k++){
      (function(el){
        el.onclick = function(){
          sel = +el.dataset.i;
          render();
        };
      })(els[k]);
    }
    
    var my = (turn === MY) && !over;
    var bCabut = $('bCabut');
    var bTurun = $('bTurun');
    var bKoa = $('bKoa');
    var bSusun = $('bSusun');
    
    if(bCabut) bCabut.style.display = (my && fase === 'draw') ? 'inline-block' : 'none';
    if(bTurun) bTurun.style.display = (my && fase === 'discard' && sel >= 0) ? 'inline-block' : 'none';
    if(bKoa) bKoa.style.display = (my && fase === 'discard' && win12(cnt(hands[MY]))) ? 'inline-block' : 'none';
    if(bSusun) bSusun.style.display = my ? 'inline-block' : 'none';
    
    if(my && fase === 'draw' && last && cnt(hands[MY])[last.card] >= 2){
      showMakan(true);
    }
    
    if(my){
      stat(fase === 'draw' ? 'Giliranmu: CABUT (atau MAKAN)' : 'Tangan 12: KETUK kartu lalu TURUN');
    }
    
    var info = $('info');
    if(info) info.innerText = 'Tangan: ' + hands[MY].length + ' | Tumpukan: ' + pile.length;
  }
  
  // Game logic
  function startRound(){
    rid++;
    if(mkT) clearTimeout(mkT);
    
    var all = [];
    for(var m=0;m<30;m++){
      for(var c=0;c<6;c++){
        all.push(m);
      }
    }
    
    var deck = shuffle(all);
    hands = [[],[],[],[]];
    disc = [[],[],[],[]];
    pile = deck.slice();
    last = null;
    over = false;
    sel = -1;
    
    for(var i=0;i<11;i++){
      for(var p=0;p<4;p++){
        hands[p].push(pile.pop());
      }
    }
    
    turn = 0;
    fase = 'draw';
    
    var ov = $('ov');
    if(ov) ov.style.display = 'none';
    
    var lobby = $('lobby');
    var game = $('gameArea');
    if(lobby) lobby.style.display = 'none';
    if(game) game.style.display = 'block';
    
    render();
    showMakan(false);
  }
  
  function doCabut(){
    showMakan(false);
    if(mkT) clearTimeout(mkT);
    hands[MY].push(pile.pop());
    fase = 'discard';
    sel = -1;
    render();
  }
  
  function doMakan(){
    if(!last) return;
    showMakan(false);
    if(mkT) clearTimeout(mkT);
    hands[MY].push(last.card);
    disc[last.from].pop();
    last = null;
    turn = MY;
    fase = 'discard';
    render();
  }
  
  function doTurun(){
    if(sel < 0) return;
    var m = hands[MY].splice(sel, 1)[0];
    sel = -1;
    disc[MY].push(m);
    last = {card: m, from: MY};
    fase = 'idle';
    showMakan(false);
    render();
    setTimeout(afterMyDiscard, 600);
  }
  
  function doKoa(){
    endRound(MY, 'KOA!');
  }
  
  function afterMyDiscard(){
    var r = rid;
    for(var b=0;b<4;b++){
      if(b === MY) continue;
      if(SEATS[b].bot && cnt(hands[b])[last.card] >= 2 && Math.random() < 0.5){
        setTimeout(function(){
          if(r !== rid) return;
          hands[b].push(last.card);
          disc[last.from].pop();
          last = null;
          stat(SEATS[b].n + ' MAKAN kartu!');
          botFinish(b);
        }, 700);
        return;
      }
    }
    setTimeout(function(){
      if(r === rid) next();
    }, 600);
  }
  
  function next(){
    turn = (turn + 1) % 4;
    route();
  }
  
  function route(){
    if(SEATS[turn].bot){
      botTurn(turn);
    } else if(turn === MY){
      fase = 'draw';
      render();
    } else {
      fase = 'draw';
      render();
      stat('Giliran ' + SEATS[turn].n + '...');
      setTimeout(function(){
        if(SEATS[turn].bot) botTurn(turn);
        else next();
      }, 1000);
    }
  }
  
  function botTurn(i){
    var r = rid;
    setTimeout(function(){
      if(r !== rid) return;
      if(last && cnt(hands[i])[last.card] >= 2 && Math.random() < 0.6){
        hands[i].push(last.card);
        disc[last.from].pop();
        last = null;
      } else {
        if(pile.length === 0){
          endRound(-1, 'Seri');
          return;
        }
        hands[i].push(pile.pop());
      }
      if(win12(cnt(hands[i]))){
        endRound(i, 'KOA!');
        return;
      }
      botFinish(i);
    }, 900);
  }
  
  function botFinish(i){
    var r = rid;
    var c = cnt(hands[i]);
    var best = null;
    for(var m=0;m<30;m++){
      if(hands[i].indexOf(m) >= 0){
        if(best === null || c[m] < c[best]) best = m;
      }
    }
    if(best === null) best = hands[i][0];
    hands[i].splice(hands[i].indexOf(best), 1);
    disc[i].push(best);
    last = {card: best, from: i};
    render();
    setTimeout(function(){
      if(r !== rid) return;
      if(cnt(hands[MY])[best] >= 2 && turn === MY){
        showMakan(true);
        stat(SEATS[i].n + ' buang ' + MID[best].f + ' - MAKAN?');
        mkT = setTimeout(function(){
          showMakan(false);
          next();
        }, 2500);
      } else {
        next();
      }
    }, 400);
  }
  
  function endRound(w, why){
    over = true;
    rid++;
    if(mkT) clearTimeout(mkT);
    showMakan(false);
    if(w >= 0) wins[w]++;
    var done = (w >= 0 && wins[w] >= 3);
    
    var ovT = $('ovT');
    var ovM = $('ovM');
    var ov = $('ov');
    
    if(ovT){
      if(w === MY){
        ovT.innerText = 'KAMU SAMPAI!';
      } else if(w >= 0){
        ovT.innerText = SEATS[w].n + ' SAMPAI - Kamu Kalah';
      } else {
        ovT.innerText = 'SERI';
      }
    }
    
    var msg = '';
    if(done && w >= 0){
      msg = 'JUARA: ' + SEATS[w].n + ' | ';
    }
    msg += 'Skor: ' + wins.join(' - ');
    if(w !== MY && w >= 0){
      msg += ' | Awak coki duluan, urang yang sampai';
    }
    if(ovM) ovM.innerText = msg;
    if(ov) ov.style.display = 'flex';
    render();
  }
  
  // Binding tombol
  function bindButtons(){
    console.log('Binding tombol...');
    
    try {
      var bSolo = $('bSolo');
      if(bSolo){
        bSolo.onclick = function(){
          console.log('SOLO clicked');
          IS_HOST = true;
          SEATS = [
            {n: MYNAME, bot: false},
            {n: 'Uni Ros', bot: true},
            {n: 'Angku Mansur', bot: true},
            {n: 'Buya Datuk', bot: true}
          ];
          startRound();
        };
        console.log('bSolo bound');
      }
    } catch(e){ console.error('bSolo error:', e); }
    
    try {
      var bBuat = $('bBuat');
      if(bBuat){
        bBuat.onclick = function(){
          console.log('BUAT MEJA clicked');
          var code = Math.random().toString(36).slice(2,6).toUpperCase();
          try { localStorage.setItem('gv_ceki_host', code); } catch(e){}
          var roomBox = $('roomBox');
          var roomCode = $('roomCode');
          var roomLink = $('roomLink');
          var seatList = $('seatList');
          if(roomBox) roomBox.style.display = 'block';
          if(roomCode) roomCode.innerText = code;
          if(roomLink) roomLink.innerText = 'gloryverse.id/ceki?room=' + code;
          if(seatList){
            seatList.innerHTML = '<span class="chip">' + MYNAME + '</span> <span class="chip">kosong</span> <span class="chip">kosong</span> <span class="chip">kosong</span>';
          }
          console.log('Room created:', code);
        };
        console.log('bBuat bound');
      }
    } catch(e){ console.error('bBuat error:', e); }
    
    try {
      var bStart = $('bStart');
      if(bStart){
        bStart.onclick = function(){
          console.log('MULAI clicked');
          startRound();
        };
        console.log('bStart bound');
      }
    } catch(e){ console.error('bStart error:', e); }
    
    try {
      var bJoin = $('bJoin');
      if(bJoin){
        bJoin.onclick = function(){
          var codeEl = $('joinCode');
          if(!codeEl) return;
          var c = codeEl.value.trim().toUpperCase();
          if(!c){ alert('Masukkan kode meja!'); return; }
          console.log('GABUNG:', c);
          alert('Fitur mabar realtime akan segera hadir!');
        };
        console.log('bJoin bound');
      }
    } catch(e){ console.error('bJoin error:', e); }
    
    try {
      var bCabut = $('bCabut');
      if(bCabut) bCabut.onclick = doCabut;
      var bMakan = $('bMakan');
      if(bMakan) bMakan.onclick = doMakan;
      var bTurun = $('bTurun');
      if(bTurun) bTurun.onclick = doTurun;
      var bKoa = $('bKoa');
      if(bKoa) bKoa.onclick = doKoa;
      var bSusun = $('bSusun');
      if(bSusun) bSusun.onclick = function(){
        hands[MY].sort(function(a,b){ return a-b; });
        sel = -1;
        render();
      };
      console.log('Game buttons bound');
    } catch(e){ console.error('Game buttons error:', e); }
    
    try {
      var ovL = $('ovL');
      if(ovL){
        ovL.onclick = function(){
          if(wins.some(function(w){ return w >= 3; })){
            wins = [0,0,0,0];
          }
          var ov = $('ov');
          if(ov) ov.style.display = 'none';
          var lobby = $('lobby');
          var game = $('gameArea');
          if(lobby) lobby.style.display = 'block';
          if(game) game.style.display = 'none';
        };
      }
      var ovWA = $('ovWA');
      if(ovWA){
        ovWA.onclick = function(){
          var ovM = $('ovM');
          var text = 'KOA CEKI - LAPAU SOLOK\n';
          if(ovM) text += ovM.innerText;
          text += '\nMainkan: gloryverse.id/ceki';
          var t = encodeURIComponent(text);
          location.href = 'https://wa.me/?text=' + t;
        };
      }
      console.log('Overlay buttons bound');
    } catch(e){ console.error('Overlay buttons error:', e); }
    
    console.log('Semua tombol terikat!');
  }
  
  // Init
  function init(){
    console.log('lapau.js v6 init...');
    
    // Ambil nama user
    try {
      if(window.db && db.auth){
        db.auth.getSession().then(function(r){
          var s = r.data && r.data.session;
          if(s){
            return db.from('profiles').select('username').eq('id', s.user.id).single().then(function(p){
              if(p.data){
                MYNAME = p.data.username;
                SEATS[0].n = MYNAME;
                var n0 = $('n0');
                if(n0) n0.innerText = MYNAME;
              }
            });
          }
        }).catch(function(){});
      }
    } catch(e){ console.warn('auth error:', e); }
    
    bindButtons();
    console.log('lapau.js v6 ready!');
  }
  
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }
})();

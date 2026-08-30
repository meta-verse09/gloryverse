(function(){
'use strict';
console.log('War zone loading...');

var currentUser = null;
var currentWar = null;
var myRank = null;
var myVehicles = [];
var battleInterval = null;

function $(id){return document.getElementById(id);}

function init(){
  console.log('War init...');
  checkAuth();
  
  $('btnAttack').onclick = attack;
  $('btnJoin').onclick = joinWar;
  $('btnVehicles').onclick = showVehicles;
  
  // Auto refresh setiap 10 detik
  setInterval(loadWarData, 10000);
}

function checkAuth(){
  if(!window.db || !db.auth){
    alert('Database not connected');
    return;
  }
  db.auth.getSession().then(function(r){
    var session = r.data.session;
    if(!session){
      alert('Silakan login');
      window.location.href = 'login.html';
      return;
    }
    currentUser = session.user;
    loadWarData();
    loadMyMilitary();
  }).catch(function(e){
    console.error('Auth error:', e);
  });
}

async function loadWarData(){
  try{
    // Get active war
    var {data:wars, error} = await db.from('wars')
      .select('*')
      .eq('status', 'active')
      .order('started_at', {ascending:false})
      .limit(1);
    
    if(error) throw error;
    
    if(!wars || wars.length === 0){
      // No active war, create demo war
      await createDemoWar();
      return;
    }
    
    currentWar = wars[0];
    updateWarDisplay();
    await loadParticipants();
    updateProgressBar();
    
  }catch(e){
    console.error('Load war error:', e);
  }
}

async function createDemoWar(){
  var {data, error} = await db.from('wars').insert({
    attacker_country: 'Belgium',
    defender_country: 'Maldives',
    region: 'Middelburg',
    status: 'active',
    war_fund_gold: 1000
  }).select().single();
  
  if(error){
    console.error('Create war error:', error);
    return;
  }
  
  currentWar = data;
  updateWarDisplay();
}

function updateWarDisplay(){
  $('warTitle').innerText = currentWar.attacker_country + ' vs ' + currentWar.defender_country;
  $('warRegion').innerText = 'Region: ' + (currentWar.region || '-');
  
  // Timer
  var startTime = new Date(currentWar.started_at);
  updateTimer(startTime);
  if(battleInterval) clearInterval(battleInterval);
  battleInterval = setInterval(function(){updateTimer(startTime);}, 1000);
}

function updateTimer(startTime){
  var now = new Date();
  var diff = now - startTime;
  var hours = Math.floor(diff / 3600000);
  var minutes = Math.floor((diff % 3600000) / 60000);
  var seconds = Math.floor((diff % 60000) / 1000);
  $('warTimer').innerText = 
    String(hours).padStart(2,'0') + ':' + 
    String(minutes).padStart(2,'0') + ':' + 
    String(seconds).padStart(2,'0');
}

async function loadParticipants(){
  try{
    var {data, error} = await db.from('battle_participants')
      .select('*, user_military(current_rank_id), profiles(username, avatar_url)')
      .eq('war_id', currentWar.id)
      .order('damage_dealt', {ascending:false});
    
    if(error) throw error;
    
    var attackers = (data||[]).filter(function(p){return p.side==='attacker';});
    var defenders = (data||[]).filter(function(p){return p.side==='defender';});
    
    renderParticipantList('attackerList', attackers);
    renderParticipantList('defenderList', defenders);
    
    // Update stats
    var attDamage = attackers.reduce(function(s,p){return s+(p.damage_dealt||0);},0);
    var defDamage = defenders.reduce(function(s,p){return s+(p.damage_dealt||0);},0);
    
    $('attackerDamage').innerText = formatNumber(attDamage);
    $('defenderDamage').innerText = formatNumber(defDamage);
    $('attackerCount').innerText = attackers.length;
    $('defenderCount').innerText = defenders.length;
    
    currentWar.total_damage_attacker = attDamage;
    currentWar.total_damage_defender = defDamage;
    
  }catch(e){
    console.error('Load participants error:', e);
  }
}

function renderParticipantList(elementId, participants){
  var container = $(elementId);
  if(!participants || participants.length===0){
    container.innerHTML = '<div class="empty">No participants yet</div>';
    return;
  }
  
  var html = '';
  participants.slice(0,10).forEach(function(p){
    var rank = p.user_military && p.user_military.current_rank ? p.user_military.current_rank.rank_name : 'Recruit';
    var username = p.profiles ? p.profiles.username : 'Player';
    var avatar = p.profiles ? p.profiles.avatar_url : null;
    var initial = username ? username[0].toUpperCase() : '?';
    
    html += '<div class="participant-item">';
    html += '<div class="participant-avatar">' + initial + '</div>';
    html += '<div class="participant-info">';
    html += '<div class="participant-name">' + esc(username) + ' <span class="rank-badge" style="background:#f59e0b;color:#000">' + esc(rank) + '</span></div>';
    html += '<div class="participant-damage">Damage: ' + formatNumber(p.damage_dealt||0) + '</div>';
    html += '</div>';
    html += '<div class="participant-percent">' + (p.damage_dealt>0 ? ((p.damage_dealt/currentWar.total_damage_attacker)*100).toFixed(1) + '%' : '-') + '</div>';
    html += '</div>';
  });
  
  container.innerHTML = html;
}

function updateProgressBar(){
  var att = currentWar.total_damage_attacker || 0;
  var def = currentWar.total_damage_defender || 0;
  var total = att + def;
  
  if(total === 0){
    $('progressAttacker').style.width = '50%';
    $('progressDefender').style.width = '50%';
    $('progressText').innerText = '50% - 50%';
    return;
  }
  
  var attPercent = (att/total*100).toFixed(1);
  var defPercent = (def/total*100).toFixed(1);
  
  $('progressAttacker').style.width = attPercent + '%';
  $('progressDefender').style.width = defPercent + '%';
  $('progressText').innerText = attPercent + '% - ' + defPercent + '%';
}

async function attack(){
  if(!currentWar){
    alert('No active war');
    return;
  }
  
  // Check if user joined
  var {data:participant} = await db.from('battle_participants')
    .select('*')
    .eq('war_id', currentWar.id)
    .eq('user_id', currentUser.id)
    .single();
  
  if(!participant){
    alert('Join the war first!');
    return;
  }
  
  // Calculate damage based on rank and vehicles
  var baseDamage = 1000;
  var rankBonus = myRank ? myRank.damage_multiplier : 1.0;
  var vehicleBonus = myVehicles.reduce(function(s,v){return s+(v.attack_power||0);},0);
  var totalDamage = Math.floor(baseDamage * rankBonus + vehicleBonus);
  
  // Update damage
  var newDamage = (participant.damage_dealt||0) + totalDamage;
  var {error} = await db.from('battle_participants')
    .update({damage_dealt: newDamage})
    .eq('id', participant.id);
  
  if(error){
    alert('Attack failed: ' + error.message);
    return;
  }
  
  alert('Attack successful! Damage dealt: ' + formatNumber(totalDamage));
  loadWarData();
}

async function joinWar(){
  if(!currentWar){
    alert('No active war');
    return;
  }
  
  // Check if already joined
  var {data:existing} = await db.from('battle_participants')
    .select('*')
    .eq('war_id', currentWar.id)
    .eq('user_id', currentUser.id)
    .single();
  
  if(existing){
    alert('You already joined this war!');
    return;
  }
  
  // Let user choose side
  var side = prompt('Choose side: attacker or defender', 'attacker');
  if(!side || (side!=='attacker' && side!=='defender')){
    alert('Invalid side');
    return;
  }
  
  var {error} = await db.from('battle_participants').insert({
    war_id: currentWar.id,
    user_id: currentUser.id,
    side: side,
    damage_dealt: 0
  });
  
  if(error){
    alert('Join failed: ' + error.message);
    return;
  }
  
  alert('Joined war as ' + side + '!');
  loadWarData();
}

async function loadMyMilitary(){
  try{
    var {data, error} = await db.from('user_military')
      .select('*, military_ranks(rank_name, rank_level, badge_icon)')
      .eq('user_id', currentUser.id)
      .single();
    
    if(error || !data){
      // Create new military profile
      var {data:newData} = await db.from('user_military').insert({
        user_id: currentUser.id,
        current_rank_id: 1,
        total_medals: 0,
        total_damage: 0
      }).select('*, military_ranks(rank_name, rank_level)').single();
      data = newData;
    }
    
    myRank = data.military_ranks;
    
    // Load vehicles
    var {data:vehicles} = await db.from('battle_participants')
      .select('military_vehicles_used')
      .eq('user_id', currentUser.id)
      .eq('war_id', currentWar ? currentWar.id : 0);
    
    myVehicles = vehicles || [];
    
    displayMyStatus(data);
    
  }catch(e){
    console.error('Load military error:', e);
  }
}

function displayMyStatus(data){
  var html = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">';
  html += '<div><div style="color:var(--mut);font-size:12px">Rank</div><div style="font-weight:bold;color:var(--gold)">' + (myRank ? myRank.rank_name : 'Recruit') + '</div></div>';
  html += '<div><div style="color:var(--mut);font-size:12px">Medals</div><div style="font-weight:bold">' + formatNumber(data.total_medals||0) + '</div></div>';
  html += '<div><div style="color:var(--mut);font-size:12px">Total Damage</div><div style="font-weight:bold">' + formatNumber(data.total_damage||0) + '</div></div>';
  html += '<div><div style="color:var(--mut);font-size:12px">Wars</div><div style="font-weight:bold">' + (data.wars_participated||0) + '</div></div>';
  html += '<div><div style="color:var(--mut);font-size:12px">Victories</div><div style="font-weight:bold">' + (data.victories||0) + '</div></div>';
  html += '<div><div style="color:var(--mut);font-size:12px">Vehicles</div><div style="font-weight:bold">' + myVehicles.length + '</div></div>';
  html += '</div>';
  
  $('myStatus').innerHTML = html;
}

function showVehicles(){
  alert('Vehicle system - coming soon!\n\nAvailable vehicles:\n- Infantry (Free)\n- Light Tank (1000 gold)\n- Heavy Tank (2500 gold)\n- Fighter Jet (5000 gold)\n- Bomber (8000 gold)\n- Helicopter (3000 gold)\n- Missile Launcher (15000 gold)');
}

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function formatNumber(n){return (n||0).toLocaleString('id-ID');}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{setTimeout(init,100);}
})();

(function(){
'use strict';
console.log('Owner dashboard loading...');

var OWNER_IDS = ['YOUR_USER_ID_HERE']; // Ganti dengan user ID kamu
var currentUser = null;
var allUsers = [];
var allTickets = [];
var charts = {};

function $(id){return document.getElementById(id);}

function init(){
  console.log('Owner init...');
  
  // Tab switching
  document.querySelectorAll('.tab').forEach(function(tab){
    tab.onclick = function(){
      document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});
      document.querySelectorAll('.tab-content').forEach(function(c){c.classList.remove('active');});
      tab.classList.add('active');
      $('tab-'+tab.dataset.tab).classList.add('active');
    };
  });
  
  // Search & filters
  if($('userSearch'))$('userSearch').oninput = filterUsers;
  if($('ticketFilter'))$('ticketFilter').onchange = filterTickets;
  
  // Quick actions
  if($('btnRefresh'))$('btnRefresh').onclick = loadAllData;
  if($('btnClearCache'))$('btnClearCache').onclick = function(){alert('Cache cleared (simulated)');};
  if($('btnExport'))$('btnExport').onclick = exportData;
  
  // Modal
  if($('modalCancel'))$('modalCancel').onclick = closeModal;
  
  // Auth check
  checkAuth();
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
    
    // Check if owner (temporary: allow all logged in users for testing)
    // Nanti bisa diganti: if(OWNER_IDS.indexOf(currentUser.id)===-1){alert('Access denied');return;}
    
    $('adminInfo').innerText = 'Admin: ' + (currentUser.email || currentUser.id.slice(0,8));
    loadAllData();
    
    // Auto refresh setiap 30 detik
    setInterval(loadAllData, 30000);
  }).catch(function(e){
    console.error('Auth error:', e);
  });
}

async function loadAllData(){
  console.log('Loading all data...');
  try{
    await Promise.all([
      loadUsers(),
      loadTickets(),
      loadStats(),
      loadCharts()
    ]);
    $('lastUpdate').innerText = 'Updated: ' + new Date().toLocaleTimeString('id-ID');
    console.log('All data loaded');
  }catch(e){
    console.error('Load error:', e);
  }
}

async function loadUsers(){
  try{
    var {data, error} = await db.from('profiles').select('*').order('created_at',{ascending:false}).limit(100);
    if(error) throw error;
    allUsers = data || [];
    renderUserTable(allUsers);
    console.log('Users loaded:', allUsers.length);
  }catch(e){
    console.error('Load users error:', e);
    $('userTableBody').innerHTML = '<tr><td colspan="7" class="empty">Error loading users</td></tr>';
  }
}

function renderUserTable(users){
  var tbody = $('userTableBody');
  if(!users || users.length===0){
    tbody.innerHTML = '<tr><td colspan="7" class="empty">No users found</td></tr>';
    return;
  }
  var html = '';
  users.forEach(function(u){
    var status = u.is_banned ? '<span class="badge banned">Banned</span>' : '<span class="badge online">Active</span>';
    var joined = u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-';
    html += '<tr>';
    html += '<td><b>'+esc(u.username||'-')+'</b><br><small style="color:var(--mut)">'+(u.email||u.id.slice(0,8))+'</small></td>';
    html += '<td>'+(u.level||1)+'</td>';
    html += '<td>'+(u.coins||0)+'</td>';
    html += '<td>'+(u.energy||100)+'</td>';
    html += '<td>'+status+'</td>';
    html += '<td>'+joined+'</td>';
    html += '<td>';
    if(!u.is_banned){
      html += '<button class="btn-sm btn-danger" onclick="window.ownerActions.ban(\''+u.id+'\',\''+esc(u.username)+'\')">Ban</button>';
    }else{
      html += '<button class="btn-sm btn-success" onclick="window.ownerActions.unban(\''+u.id+'\')">Unban</button>';
    }
    html += '<button class="btn-sm btn-info" onclick="window.ownerActions.viewUser(\''+u.id+'\')">View</button>';
    html += '</td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

function filterUsers(){
  var q = ($('userSearch').value||'').toLowerCase();
  var filtered = allUsers.filter(function(u){
    return (u.username||'').toLowerCase().indexOf(q)!==-1;
  });
  renderUserTable(filtered);
}

async function loadTickets(){
  try{
    var {data, error} = await db.from('support_tickets').select('*').order('created_at',{ascending:false});
    if(error) throw error;
    allTickets = data || [];
    renderTicketTable(allTickets);
  }catch(e){
    console.error('Load tickets error:', e);
    $('ticketTableBody').innerHTML = '<tr><td colspan="6" class="empty">Error loading tickets</td></tr>';
  }
}

function renderTicketTable(tickets){
  var tbody = $('ticketTableBody');
  if(!tickets || tickets.length===0){
    tbody.innerHTML = '<tr><td colspan="6" class="empty">No tickets</td></tr>';
    return;
  }
  var html = '';
  tickets.forEach(function(t){
    var status = t.status==='resolved' ? '<span class="badge resolved">Resolved</span>' : '<span class="badge open">Open</span>';
    var created = t.created_at ? new Date(t.created_at).toLocaleDateString('id-ID') : '-';
    html += '<tr>';
    html += '<td>#'+t.id+'</td>';
    html += '<td>'+(t.user_id||'-').slice(0,8)+'</td>';
    html += '<td><b>'+esc(t.subject||'-')+'</b></td>';
    html += '<td>'+status+'</td>';
    html += '<td>'+created+'</td>';
    html += '<td>';
    if(t.status!=='resolved'){
      html += '<button class="btn-sm btn-success" onclick="window.ownerActions.resolveTicket('+t.id+')">Resolve</button>';
    }
    html += '<button class="btn-sm btn-info" onclick="window.ownerActions.viewTicket('+t.id+')">View</button>';
    html += '</td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

function filterTickets(){
  var f = $('ticketFilter').value;
  var filtered = f==='all' ? allTickets : allTickets.filter(function(t){return t.status===f;});
  renderTicketTable(filtered);
}

async function loadStats(){
  try{
    // Total users
    var {count: userCount} = await db.from('profiles').select('*',{count:'exact',head:true});
    $('statUsers').innerText = userCount || 0;
    
    // Online (last seen < 5 menit)
    var fiveMinAgo = new Date(Date.now()-5*60*1000).toISOString();
    var {count: onlineCount} = await db.from('profiles').select('*',{count:'exact',head:true}).gte('last_seen', fiveMinAgo);
    $('statOnline').innerText = onlineCount || 0;
    if(userCount>0){
      $('statOnlinePct').innerText = Math.round((onlineCount||0)/userCount*100) + '% of total';
    }
    
    // Total coins
    var {data: coinData} = await db.from('profiles').select('coins');
    var totalCoins = (coinData||[]).reduce(function(s,u){return s+(u.coins||0);},0);
    $('statCoins').innerText = formatNumber(totalCoins);
    
    // Games (ceki_msg count)
    var {count: gameCount} = await db.from('ceki_msg').select('*',{count:'exact',head:true});
    $('statGames').innerText = formatNumber(gameCount || 0);
    
    // Banned
    var {count: bannedCount} = await db.from('banned_users').select('*',{count:'exact',head:true});
    $('statBanned').innerText = bannedCount || 0;
    
    // Open tickets
    var {count: ticketCount} = await db.from('support_tickets').select('*',{count:'exact',head:true}).eq('status','open');
    $('statTickets').innerText = ticketCount || 0;
    
  }catch(e){
    console.error('Stats error:', e);
  }
}

async function loadCharts(){
  try{
    // User growth (7 hari)
    var days = [];
    var userCounts = [];
    var gameCounts = [];
    for(var i=6;i>=0;i--){
      var d = new Date();
      d.setDate(d.getDate()-i);
      var dateStr = d.toISOString().split('T')[0];
      days.push(d.toLocaleDateString('id-ID',{weekday:'short'}));
      
      var {count} = await db.from('profiles').select('*',{count:'exact',head:true}).lte('created_at', dateStr+'T23:59:59');
      userCounts.push(count||0);
      
      var {count: gc} = await db.from('ceki_msg').select('*',{count:'exact',head:true}).lte('created_at', dateStr+'T23:59:59');
      gameCounts.push(gc||0);
    }
    
    renderChart('chartUsers','line',days,userCounts,'#f2b705','Users');
    renderChart('chartGames','bar',days,gameCounts,'#22c55e','Games');
    
    // Coin distribution
    var {data: profiles} = await db.from('profiles').select('coins').order('coins',{ascending:false}).limit(50);
    var ranges = {'0-100':0,'101-500':0,'501-1000':0,'1001-5000':0,'5000+':0};
    (profiles||[]).forEach(function(p){
      var c = p.coins||0;
      if(c<=100) ranges['0-100']++;
      else if(c<=500) ranges['101-500']++;
      else if(c<=1000) ranges['501-1000']++;
      else if(c<=5000) ranges['1001-5000']++;
      else ranges['5000+']++;
    });
    renderChart('chartCoins','doughnut',Object.keys(ranges),Object.values(ranges),['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7'],'Players');
    
  }catch(e){
    console.error('Charts error:', e);
  }
}

function renderChart(id,type,labels,data,color,label){
  if(charts[id]) charts[id].destroy();
  var ctx = document.getElementById(id);
  if(!ctx) return;
  charts[id] = new Chart(ctx,{
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: type==='doughnut' ? color : color+'88',
        borderColor: color,
        borderWidth: 2,
        fill: type==='line'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {labels:{color:'#e8ecf8'}}
      },
      scales: type!=='doughnut' ? {
        x: {ticks:{color:'#8b96b5'},grid:{color:'#243055'}},
        y: {ticks:{color:'#8b96b5'},grid:{color:'#243055'}}
      } : {}
    }
  });
}

// Utility
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function formatNumber(n){return (n||0).toLocaleString('id-ID');}

// Expose actions to window for inline onclick
window.ownerActions = {
  ban: function(userId, username){
    openModal('Ban User: '+username,
      '<textarea id="banReason" placeholder="Alasan ban..." rows="3"></textarea>',
      function(){
        var reason = $('banReason').value;
        db.from('banned_users').insert({user_id:userId, reason:reason, banned_by:currentUser.id}).then(function(){
          return db.from('profiles').update({is_banned:true}).eq('id',userId);
        }).then(function(){
          alert('User banned');
          closeModal();
          loadAllData();
        }).catch(function(e){alert('Error: '+e.message);});
      }
    );
  },
  unban: function(userId){
    if(!confirm('Unban user ini?')) return;
    db.from('banned_users').delete().eq('user_id',userId).then(function(){
      return db.from('profiles').update({is_banned:false}).eq('id',userId);
    }).then(function(){
      alert('User unbanned');
      loadAllData();
    }).catch(function(e){alert('Error: '+e.message);});
  },
  viewUser: function(userId){
    var u = allUsers.find(function(x){return x.id===userId;});
    if(!u){alert('User not found');return;}
    openModal('User: '+u.username,
      '<div style="line-height:1.8">'+
      '<b>ID:</b> '+u.id+'<br>'+
      '<b>Email:</b> '+(u.email||'-')+'<br>'+
      '<b>Level:</b> '+(u.level||1)+'<br>'+
      '<b>Coins:</b> '+(u.coins||0)+'<br>'+
      '<b>Energy:</b> '+(u.energy||100)+'<br>'+
      '<b>Joined:</b> '+new Date(u.created_at).toLocaleString('id-ID')+'<br>'+
      '<b>Last Seen:</b> '+(u.last_seen?new Date(u.last_seen).toLocaleString('id-ID'):'-')+'<br>'+
      '</div>',
      null, true
    );
  },
  resolveTicket: function(ticketId){
    if(!confirm('Resolve ticket ini?')) return;
    db.from('support_tickets').update({status:'resolved',resolved_at:new Date().toISOString()}).eq('id',ticketId).then(function(){
      alert('Ticket resolved');
      loadAllData();
    }).catch(function(e){alert('Error: '+e.message);});
  },
  viewTicket: function(ticketId){
    var t = allTickets.find(function(x){return x.id===ticketId;});
    if(!t){alert('Ticket not found');return;}
    openModal('Ticket #'+t.id,
      '<div style="line-height:1.8">'+
      '<b>Subject:</b> '+esc(t.subject)+'<br>'+
      '<b>Message:</b><br><div style="background:var(--bg);padding:10px;border-radius:6px;margin:8px 0">'+esc(t.message)+'</div>'+
      '<b>Status:</b> '+t.status+'<br>'+
      '<b>Created:</b> '+new Date(t.created_at).toLocaleString('id-ID')+'<br>'+
      (t.admin_note?'<b>Admin Note:</b> '+esc(t.admin_note)+'<br>':'')+
      '</div>'+
      '<textarea id="adminNote" placeholder="Tambah catatan admin..." rows="3">'+(t.admin_note||'')+'</textarea>',
      function(){
        var note = $('adminNote').value;
        db.from('support_tickets').update({admin_note:note}).eq('id',ticketId).then(function(){
          alert('Note saved');
          closeModal();
          loadAllData();
        }).catch(function(e){alert('Error: '+e.message);});
      }
    );
  }
};

function openModal(title, bodyHtml, onConfirm, readOnly){
  $('modalTitle').innerText = title;
  $('modalBody').innerHTML = bodyHtml;
  $('modal').classList.add('show');
  if(onConfirm && !readOnly){
    $('modalConfirm').style.display = 'block';
    $('modalConfirm').onclick = onConfirm;
  }else{
    $('modalConfirm').style.display = 'none';
  }
}

function closeModal(){
  $('modal').classList.remove('show');
}

function exportData(){
  var data = {
    users: allUsers,
    tickets: allTickets,
    exportedAt: new Date().toISOString()
  };
  var blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'gloryverse_export_'+Date.now()+'.json';
  a.click();
  URL.revokeObjectURL(url);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{setTimeout(init,100);}
})();

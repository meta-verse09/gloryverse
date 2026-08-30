(function(){
  'use strict';
  console.log('Profile page loaded');

  var currentUser = null;
  var selectedAvatar = null;
  var avatars = [
    {id:'default',url:'avatars/default.png',name:'Default'},
    {id:'warrior',url:'avatars/warrior.png',name:'Warrior'},
    {id:'mage',url:'avatars/mage.png',name:'Mage'},
    {id:'archer',url:'avatars/archer.png',name:'Archer'},
    {id:'ninja',url:'avatars/ninja.png',name:'Ninja'},
    {id:'knight',url:'avatars/knight.png',name:'Knight'},
    {id:'pirate',url:'avatars/pirate.png',name:'Pirate'},
    {id:'samurai',url:'avatars/samurai.png',name:'Samurai'},
    {id:'viking',url:'avatars/viking.png',name:'Viking'},
    {id:'pharaoh',url:'avatars/pharaoh.png',name:'Pharaoh'},
    {id:'dragon',url:'avatars/dragon.png',name:'Dragon'},
    {id:'demon',url:'avatars/demon.png',name:'Demon'}
  ];

  function $(id){return document.getElementById(id);}

  function init(){
    console.log('Profile init...');
    loadAvatars();
    loadUserData();
    
    $('btnSave').onclick = saveAvatar;
  }

  function loadAvatars(){
    var grid = $('avatarGrid');
    grid.innerHTML = '';
    
    avatars.forEach(function(av){
      var div = document.createElement('div');
      div.className = 'avatar-item';
      div.dataset.id = av.id;
      div.innerHTML = '<img src="'+av.url+'" alt="'+av.name+'">';
      div.onclick = function(){selectAvatar(av.id);};
      grid.appendChild(div);
    });
  }

  function selectAvatar(id){
    selectedAvatar = id;
    
    // Update visual
    document.querySelectorAll('.avatar-item').forEach(function(el){
      el.classList.remove('active');
    });
    document.querySelector('[data-id="'+id+'"]').classList.add('active');
    
    // Update preview
    var av = avatars.find(function(a){return a.id===id;});
    if(av){
      $('previewImg').src = av.url;
    }
  }

  function loadUserData(){
    if(!window.db || !db.auth){
      console.error('No db');
      return;
    }
    
    db.auth.getSession().then(function(r){
      var session = r.data.session;
      if(!session){
        console.error('No session');
        return;
      }
      
      currentUser = session.user;
      
      // Load profile data
      db.from('profiles').select('*').eq('id', currentUser.id).single().then(function(p){
        if(p.data){
          $('displayUsername').innerText = p.data.username || 'Player';
          $('userLevel').innerText = p.data.level || 1;
          $('userCoin').innerText = p.data.coins || 0;
          $('userEnergy').innerText = p.data.energy || 100;
          $('memberSince').innerText = p.data.created_at ? new Date(p.data.created_at).toLocaleDateString('id-ID') : '-';
          
          // Load current avatar
          if(p.data.avatar_url){
            selectAvatar(p.data.avatar_url);
          } else {
            selectAvatar('default');
          }
        }
      });
      
      // Load stats from other tables if exist
      db.from('player_stats').select('*').eq('user_id', currentUser.id).single().then(function(s){
        if(s.data){
          if(s.data.level) $('userLevel').innerText = s.data.level;
          if(s.data.coins) $('userCoin').innerText = s.data.coins;
          if(s.data.energy) $('userEnergy').innerText = s.data.energy;
        }
      }).catch(function(){});
      
    }).catch(function(e){
      console.error('Auth error:', e);
    });
  }

  function saveAvatar(){
    if(!currentUser){
      alert('Please login first');
      return;
    }
    
    if(!selectedAvatar){
      alert('Pilih avatar dulu!');
      return;
    }
    
    var btn = $('btnSave');
    btn.disabled = true;
    btn.innerText = 'Menyimpan...';
    
    // Update profiles table
    db.from('profiles').update({
      avatar_url: selectedAvatar,
      updated_at: new Date().toISOString()
    }).eq('id', currentUser.id).then(function(r){
      if(r.error){
        console.error('Update error:', r.error);
        alert('Gagal menyimpan: ' + r.error.message);
      } else {
        // Save to avatar history
        db.from('player_avatars').insert({
          user_id: currentUser.id,
          avatar_url: selectedAvatar,
          is_active: true
        }).then(function(){
          alert('Avatar berhasil disimpan!');
          console.log('Avatar saved:', selectedAvatar);
        }).catch(function(e){
          console.warn('Avatar history error:', e);
        });
      }
    }).catch(function(e){
      console.error('Error:', e);
      alert('Terjadi kesalahan');
    }).finally(function(){
      btn.disabled = false;
      btn.innerText = 'SIMPAN AVATAR';
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }
})();

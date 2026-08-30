(function(){
  'use strict';
  console.log('Profile page loaded');

  var currentUser = null;
  var currentAvatar = null;
  var selectedFile = null;
  var uploadPreviewUrl = null;

  function $(id){return document.getElementById(id);}

  function init(){
    console.log('Profile init...');
    loadUserData();
    
    $('uploadArea').onclick = function(){$('fileInput').click();};
    $('fileInput').onchange = handleFileSelect;
    $('btnSave').onclick = saveAvatar;
    $('btnRemove').onclick = removeAvatar;
  }

  function loadUserData(){
    if(!window.db || !db.auth){
      console.error('No db');
      return;
    }
    
    db.auth.getSession().then(function(r){
      var session = r.data.session;
      if(!session){
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
      }
      
      currentUser = session.user;
      
      // Load profile data
      db.from('profiles').select('*').eq('id', currentUser.id).single().then(function(p){
        if(p.data){
          var username = p.data.username || 'Player';
          $('displayUsername').innerText = username;
          $('userLevel').innerText = p.data.level || 1;
          $('userCoin').innerText = p.data.coins || 0;
          $('userEnergy').innerText = p.data.energy || 100;
          
          // Set default avatar (initials)
          var initials = username.split(' ').map(function(n){return n[0];}).join('').toUpperCase().slice(0,2);
          $('defaultAvatar').innerText = initials;
          
          // Check if has custom avatar
          if(p.data.avatar_url && p.data.avatar_url !== 'default'){
            currentAvatar = p.data.avatar_url;
            showCustomAvatar(p.data.avatar_url);
          } else {
            currentAvatar = 'default';
            showDefaultAvatar();
          }
        }
      }).catch(function(e){
        console.error('Load profile error:', e);
      });
      
    }).catch(function(e){
      console.error('Auth error:', e);
    });
  }

  function handleFileSelect(e){
    var file = e.target.files[0];
    if(!file) return;
    
    // Validate
    if(file.size > 2 * 1024 * 1024){
      alert('File terlalu besar! Max 2MB');
      return;
    }
    if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
      alert('Format file harus JPG atau PNG');
      return;
    }
    
    selectedFile = file;
    
    // Show preview
    var reader = new FileReader();
    reader.onload = function(e){
      $('uploadPreview').src = e.target.result;
      $('previewContainer').style.display = 'block';
      $('uploadArea').classList.add('has-file');
      $('uploadArea').querySelector('.upload-text').innerText = 'File: ' + file.name;
    };
    reader.readAsDataURL(file);
  }

  function showDefaultAvatar(){
    $('defaultAvatar').style.display = 'flex';
    $('previewImg').style.display = 'none';
    $('btnRemove').style.display = 'none';
  }

  function showCustomAvatar(url){
    $('defaultAvatar').style.display = 'none';
    $('previewImg').style.display = 'block';
    $('previewImg').src = url;
    $('btnRemove').style.display = 'block';
  }

  async function saveAvatar(){
    if(!currentUser){
      alert('Session expired. Silakan login ulang.');
      return;
    }
    
    var btn = $('btnSave');
    btn.disabled = true;
    btn.innerText = 'Menyimpan...';
    
    try {
      var avatarUrl = 'default';
      
      if(selectedFile){
        // Upload to Supabase Storage
        var fileExt = selectedFile.name.split('.').pop();
        var fileName = currentUser.id + '_' + Date.now() + '.' + fileExt;
        var filePath = fileName;
        
        console.log('Uploading:', fileName);
        
        var {data, error} = await db.storage
          .from('avatars')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: true
          });
        
        if(error){
          console.error('Upload error:', error);
          throw new Error('Upload gagal: ' + error.message);
        }
        
        // Get public URL
        var {data:{publicUrl}} = db.storage
          .from('avatars')
          .getPublicUrl(filePath);
        
        avatarUrl = publicUrl;
        console.log('Uploaded to:', avatarUrl);
      }
      
      // Update profile
      var {error: updateError} = await db
        .from('profiles')
        .update({
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);
      
      if(updateError){
        throw new Error('Update profile gagal: ' + updateError.message);
      }
      
      currentAvatar = avatarUrl;
      alert('Avatar berhasil disimpan!');
      
      // Update display
      if(avatarUrl === 'default'){
        showDefaultAvatar();
      } else {
        showCustomAvatar(avatarUrl);
      }
      
      // Reset upload
      selectedFile = null;
      $('fileInput').value = '';
      $('previewContainer').style.display = 'none';
      $('uploadArea').classList.remove('has-file');
      $('uploadArea').querySelector('.upload-text').innerText = 'Klik untuk upload avatar';
      
    } catch(err){
      console.error('Save error:', err);
      alert('Error: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerText = 'SIMPAN AVATAR';
    }
  }

  async function removeAvatar(){
    if(!confirm('Hapus avatar custom? Avatar akan kembali ke default.')) return;
    
    var btn = $('btnRemove');
    btn.disabled = true;
    btn.innerText = 'Menghapus...';
    
    try {
      // Delete from storage if exists
      if(currentAvatar && currentAvatar !== 'default'){
        // Extract file path from URL
        var urlParts = currentAvatar.split('/');
        var fileName = urlParts[urlParts.length - 1];
        
        var {error} = await db.storage
          .from('avatars')
          .remove([fileName]);
        
        if(error){
          console.warn('Delete file error:', error);
        }
      }
      
      // Update profile to default
      var {error: updateError} = await db
        .from('profiles')
        .update({
          avatar_url: 'default',
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);
      
      if(updateError) throw updateError;
      
      currentAvatar = 'default';
      showDefaultAvatar();
      alert('Avatar custom dihapus. Kembali ke avatar default.');
      
    } catch(err){
      console.error('Remove error:', err);
      alert('Gagal menghapus avatar: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerText = 'HAPUS AVATAR CUSTOM';
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }
})();

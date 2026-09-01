/* ============================================
   SIDEBAR GLORYVERSE - Logic
   ============================================ */

// Update sidebar dengan data user (nanti integrasi dengan Supabase)
window.updateSidebarData = function(userData) {
  if (userData) {
    // Update username
    if (userData.username) {
      const usernameEl = document.getElementById('gv-username');
      if (usernameEl) usernameEl.textContent = userData.username;
    }
    
    // Update rank
    if (userData.rank) {
      const rankEl = document.getElementById('gv-rank');
      if (rankEl) rankEl.textContent = userData.rank;
    }
    
    // Update citizenship
    if (userData.citizenship) {
      const citEl = document.getElementById('gv-citizenship');
      if (citEl) citEl.textContent = userData.citizenship;
    }
    
    // Update region
    if (userData.region) {
      const regionEl = document.getElementById('gv-region');
      if (regionEl) regionEl.textContent = userData.region;
    }
    
    // Update stats
    if (userData.energy !== undefined) {
      const energyBar = document.getElementById('gv-energy-bar');
      const energyText = document.getElementById('gv-energy-text');
      if (energyBar) {
        energyBar.style.width = userData.energy + '%';
        energyBar.textContent = Math.round(userData.energy) + '%';
      }
      if (energyText) energyText.textContent = Math.round(userData.energy) + '%';
    }
    
    if (userData.health !== undefined) {
      const healthBar = document.getElementById('gv-health-bar');
      const healthText = document.getElementById('gv-health-text');
      if (healthBar) {
        healthBar.style.width = userData.health + '%';
        healthBar.textContent = Math.round(userData.health) + '%';
      }
      if (healthText) healthText.textContent = Math.round(userData.health) + '%';
    }
    
    if (userData.xp !== undefined) {
      const xpBar = document.getElementById('gv-xp-bar');
      const xpText = document.getElementById('gv-xp-text');
      if (xpBar) {
        xpBar.style.width = userData.xp + '%';
      }
      if (xpText && userData.level) {
        xpText.textContent = 'Level ' + userData.level;
      }
    }
    
    // Update currency
    if (userData.euro !== undefined) {
      const euroEl = document.getElementById('gv-euro');
      if (euroEl) euroEl.textContent = userData.euro.toFixed(2);
    }
    
    if (userData.gold !== undefined) {
      const goldEl = document.getElementById('gv-sidebar-gold');
      if (goldEl) goldEl.textContent = userData.gold.toFixed(2);
    }
    
    if (userData.currency !== undefined) {
      const currEl = document.getElementById('gv-currency');
      if (currEl) currEl.textContent = currEl.textContent = userData.currency.toFixed(2);
    }
  }
};

// Initialize sidebar dengan data default
window.initSidebar = function() {
  const defaultData = {
    username: 'Player',
    rank: 'ID • Kadet',
    citizenship: 'Indonesia',
    region: 'Betawi',
    energy: 100,
    health: 100,
    xp: 10,
    level: 1,
    euro: 0,
    gold: 0,
    currency: 0
  };
  
  window.updateSidebarData(defaultData);
};

// Auto init saat load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initSidebar);
} else {
  window.initSidebar();
}

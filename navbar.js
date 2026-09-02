/* ============================================
   NAVBAR GLORYVERSE - Dropdown Logic
   ============================================ */

// Toggle Dropdown - Versi Mobile-Friendly
window.toggleDropdown = function(dropdownId) {
  // Close SEMUA dropdown dulu
  const allDropdowns = document.querySelectorAll('.gv-dropdown-menu');
  allDropdowns.forEach(dropdown => {
    dropdown.classList.remove('show');
    dropdown.style.display = 'none';  // Force hide
  });
  
  // Toggle current dropdown
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    const isShowing = dropdown.classList.contains('show');
    
    if (!isShowing) {
      dropdown.classList.add('show');
      dropdown.style.display = 'block';  // Force show
    }
  }
};

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.gv-dropdown')) {
    const allDropdowns = document.querySelectorAll('.gv-dropdown-menu');
    allDropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

// Activity Navigation
window.goToActivity = function(type) {
  const activityPages = {
    'work': 'activity-work.html',
    'lookout': 'activity-lookout.html',
    'newspaper': 'activity-newspaper.html',
    'bar': 'activity-bar.html',
    'offer': 'activity-offer.html',
    'contest': 'activity-contest.html'
  };
  
  const targetPage = activityPages[type];
  if (targetPage) {
    window.location.href = targetPage;
  }
};

// Market Navigation
window.goToMarket = function(type) {
  const marketPages = {
    'local': 'market-local.html',
    'world': 'market-world.html',
    'financial': 'market-financial.html',
    'recruit': 'market-recruit.html',
    'realestate': 'market-realestate.html',
    'company': 'market-company.html',
    'medal': 'market-medal.html',
    'region': 'market-region.html',
    'medalshop': 'market-medalshop.html'
  };
  
  const targetPage = marketPages[type];
  if (targetPage) {
    window.location.href = targetPage;
  }
};

// War Navigation
window.goToWar = function(type) {
  const warPages = {
    'battle': 'war-battle.html',
    'campaign': 'war-campaign.html',
    'ranking': 'war-ranking.html'
  };
  
  const targetPage = warPages[type];
  if (targetPage) {
    window.location.href = targetPage;
  }
};

// Organization Navigation
window.goToOrganization = function(type) {
  const orgPages = {
    'guild': 'org-guild.html',
    'alliance': 'org-alliance.html',
    'party': 'org-party.html'
  };
  
  const targetPage = orgPages[type];
  if (targetPage) {
    window.location.href = targetPage;
  }
};

// Ranking Navigation
window.goToRanking = function(type) {
  const rankingPages = {
    'player': 'ranking-player.html',
    'region': 'ranking-region.html',
    'guild': 'ranking-guild.html'
  };
  
  const targetPage = rankingPages[type];
  if (targetPage) {
    window.location.href = targetPage;
  }
};

// Community Navigation
window.goToCommunity = function(type) {
  const communityPages = {
    'forum': 'community-forum.html',
    'chat': 'community-chat.html',
    'news': 'community-news.html'
  };
  
  const targetPage = communityPages[type];
  if (targetPage) {
    window.location.href = targetPage;
  }
};

// Mode Toggle
window.toggleMode = function() {
  const btn = event.target;
  if (btn.textContent.includes('ONLINE')) {
    btn.textContent = '🔴 MODE OFFLINE';
    btn.style.background = '#dc3545';
  } else {
    btn.textContent = '🟢 MODE ONLINE';
    btn.style.background = '#28a745';
  }
};

// Clock
window.updateClock = function() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const el = document.getElementById('gv-clock');
  if (el) {
    el.textContent = h + ':' + m + ':' + s;
  }
};

window.updateClock();
window.setInterval(window.updateClock, 1000);

// ESC key to close dropdowns
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const allDropdowns = document.querySelectorAll('.gv-dropdown-menu');
    allDropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

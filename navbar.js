// NAVBAR LOGIC - GloryVerse
// Function global untuk navbar

window.showActivitiesPopup = function() {
  document.getElementById('activity-popup-overlay').style.display = 'block';
  document.getElementById('activity-popup').style.display = 'block';
};

window.closeActivitiesPopup = function() {
  document.getElementById('activity-popup-overlay').style.display = 'none';
  document.getElementById('activity-popup').style.display = 'none';
};

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
    window.closeActivitiesPopup();
    window.location.href = targetPage;
  }
};

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

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    window.closeActivitiesPopup();
  }
});

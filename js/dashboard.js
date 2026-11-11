
/**
 * GLORY VERSE - DASHBOARD FIREBASE INTEGRATION MODULE
 * Arsitektur: PEMBAHARUAN REFRESH (One-Time Fetch on Page Load)
 * - Hanya memanggil getDoc / getDocs satu kali saat halaman dimuat
 * - JANGAN gunakan onSnapshot, onValue, atau realtime listener
 * - JANGAN gunakan auto-polling atau setInterval untuk database
 * - Pembaruan database baru terlihat saat user menekan refresh (F5)
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  addDoc
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

let app = null;
let db = null;
let auth = null;
let currentUser = null;
let currentUserProfile = null;

const firebaseConfig = {
  projectId: "gen-lang-client-0514427323",
  appId: "1:16121083015:web:3d017df91f8ec727fcf422",
  apiKey: "AIzaSyAt3OUy0y-K_oNC2KDtIBcXPSujqubxzIc",
  authDomain: "gen-lang-client-0514427323.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-gloryverse-0730533f-7a64-4d8a-ae24-862b182ccd86",
  storageBucket: "gen-lang-client-0514427323.firebasestorage.app",
  messagingSenderId: "16121083015",
  measurementId: "",
  oAuthClientId: "16121083015-8cap9l3knpnie8g4hfnapn4qh970sjt4.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

export async function initDashboardFirebase() {
  const statusEl = document.getElementById('firebase-connection-status');
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(app);

    if (statusEl) {
      statusEl.className = 'label label-success';
      statusEl.textContent = 'Firebase Terhubung';
    }

    // Auth observer (One-time getDoc on user auth resolution)
    setupAuth();

    // One-time data fetches for dashboard widgets
    await Promise.all([
      loadDashboardWars(),
      loadLocalShouts(),
      loadWorldwideShouts(),
      loadNewspapers()
    ]);

    // Setup interactive form submit handlers
    setupFormHandlers();

  } catch (err) {
    console.error('Firebase init error:', err);
    if (statusEl) {
      statusEl.className = 'label label-danger';
      statusEl.textContent = 'Koneksi Gagal';
    }
  }
}

function setupAuth() {
  const headerAuthContainer = document.getElementById('header-auth-container');
  const authPromptSidebar = document.getElementById('auth-prompt-sidebar');

  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          currentUserProfile = userSnap.data();
        } else {
          // Initialize fresh user document with clean default starting values
          currentUserProfile = {
            id: user.uid,
            username: user.displayName || user.email.split('@')[0],
            email: user.email,
            country_code: 'ID',
            country_name: 'Indonesia',
            region_name: 'Jakarta',
            level: 1,
            xp: 0,
            energy: 100,
            health: 100,
            gold: 10,
            euro: 0,
            svct: 0,
            currency: 0,
            income: 0,
            alerts: 0,
            messages: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          await setDoc(userRef, currentUserProfile);
        }

        renderPlayerProfile(currentUserProfile, user);

        if (headerAuthContainer) {
          headerAuthContainer.innerHTML = `
            <span class="label label-info" id="btn-user-badge" style="cursor:pointer;" title="Profil Pemain">
              <i class="fa-solid fa-user"></i> ${escapeHtml(currentUserProfile.username || 'Pemain')}
            </span>
            <button id="btn-logout" class="btn btn-default btn-sm" style="padding: 2px 8px; margin-left: 4px;" title="Keluar">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          `;
          document.getElementById('btn-logout').addEventListener('click', () => signOut(auth));
        }

        if (authPromptSidebar) {
          authPromptSidebar.innerHTML = `
            <div class="alert alert-success alert-sm" style="text-align:center; margin: 0;">
              <i class="fa-solid fa-circle-check"></i> Masuk: <b>${escapeHtml(currentUserProfile.username)}</b>
            </div>
          `;
        }

      } catch (err) {
        console.warn('Error fetching user profile:', err);
      }
    } else {
      currentUserProfile = null;
      renderGuestState();

      if (headerAuthContainer) {
        headerAuthContainer.innerHTML = `
          <button id="btn-header-google-login" class="btn btn-warning-bvl btn-sm" style="font-size: 11px; padding: 4px 10px;">
            <i class="fa-brands fa-google"></i> Login Google
          </button>
        `;
        document.getElementById('btn-header-google-login').addEventListener('click', loginWithGoogle);
      }

      if (authPromptSidebar) {
        authPromptSidebar.innerHTML = `
          <div class="well well-sm text-center" style="margin: 0; background: #fdf5df; border-color: #f0ad4e;">
            <small style="color: #875508; display: block; margin-bottom: 6px;">Login untuk menyimpan progres permainan:</small>
            <button id="btn-sidebar-google-login" class="btn btn-warning-bvl btn-sm btn-block">
              <i class="fa-brands fa-google"></i> Masuk via Google
            </button>
          </div>
        `;
        document.getElementById('btn-sidebar-google-login').addEventListener('click', loginWithGoogle);
      }
    }
  });
}

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error('Google Sign In failed:', err);
    alert('Gagal login: ' + (err.message || 'Silakan coba lagi.'));
  }
}

function renderPlayerProfile(p, user) {
  const usernameEl = document.getElementById('player-username');
  if (usernameEl) usernameEl.textContent = p.username || 'Pemain';

  const avatarEl = document.getElementById('player-avatar');
  if (avatarEl && user && user.photoURL) {
    avatarEl.src = user.photoURL;
  }

  const countryEl = document.getElementById('player-country');
  const regionEl = document.getElementById('player-region');
  const dashNationalityEl = document.getElementById('dash-nationality');
  const dashLocationEl = document.getElementById('dash-location');

  if (countryEl) countryEl.textContent = p.country_name || 'Indonesia';
  if (regionEl) regionEl.textContent = p.region_name || 'Jakarta';
  if (dashNationalityEl) dashNationalityEl.textContent = p.country_name || 'Indonesia';
  if (dashLocationEl) dashLocationEl.textContent = (p.country_name || 'Indonesia') + ' (' + (p.region_name || 'Jakarta') + ')';

  const energy = Number(p.energy !== undefined ? p.energy : 100);
  const health = Number(p.health !== undefined ? p.health : 100);
  const level = Number(p.level || 1);
  const xp = Number(p.xp || 0);

  const energyVal = document.getElementById('stat-energy-val');
  const energyBar = document.getElementById('stat-energy-bar');
  if (energyVal) energyVal.textContent = energy + '%';
  if (energyBar) energyBar.style.width = Math.min(100, Math.max(0, energy)) + '%';

  const healthVal = document.getElementById('stat-health-val');
  const healthBar = document.getElementById('stat-health-bar');
  if (healthVal) healthVal.textContent = health + '%';
  if (healthBar) healthBar.style.width = Math.min(100, Math.max(0, health)) + '%';

  const levelVal = document.getElementById('stat-level-val');
  const xpBar = document.getElementById('stat-xp-bar');
  if (levelVal) levelVal.textContent = `Level ${level} (${xp} XP)`;
  if (xpBar) xpBar.style.width = Math.min(100, (xp % 100)) + '%';

  const svctEl = document.getElementById('stat-svct');
  const euroEl = document.getElementById('stat-euro');
  const goldEl = document.getElementById('stat-gold');
  const currEl = document.getElementById('stat-currency');

  if (svctEl) svctEl.textContent = Number(p.svct || 0).toFixed(3);
  if (euroEl) euroEl.textContent = Number(p.euro || 0).toFixed(2);
  if (goldEl) goldEl.textContent = Number(p.gold !== undefined ? p.gold : 10).toFixed(2);
  if (currEl) currEl.textContent = Number(p.currency || 0).toFixed(2);

  const incomeBadge = document.getElementById('player-income-badge');
  const alertsBadge = document.getElementById('player-alerts-badge');
  const msgBadge = document.getElementById('player-messages-badge');
  if (incomeBadge) incomeBadge.textContent = `Income (${p.income || 0})`;
  if (alertsBadge) alertsBadge.textContent = `Alerts (${p.alerts || 0})`;
  if (msgBadge) msgBadge.textContent = `Messages (${p.messages || 0})`;
}

function renderGuestState() {
  const usernameEl = document.getElementById('player-username');
  if (usernameEl) usernameEl.textContent = 'Tamu (Belum Login)';

  const countryEl = document.getElementById('player-country');
  const regionEl = document.getElementById('player-region');
  if (countryEl) countryEl.textContent = 'Indonesia';
  if (regionEl) regionEl.textContent = 'Jakarta';

  const svctEl = document.getElementById('stat-svct');
  const euroEl = document.getElementById('stat-euro');
  const goldEl = document.getElementById('stat-gold');
  const currEl = document.getElementById('stat-currency');

  if (svctEl) svctEl.textContent = '0.00';
  if (euroEl) euroEl.textContent = '0.00';
  if (goldEl) goldEl.textContent = '0.00';
  if (currEl) currEl.textContent = '0.00';
}

// 1. One-time Fetch: Wars
async function loadDashboardWars() {
  const tbody = document.getElementById('dashboard-wars-body');
  const headerTitle = document.getElementById('wars-header-title');
  if (!tbody) return;

  try {
    const q = query(collection(db, 'wars'), limit(10));
    const snap = await getDocs(q);

    if (!snap.empty) {
      let html = '';
      let count = 0;
      snap.forEach((d) => {
        const w = d.data();
        count++;
        html += `
          <tr>
            <td><b><a href="/wars.html">${escapeHtml(w.region || 'Region')}</a></b></td>
            <td>
              <span class="label label-danger" style="margin-right: 4px;">${escapeHtml(w.attacker_country_code || 'ATK')}</span>
              ${escapeHtml(w.attacker_country_name || 'Penyerang')} (${w.attacker_percent || 50}%)
            </td>
            <td>
              <span class="label label-info" style="margin-right: 4px;">${escapeHtml(w.defender_country_code || 'DEF')}</span>
              ${escapeHtml(w.defender_country_name || 'Bertahan')} (${w.defender_percent || 50}%)
            </td>
            <td>
              <div class="progress progress-xs" style="margin: 4px 0 0; width: 80px;">
                <div class="progress-bar progress-bar-warning" style="width: ${w.attacker_percent || 50}%;"></div>
                <div class="progress-bar progress-bar-info" style="width: ${w.defender_percent || 50}%;"></div>
              </div>
            </td>
            <td class="text-right">
              <a href="/wars.html" class="btn btn-default btn-sm" style="padding: 2px 6px;"><i class="fa-solid fa-magnifying-glass"></i></a>
            </td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
      if (headerTitle) headerTitle.innerHTML = `<i class="fa-solid fa-crosshairs red" style="margin-right: 6px;"></i> Perang Aktif (${count})`;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center" style="padding: 24px 14px; color: #88898b;">
            <i class="fa-solid fa-shield-halved" style="font-size: 24px; display: block; margin-bottom: 8px; opacity: 0.5; color: #057a9e;"></i>
            Belum ada perang aktif di database.<br>
            <small style="color: #057a9e;">Tempat kosong siap diisi data baru dari Firebase saat halaman di-refresh (F5)</small>
          </td>
        </tr>
      `;
      if (headerTitle) headerTitle.innerHTML = `<i class="fa-solid fa-crosshairs red" style="margin-right: 6px;"></i> Perang Aktif (0)`;
    }
  } catch (err) {
    console.warn('Error fetching wars:', err);
  }
}

// 2. One-time Fetch: Local Shouts
async function loadLocalShouts() {
  const container = document.getElementById('dashboard-local-shouts');
  if (!container) return;

  try {
    const q = query(collection(db, 'shouts'), where('type', '==', 'local'), limit(10));
    const snap = await getDocs(q);

    if (!snap.empty) {
      let html = '';
      snap.forEach((d) => {
        const s = d.data();
        html += renderShoutCard(s);
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = `
        <div class="well well-sm" style="text-align: center; padding: 22px 14px; color: #88898b; background: #ffffff;">
          <i class="fa-solid fa-message" style="font-size: 22px; display: block; margin-bottom: 8px; opacity: 0.5; color: #057a9e;"></i>
          Belum ada shout lokal di wilayah ini.<br>
          <small style="color: #057a9e;">Klik "Tulis Pesan" untuk mengirim shout baru</small>
        </div>
      `;
    }
  } catch (err) {
    console.warn('Error fetching local shouts:', err);
  }
}

// 3. One-time Fetch: Worldwide Shouts
async function loadWorldwideShouts() {
  const container = document.getElementById('dashboard-worldwide-shouts');
  if (!container) return;

  try {
    const q = query(collection(db, 'shouts'), where('type', '==', 'global'), limit(8));
    const snap = await getDocs(q);

    if (!snap.empty) {
      let html = '';
      snap.forEach((d) => {
        const s = d.data();
        html += renderWorldwideShoutRow(s);
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = `
        <div class="well well-sm" style="text-align: center; padding: 16px 10px; color: #88898b; background: #ffffff;">
          <i class="fa-solid fa-earth-americas" style="font-size: 20px; display: block; margin-bottom: 6px; opacity: 0.5; color: #057a9e;"></i>
          Belum ada pesan shout global.<br>
          <small style="color: #88898b;">Pesan global dari pemain lain akan muncul di sini.</small>
        </div>
      `;
    }
  } catch (err) {
    console.warn('Error fetching worldwide shouts:', err);
  }
}

// 4. One-time Fetch: Newspapers
async function loadNewspapers() {
  const container = document.getElementById('dashboard-newspapers');
  if (!container) return;

  try {
    const q = query(collection(db, 'newspapers'), limit(5));
    const snap = await getDocs(q);

    if (!snap.empty) {
      let html = '';
      snap.forEach((d) => {
        const n = d.data();
        html += `
          <div class="well well-sm" style="margin-bottom: 6px; background: #ffffff;">
            <b style="font-size: 12.5px;"><a href="#">${escapeHtml(n.title || 'Artikel Koran')}</a></b>
            <div class="small" style="color: #88898b; margin-top: 2px;">
              Oleh: ${escapeHtml(n.author || 'Pemain')} &bull; ${n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Hari ini'}
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = `
        <div class="well well-sm" style="text-align: center; padding: 18px; color: #88898b; background: #ffffff;">
          <i class="fa-solid fa-newspaper" style="font-size: 20px; display: block; margin-bottom: 6px; opacity: 0.5; color: #057a9e;"></i>
          Belum ada koran diterbitkan saat ini.<br>
          <small style="color: #057a9e;">Data dimuat saat halaman di-refresh (F5)</small>
        </div>
      `;
    }
  } catch (err) {
    console.warn('Error fetching newspapers:', err);
  }
}

function setupFormHandlers() {
  const formLocal = document.getElementById('form-local-shout');
  if (formLocal) {
    formLocal.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk mengirim shout.');
        return;
      }
      const textInput = document.getElementById('local_shout_text');
      const text = textInput ? textInput.value.trim() : '';
      if (!text) return;

      try {
        await addDoc(collection(db, 'shouts'), {
          text: text,
          author: currentUserProfile?.username || currentUser.displayName || 'Pemain',
          uid: currentUser.uid,
          type: 'local',
          country_code: currentUserProfile?.country_code || 'ID',
          created_at: new Date().toISOString()
        });

        const container = document.getElementById('dashboard-local-shouts');
        const newHtml = renderShoutCard({
          text: text,
          author: currentUserProfile?.username || 'Pemain',
          created_at: new Date().toISOString()
        });
        if (container) {
          if (container.querySelector('.well-sm')) {
            container.innerHTML = newHtml;
          } else {
            container.insertAdjacentHTML('afterbegin', newHtml);
          }
        }

        textInput.value = '';
        document.getElementById('new_shout_box')?.classList.add('hide');
        const toggleBtn = document.getElementById('toggleNewShout');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Tulis Pesan';
        alert('Shout lokal berhasil dikirim! Perubahan permanen tersimpan di database.');
      } catch (err) {
        console.error('Error posting local shout:', err);
        alert('Gagal mengirim shout: ' + err.message);
      }
    });
  }

  const formGlobal = document.getElementById('form-worldwide-shout');
  if (formGlobal) {
    formGlobal.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk mengirim shout global.');
        return;
      }
      const textInput = document.getElementById('worldwide_shout_text');
      const text = textInput ? textInput.value.trim() : '';
      if (!text) return;

      try {
        await addDoc(collection(db, 'shouts'), {
          text: text,
          author: currentUserProfile?.username || currentUser.displayName || 'Pemain',
          uid: currentUser.uid,
          type: 'global',
          created_at: new Date().toISOString()
        });

        const container = document.getElementById('dashboard-worldwide-shouts');
        const newHtml = renderWorldwideShoutRow({
          text: text,
          author: currentUserProfile?.username || 'Pemain',
          created_at: new Date().toISOString()
        });
        if (container) {
          if (container.querySelector('.well-sm')) {
            container.innerHTML = newHtml;
          } else {
            container.insertAdjacentHTML('afterbegin', newHtml);
          }
        }

        textInput.value = '';
        alert('Shout global berhasil dikirim!');
      } catch (err) {
        console.error('Error posting worldwide shout:', err);
        alert('Gagal mengirim shout: ' + err.message);
      }
    });
  }
}

function renderShoutCard(s) {
  return `
    <div class="well well-sm" style="margin-bottom: 8px; background: #ffffff;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
        <b><a href="#">${escapeHtml(s.author || 'Pemain')}</a></b>
        <small style="color: #88898b;">${s.created_at ? new Date(s.created_at).toLocaleTimeString() : 'Baru saja'}</small>
      </div>
      <div style="font-size: 12.5px; color: #333438;">${escapeHtml(s.text || '')}</div>
    </div>
  `;
}

function renderWorldwideShoutRow(s) {
  return `
    <div style="padding: 7px 0; border-bottom: 1px dashed #e8e8e9; font-size: 12px;">
      <b><a href="#" style="color: #057a9e;">${escapeHtml(s.author || 'Pemain')}</a></b>:
      <span style="color: #333438;">${escapeHtml(s.text || '')}</span>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

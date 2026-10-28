import { mockPlayer, mockWalletHistory } from '../data.js';

const CFG = window.GV_CONFIG;

function fmt(n, d = 2) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function renderWallet(main, opts = {}) {
  const initialTab = opts.tab || 'topup';
  const p = mockPlayer;

  main.innerHTML = `
    <div class="gv-page-header">
      <div>
        <h1 class="gv-page-title"><span>Wallet</span> & Exchange</h1>
        <div class="gv-page-sub">
          Top up with USDT (Solana) or QRIS Dana · Withdraw to USDT (Solana) only
        </div>
      </div>
      <div class="gv-flex" style="gap:8px">
        <a href="#/wallet/history" class="gv-btn gv-btn--ghost">
          <i class="fa-solid fa-clock-rotate-left"></i> History
        </a>
      </div>
    </div>

    <!-- Balances -->
    <div class="gv-wallet-balances">
      <div class="gv-wallet-balance">
        <div class="gv-wallet-balance-label">
          <i class="fa-solid fa-coins" style="color:var(--gold-bright)"></i> Gold Balance
        </div>
        <div class="gv-wallet-balance-value">${fmt(p.gold)}</div>
        <div class="gv-wallet-balance-sub">In-game currency (earned)</div>
      </div>
      <div class="gv-wallet-balance gv-wallet-balance--diamond">
        <div class="gv-wallet-balance-label">
          <i class="fa-solid fa-gem" style="color:#7dd3fc"></i> Diamond Balance
        </div>
        <div class="gv-wallet-balance-value">${fmt(p.diamond)}</div>
        <div class="gv-wallet-balance-sub">1 Diamond = ${CFG.diamondPriceUSD} USD</div>
      </div>
      <div class="gv-wallet-balance gv-wallet-balance--usdt">
        <div class="gv-wallet-balance-label">
          <i class="fa-brands fa-bitcoin" style="color:#4ade80"></i> USDT (Solana)
        </div>
        <div class="gv-wallet-balance-value">${fmt(p.usdt)}</div>
        <div class="gv-wallet-balance-sub">On-chain balance</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="gv-tabs" id="gv-wallet-tabs">
      <button class="gv-tab ${initialTab === 'topup' ? 'active' : ''}" data-tab="topup">
        <i class="fa-solid fa-plus"></i> Top Up
      </button>
      <button class="gv-tab ${initialTab === 'withdraw' ? 'active' : ''}" data-tab="withdraw">
        <i class="fa-solid fa-arrow-up-from-bracket"></i> Withdraw
      </button>
      <button class="gv-tab ${initialTab === 'history' ? 'active' : ''}" data-tab="history">
        <i class="fa-solid fa-clock-rotate-left"></i> History
      </button>
    </div>

    <div id="gv-wallet-panel"></div>
  `;

  renderPanel(initialTab);
  document.querySelectorAll('#gv-wallet-tabs .gv-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#gv-wallet-tabs .gv-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderPanel(tab.dataset.tab);
    });
  });
}

/* ---------- Panels ---------- */
function renderPanel(tab) {
  const panel = document.getElementById('gv-wallet-panel');
  if (!panel) return;

  if (tab === 'topup') return renderTopup(panel);
  if (tab === 'withdraw') return renderWithdraw(panel);
  if (tab === 'history') return renderHistory(panel);
}

/* ---------- Top Up ---------- */
function renderTopup(panel) {
  panel.innerHTML = `
    <div class="gv-grid gv-grid--equal">
      <div class="gv-card">
        <h3 class="gv-card-title gv-mb-md"><i class="fa-solid fa-wallet"></i> Deposit</h3>

        <div class="gv-field">
          <label class="gv-field-label">Payment Method</label>
          <div class="gv-methods" id="gv-topup-methods">
            <label class="gv-method selected" data-method="USDT_SOLANA">
              <input type="radio" name="topup_method" value="USDT_SOLANA" checked>
              <div class="gv-method-icon gv-method-icon--solana">
                <i class="fa-brands fa-bitcoin"></i>
              </div>
              <div class="gv-method-info">
                <div class="gv-method-name">USDT (Solana)</div>
                <div class="gv-method-desc">Instant · Recommended</div>
              </div>
              <div class="gv-method-check"><i class="fa-solid fa-check"></i></div>
            </label>

            <label class="gv-method" data-method="QRIS_DANA">
              <input type="radio" name="topup_method" value="QRIS_DANA">
              <div class="gv-method-icon gv-method-icon--qris">
                <i class="fa-solid fa-qrcode"></i>
              </div>
              <div class="gv-method-info">
                <div class="gv-method-name">QRIS / DANA</div>
                <div class="gv-method-desc">IDR payment · Auto-convert</div>
              </div>
              <div class="gv-method-check"><i class="fa-solid fa-check"></i></div>
            </label>
          </div>
        </div>

        <div class="gv-field">
          <label class="gv-field-label">Amount (USD)</label>
          <div class="gv-input-wrap">
            <input type="number" id="gv-topup-amount" class="gv-input" placeholder="0.00" min="1" step="1" value="10">
            <span class="gv-input-suffix">USD</span>
          </div>
          <div class="gv-amount-quick">
            <button data-amt="10">$10</button>
            <button data-amt="25">$25</button>
            <button data-amt="50">$50</button>
            <button data-amt="100">$100</button>
          </div>
        </div>

        <div class="gv-summary">
          <div class="gv-summary-row"><span>You pay</span><b id="gv-sum-pay">$10.00</b></div>
          <div class="gv-summary-row"><span>Rate</span><b>1 USD = ${CFG.diamondPriceUSD} 💎</b></div>
          <div class="gv-summary-row gv-summary-row--total">
            <span>You receive</span><b id="gv-sum-receive">10.00 💎</b>
          </div>
        </div>

        <div class="gv-wallet-note">
          <i class="fa-solid fa-circle-info"></i>
          After payment is confirmed, diamonds will be credited automatically.
          Minimum deposit: $1.
        </div>

        <button class="gv-btn gv-btn--gold gv-btn--block" id="gv-topup-submit">
          <i class="fa-solid fa-lock"></i> Continue to Payment
        </button>
      </div>

      <div class="gv-card">
        <h3 class="gv-card-title gv-mb-md"><i class="fa-solid fa-circle-info"></i> Payment Info</h3>
        <div id="gv-topup-info">
          ${topupInfoHTML('USDT_SOLANA')}
        </div>
      </div>
    </div>
  `;

  // Method toggle
  panel.querySelectorAll('#gv-topup-methods .gv-method').forEach(m => {
    m.addEventListener('click', () => {
      panel.querySelectorAll('#gv-topup-methods .gv-method').forEach(x => x.classList.remove('selected'));
      m.classList.add('selected');
      const method = m.dataset.method;
      document.getElementById('gv-topup-info').innerHTML = topupInfoHTML(method);
    });
  });

  // Amount
  const amountEl = document.getElementById('gv-topup-amount');
  const updateSummary = () => {
    const amt = Number(amountEl.value) || 0;
    document.getElementById('gv-sum-pay').textContent = `$${fmt(amt)}`;
    document.getElementById('gv-sum-receive').textContent = `${fmt(amt * CFG.diamondPriceUSD)} 💎`;
  };
  amountEl.addEventListener('input', updateSummary);
  panel.querySelectorAll('.gv-amount-quick button').forEach(b => {
    b.addEventListener('click', () => { amountEl.value = b.dataset.amt; updateSummary(); });
  });
  updateSummary();

  // Submit
  document.getElementById('gv-topup-submit').addEventListener('click', () => {
    const amt = Number(amountEl.value) || 0;
    if (amt < 1) return toast('Minimum top up is $1');
    const method = panel.querySelector('input[name="topup_method"]:checked').value;
    toast(`Top-up $${fmt(amt)} via ${method.replace('_', ' ')} — redirecting…`);
    // TODO: supabase.functions.invoke('create-topup', { body: { amount: amt, method } })
  });
}

function topupInfoHTML(method) {
  if (method === 'USDT_SOLANA') {
    return `
      <div class="gv-wallet-note">
        <i class="fa-solid fa-circle-info"></i>
        Send USDT on the <b>Solana network</b> to the address below.
        Do not send from other networks or funds will be lost.
      </div>
      <div class="gv-field">
        <label class="gv-field-label">USDT Solana Wallet Address</label>
        <div class="gv-input-wrap">
          <input class="gv-input" type="text" value="GVWalletAddrXXXXXXXXXXXXXXXXXXXXXXX" readonly>
        </div>
      </div>
      <div class="gv-summary-row" style="font-size:12px;color:var(--text-muted)">
        After sending, submit the transaction hash on the next screen.
      </div>
    `;
  }
  return `
    <div class="gv-wallet-note">
      <i class="fa-solid fa-circle-info"></i>
      Scan the QRIS code with DANA / any e-wallet. Payment in IDR will be auto-converted.
    </div>
    <div class="gv-field">
      <label class="gv-field-label">QRIS Code</label>
      <div style="background:#fff;border-radius:8px;padding:16px;display:flex;align-items:center;justify-content:center;min-height:200px">
        <i class="fa-solid fa-qrcode" style="font-size:96px;color:#111"></i>
      </div>
    </div>
    <div class="gv-summary-row" style="font-size:12px;color:var(--text-muted)">
      QRIS is processed via our payment partner. Confirmation usually takes &lt;1 minute.
    </div>
  `;
}

/* ---------- Withdraw ---------- */
function renderWithdraw(panel) {
  panel.innerHTML = `
    <div class="gv-grid gv-grid--equal">
      <div class="gv-card">
        <h3 class="gv-card-title gv-mb-md"><i class="fa-solid fa-arrow-up-from-bracket"></i> Withdraw to USDT</h3>

        <div class="gv-wallet-note">
          <i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b"></i>
          Withdrawal is available <b>only via USDT (Solana)</b>.
          Minimum $${CFG.withdrawMinUSD}. Diamonds are consumed 1:1 (1 💎 = 1 USD).
        </div>

        <div class="gv-field">
          <label class="gv-field-label">Amount (USD)</label>
          <div class="gv-input-wrap">
            <input type="number" id="gv-wd-amount" class="gv-input" placeholder="0.00" min="${CFG.withdrawMinUSD}" step="1">
            <span class="gv-input-suffix">USD</span>
          </div>
        </div>

        <div class="gv-field">
          <label class="gv-field-label">Solana Wallet Address</label>
          <div class="gv-input-wrap">
            <input type="text" id="gv-wd-address" class="gv-input" placeholder="Your USDT-SPL wallet address">
          </div>
        </div>

        <div class="gv-summary">
          <div class="gv-summary-row"><span>Diamonds required</span><b id="gv-wd-diamonds">0.00 💎</b></div>
          <div class="gv-summary-row"><span>Network fee</span><b>~$0.01 (paid in SOL)</b></div>
          <div class="gv-summary-row gv-summary-row--total">
            <span>You receive</span><b id="gv-wd-receive">$0.00</b>
          </div>
        </div>

        <button class="gv-btn gv-btn--red gv-btn--block" id="gv-wd-submit">
          <i class="fa-solid fa-paper-plane"></i> Request Withdrawal
        </button>
      </div>

      <div class="gv-card">
        <h3 class="gv-card-title gv-mb-md"><i class="fa-solid fa-circle-info"></i> Withdrawal Info</h3>
        <ul class="gv-sidebar-links" style="margin-top:0;border-top:none;padding-top:0">
          <li><a>Processing time: 1–24 hours</a></li>
          <li><a>Network: Solana (SPL USDT)</a></li>
          <li><a>Fee: network fee only</a></li>
          <li><a>Minimum: $${CFG.withdrawMinUSD}</a></li>
          <li><a>Rate: 1 💎 = 1 USDT</a></li>
        </ul>
      </div>
    </div>
  `;

  const amountEl = document.getElementById('gv-wd-amount');
  const updateSummary = () => {
    const amt = Number(amountEl.value) || 0;
    document.getElementById('gv-wd-diamonds').textContent = `${fmt(amt)} 💎`;
    document.getElementById('gv-wd-receive').textContent = `$${fmt(amt)}`;
  };
  amountEl.addEventListener('input', updateSummary);
  updateSummary();

  document.getElementById('gv-wd-submit').addEventListener('click', () => {
    const amt = Number(amountEl.value) || 0;
    const addr = document.getElementById('gv-wd-address').value.trim();
    if (amt < CFG.withdrawMinUSD) return toast(`Minimum withdrawal is $${CFG.withdrawMinUSD}`);
    if (amt > mockPlayer.diamond) return toast('Insufficient diamond balance');
    if (!addr || addr.length < 32) return toast('Please enter a valid Solana address');
    toast('Withdrawal request submitted. Processing…');
    // TODO: supabase.functions.invoke('create-withdraw', { body: { amount: amt, address: addr } })
  });
}

/* ---------- History ---------- */
function renderHistory(panel) {
  panel.innerHTML = `
    <div class="gv-card">
      <div class="gv-card-head">
        <h3 class="gv-card-title"><i class="fa-solid fa-clock-rotate-left"></i> Transaction History</h3>
      </div>
      <table class="gv-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Diamonds</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${mockWalletHistory.map(t => `
            <tr>
              <td><code style="font-size:11px;color:var(--text-muted)">${t.id}</code></td>
              <td><span class="gv-badge gv-badge--${t.type}">${t.type.toUpperCase()}</span></td>
              <td>${t.method.replace('_', ' ')}</td>
              <td><b>$${fmt(t.amountUSD)}</b></td>
              <td>${fmt(t.diamonds)} 💎</td>
              <td><span class="gv-badge gv-badge--${t.status}">${t.status}</span></td>
              <td style="color:var(--text-muted);font-size:12px">${t.date}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ---------- Toast ---------- */
function toast(msg) {
  const root = document.getElementById('gv-toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'gv-toast';
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

export function renderPlaceholder(main, title) {
  main.innerHTML = `
    <div class="gv-page-header">
      <div>
        <h1 class="gv-page-title">${title}</h1>
        <div class="gv-page-sub">This page is coming soon.</div>
      </div>
    </div>
    <div class="gv-card gv-text-center" style="padding:80px 20px">
      <i class="fa-solid fa-hammer" style="font-size:56px;color:var(--gold);opacity:.4"></i>
      <h2 class="gv-mt-md">Under Construction</h2>
      <p class="gv-text-dim">We'll build this page in the next session.</p>
      <a href="#/dashboard" class="gv-btn gv-btn--gold gv-mt-sm">
        <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
      </a>
    </div>
  `;
}

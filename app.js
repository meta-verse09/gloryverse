
var B='https://gloryverse.id/';

// ===== DAFTAR MENU: tambah/ubah link cukup di sini. Format: ['Nama','nama_file'] =====
var MENU={
 'Activities':[['Work','workplaces'],['War Activity','wars'],['Daily Hero','dailyhero'],['North Korea Wars','northkorea'],['Lookout Posts','lookouts'],['Newspapers','newspapers'],['The Local Bar','local_bar'],['Offers','fund_offers'],['Offers Contest','offers_contest']],
 'Markets':[['Local Goods Market','market_local'],['Global Goods Market','market_global'],['Financial Market','market_financial'],['Recruits Auctions','market_recruits'],['Real Estate Market','market_real_estate'],['Company Auctions','market_companies'],['Medals Market','market_medals'],['Regions Market','market_regions'],['Medals Shop','medals_shop'],['Victory Tokens Market','market_vct']],
 'My country':[['Accountancy','country_accountancy'],['Statistics','country_statistics'],['Regions','country_regions'],['Resources','country_resources'],['Storage','country_storage'],['Taxes Ideologies and Bonuses','country_taxes'],['Government Members','country_govmembers'],['Law Proposals','country_lawproposals'],['Government Elections','country_elections'],['Patriots','country_patriots'],['Army','country_army'],['Companies','country_companies']],
 'Organizations':[['Local Organizations','organizations_local'],['Global Organizations','organizations_global']],
 'Partners':[['The Fund','partners_fund'],['Share Market','partners_market'],['Shareholders','partners_shareholders'],['My Shares','partners_myshares']],
 'Rankings':[['Player Level','rankings_playerlevel'],['Net Worth','rankings_networth'],['Euros','rankings_euro'],['Gold','rankings_gold'],['Energy','rankings_energy'],['Economic Score','rankings_economic_score'],['War Damage','rankings_wardamage'],['Top Wars','rankings_wars'],['Recruits Count','rankings_recruits'],['Recruits Income','rankings_recruit_income'],['Top Paid Offers','rankings_top_offers'],['Offers Top Earners','rankings_offers_euro'],['Top VCT Holders','rankings_vctholders'],['Countries by Citizenship','rankings_country'],['Countries by Military Power','rankings_countrymilitary'],['Countries by Region Count','rankings_countryregions'],['Countries by Activity','rankings_countryactives'],['Countries by Infrastructure','rankings_countryinfrastructures']],
 'Community':[['Forums','forum'],['Code of Conduct','code_of_conduct'],['Documentation','documentation'],['Arena Fund','arena_fund'],['Global Market Fund','globalmarket_fund'],['War Fund','warfund'],['Private Country Auction','private_countries'],['Referral Rights Auction','referral_rights'],['Alliances','alliances'],['Latest Citizens','latest_citizens'],['Citizenship Changes','citizenship_changes'],['Abandoned Recruits','abandoned_recruits']]
};

// ===== LEMBAR GESER DARI BAWAH =====
var shade=document.getElementById('shade'),sheet=document.getElementById('sheet');
function openSheet(html){sheet.innerHTML=html;shade.classList.add('on')}
shade.addEventListener('click',function(e){if(e.target===shade)shade.classList.remove('on')});

// Tombol Menu (bawah): menu utama berupa akordeon
var menuBtn=document.querySelector('[data-menu]');
if(menuBtn)menuBtn.addEventListener('click',function(e){
  e.preventDefault();
  openSheet('<h3>Menu</h3>'+Object.keys(MENU).map(function(g){
    return '<details><summary>'+g+'</summary>'+MENU[g].map(function(m){return '<a href="'+B+m[1]+'.html">'+m[0]+'</a>'}).join('')+'</details>';
  }).join(''));
});

// Tautan data-sheet="URL": isi popup diambil dari server (halaman /ajax/...)
document.querySelectorAll('[data-sheet]').forEach(function(a){
  a.addEventListener('click',function(e){
    e.preventDefault();
    openSheet('<p class="hint">Loading...</p>');
    fetch(a.dataset.sheet,{headers:{'X-Requested-With':'XMLHttpRequest'},credentials:'include'})
      .then(function(r){return r.text()}).then(openSheet)
      .catch(function(){openSheet('<p>Could not load. Please try again.</p>')});
  });
});

// Tautan data-sheet-el="id": isi popup diambil dari elemen tersembunyi di halaman yang sama
document.querySelectorAll('[data-sheet-el]').forEach(function(a){
  a.addEventListener('click',function(e){
    e.preventDefault();
    openSheet(document.getElementById(a.dataset.sheetEl).innerHTML);
  });
});

// Jam server = waktu London (otomatis GMT/BST). Untuk zona lain, ganti 'Europe/London'.
var SERVER_TZ='Europe/London';
var clockEl=document.getElementById('server_time');
if(clockEl){
  var fmt=new Intl.DateTimeFormat('en-GB',{timeZone:SERVER_TZ,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
  var tick=function(){clockEl.textContent=fmt.format(new Date())};
  tick();
  setInterval(tick,1000);
}

// ===== Kompatibilitas: HTML dari server yang memanggil ajaxcall(url,'#target') tetap jalan =====
// Target '#modal_ajax' dibuka sebagai lembar; target lain diisi langsung.
function ajaxcall(url,target){
  if(target==='#modal_ajax')openSheet('<p class="hint">Loading...</p>');
  fetch(url,{headers:{'X-Requested-With':'XMLHttpRequest'},credentials:'include'})
    .then(function(r){return r.text()})
    .then(function(h){if(target==='#modal_ajax')openSheet(h);else document.querySelector(target).innerHTML=h})
    .catch(function(){var m='<p>Could not load. Please try again.</p>';if(target==='#modal_ajax')openSheet(m);else document.querySelector(target).innerHTML=m});
}
// Tautan lama href="#modal_ajax" tidak boleh melompat halaman
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href="#modal_ajax"]');if(a)e.preventDefault()});

function svg(m){var M=MID[m],v=VAR[M.f].indexOf(M.n),field=M.red==2?'#8B0000':'#0a0a0a';
 var W='stroke="#f5f0e6" stroke-width="2.5" fill="none"',g='',i,n,cx,cy;
 /* CHIBI untuk 3 kartu merah */
 if(M.red==1||M.red==2){
  var chibi='';
  if(M.f=='HIU'&&M.n=='Penci')chibi='ceki_chibi_hiu_pusek.png';
  if(M.f=='TALI'&&M.n=='Merah')chibi='ceki_chibi_tali_sirah.png';
  if(M.f=='HIU'&&M.n=='Babak')chibi='ceki_chibi_hiu_babak.png';
  if(chibi)return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><image x="5" y="10" width="50" height="120" href="'+chibi+'" preserveAspectRatio="xMidYMid meet"/></svg>';
 }
 /* WAYANG SVG untuk 27 kartu regular */
 if(M.f=='HIU'){
  if(v==0){g='<path d="M16 24 h28 M16 32 h28 M16 40 h28 M16 100 h28 M16 108 h28 M16 116 h28" '+W+'/>'}
  if(v==1){g='<path d="M20 28 l10 12 -10 12 M30 28 l-10 12 10 12 M20 100 l10 12 -10 12 M30 100 l-10 12 10 12" '+W+'/>'}
  if(v==2){g='<circle cx="30" cy="34" r="8" '+W+'/><circle cx="30" cy="34" r="4" '+W+'/><circle cx="30" cy="106" r="8" '+W+'/><circle cx="30" cy="106" r="4" '+W+'/>'}
  if(v==3){g='<path d="M22 26 v12 h16 v-12 M22 102 v12 h16 v-12" '+W+'/><path d="M24 30 h12 M24 106 h12" '+W+'/>'}
  if(v==4){g='<rect x="22" y="26" width="16" height="16" '+W+'/><rect x="22" y="98" width="16" height="16" '+W+'/><path d="M26 30 h8 M26 102 h8" '+W+'/>'}
  if(v==5){g='<path d="M20 24 h20 v8 h-20 M20 108 h20 v8 h-20" '+W+'/><path d="M24 28 v4 M36 28 v4 M24 112 v4 M36 112 v4" '+W+'/>'}
 }
 if(M.f=='JARUM'){
  if(v==0){g='<path d="M30 22 l14 18 -14 18 -14 -18 z M30 100 l10 14 -10 14 -10 -14 z" '+W+'/>'}
  if(v==1){g='<path d="M30 26 l10 14 -10 14 -10 -14 z M26 60 l4 6 -4 6 -4 -6 z M30 94 l10 14 -10 14 -10 -14 z" '+W+'/>'}
  if(v==2){g='<path d="M30 30 l8 12 -8 12 -8 -12 z M22 66 l8 12 -8 12 -8 -12 z M30 102 l8 12 -8 12 -8 -12 z" '+W+'/>'}
 }
 if(M.f=='SUDUNG'){
  if(v==0){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="10" '+W+'/><circle cx="30" cy="'+cy+'" r="5" '+W+'/>'}}
  if(v==1){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="9" '+W+'/>'}}
  if(v==2){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="8" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>'}}
 }
 if(M.f=='BENGKOK'){
  if(v==0){g='<path d="M20 22 v96 h20 M40 22 h-8 M20 118 h8" '+W+'/>'}
  if(v==1){g='<path d="M40 22 v96 h-20 M20 22 h8 M40 118 h-8" '+W+'/>'}
  if(v==2){g='<path d="M20 22 v96 h20 M40 22 v56 M20 118 h8" '+W+'/>'}
 }
 if(M.f=='TALI'){
  if(v==0){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="11" '+W+'/><circle cx="30" cy="'+cy+'" r="7" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>'}}
  if(v==1){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="10" '+W+'/><circle cx="30" cy="'+cy+'" r="4" '+W+'/>'}}
  if(v==2){for(i=0;i<3;i++){cy=30+i*40;g+='<circle cx="30" cy="'+cy+'" r="9" '+W+'/><circle cx="30" cy="'+cy+'" r="3" '+W+'/>'}}
 }
 if(M.f=='PECAH'){
  if(v==0){g+='<circle cx="22" cy="30" r="6" '+W+'/><circle cx="38" cy="30" r="6" '+W+'/>';g+='<circle cx="22" cy="58" r="6" '+W+'/><circle cx="38" cy="58" r="6" '+W+'/>';g+='<circle cx="22" cy="86" r="6" '+W+'/><circle cx="38" cy="86" r="6" '+W+'/>';g+='<circle cx="30" cy="114" r="6" '+W+'/>'}
  if(v==1){for(i=0;i<8;i++){cx=22+(i%2)*16;cy=26+Math.floor(i/2)*30;g+='<circle cx="'+cx+'" cy="'+cy+'" r="5" '+W+'/>'}}
  if(v==2){for(i=0;i<12;i++){cx=20+(i%3)*10;cy=24+Math.floor(i/3)*24;g+='<circle cx="'+cx+'" cy="'+cy+'" r="4" '+W+'/>'}}
 }
 if(M.f=='BATUNG'){
  if(v==0){for(i=0;i<3;i++){cy=28+i*32;g+='<circle cx="24" cy="'+cy+'" r="6" '+W+'/><circle cx="36" cy="'+cy+'" r="6" '+W+'/>'}}
  if(v==1){for(i=0;i<2;i++){cy=34+i*56;g+='<circle cx="24" cy="'+cy+'" r="7" '+W+'/><circle cx="36" cy="'+cy+'" r="7" '+W+'/>'}}
  if(v==2){for(i=0;i<2;i++){cy=38+i*48;g+='<circle cx="24" cy="'+cy+'" r="8" '+W+'/><circle cx="36" cy="'+cy+'" r="8" '+W+'/>'}}
 }
 if(M.f=='SISIR'){
  if(v==0){for(i=0;i<8;i++){g+='<path d="M18 '+(22+i*14)+' h24" '+W+'/>'}}
  if(v==1){for(i=0;i<6;i++){g+='<path d="M18 '+(28+i*16)+' h24" '+W+'/>'}}
  if(v==2){for(i=0;i<5;i++){g+='<path d="M18 '+(30+i*20)+' h24" '+W+'/>'}}
 }
 if(M.f=='BABI'){
  if(v==0){g+='<circle cx="30" cy="32" r="10" '+W+'/>';g+='<rect x="20" y="56" width="20" height="24" '+W+'/>';g+='<rect x="20" y="84" width="20" height="24" '+W+'/>'}
  if(v==1){g+='<rect x="20" y="28" width="20" height="24" '+W+'/>';g+='<rect x="20" y="58" width="20" height="24" '+W+'/>';g+='<rect x="20" y="88" width="20" height="24" '+W+'/>'}
  if(v==2){g+='<rect x="20" y="34" width="20" height="20" '+W+'/>';g+='<rect x="20" y="62" width="20" height="20" '+W+'/>';g+='<rect x="20" y="90" width="20" height="20" '+W+'/>'}
 }
 var lab='<text x="30" y="137" font-size="10" fill="#151515" text-anchor="middle" font-family="monospace">'+String(m+1).padStart(2,'0')+'</text>';
 return '<svg viewBox="0 0 60 140"><rect x="1" y="1" width="58" height="138" rx="6" fill="#f5f0e6"/><rect x="8" y="8" width="44" height="124" fill="'+field+'"/>'+g+lab+'</svg>'}

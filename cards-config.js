// cards-config.js - Konfigurasi Kartu Ceki GloryVerse
(function(){
  'use strict';
  
  // Mapping 30 Kartu Ceki
  window.CEKI_CARDS = {
    // Babi
    'babi-aluih': { id: 1, name: 'Babi Aluih', file: 'babi-aluih.png', value: 1, suit: 'babi' },
    'babi-gadang': { id: 2, name: 'Babi Gadang', file: 'babi-gadang.png', value: 2, suit: 'babi' },
    'babi-pusek': { id: 3, name: 'Babi Pusek', file: 'babi-pusek.png', value: 3, suit: 'babi' },
    
    // Hiu
    'hiu-kuciang': { id: 4, name: 'Hiu Kuciang', file: 'hiu-kuciang.png', value: 4, suit: 'hiu' },
    'hiu-hitam': { id: 5, name: 'Hiu Hitam', file: 'hiu-hitam.png', value: 5, suit: 'hiu' },
    'hiu-gadang': { id: 6, name: 'Hiu Gadang', file: 'hiu-gadang.png', value: 6, suit: 'hiu' },
    'hiu-aluih': { id: 7, name: 'Hiu Aluih', file: 'hiu-aluih.png', value: 7, suit: 'hiu' },
    'hiu-merah': { id: 8, name: 'Hiu Merah', file: 'hiu-merah.png', value: 8, suit: 'hiu' },
    'hiu-babak': { id: 9, name: 'Hiu Babak', file: 'hiu-babak.png', value: 9, suit: 'hiu' },
    
    // Jarum
    'jarum-aluih': { id: 10, name: 'Jarum Aluih', file: 'jarum-aluih.png', value: 10, suit: 'jarum' },
    'jarum-gadang': { id: 11, name: 'Jarum Gadang', file: 'jarum-gadang.png', value: 11, suit: 'jarum' },
    'jarum-wajik': { id: 12, name: 'Jarum Wajik', file: 'jarum-wajik.png', value: 12, suit: 'jarum' },
    
    // Bengkok
    'bengkok-aluih': { id: 13, name: 'Bengkok Aluih', file: 'bengkok-aluih.png', value: 13, suit: 'bengkok' },
    'bengkok-gadang': { id: 14, name: 'Bengkok Gadang', file: 'bengkok-gadang.png', value: 14, suit: 'bengkok' },
    'bengkok-wajik': { id: 15, name: 'Bengkok Wajik', file: 'bengkok-wajik.png', value: 15, suit: 'bengkok' },
    
    // Tali
    'tali-aluih': { id: 16, name: 'Tali Aluih', file: 'tali-aluih.png', value: 16, suit: 'tali' },
    'tali-sirah': { id: 17, name: 'Tali Sirah', file: 'tali-sirah.png', value: 17, suit: 'tali' },
    'tali-bulek': { id: 18, name: 'Tali Bulek', file: 'tali-bulek.png', value: 18, suit: 'tali' },
    
    // Pacah
    'pacah-lapan': { id: 19, name: 'Pacah Lapan', file: 'pacah-lapan.png', value: 19, suit: 'pacah' },
    'pacah-aluih': { id: 20, name: 'Pacah Aluih', file: 'pacah-aluih.png', value: 20, suit: 'pacah' },
    'pacah-manih': { id: 21, name: 'Pacah Manih', file: 'pacah-manih.png', value: 21, suit: 'pacah' },
    
    // Sisia
    'sisia-aluih': { id: 22, name: 'Sisia Aluih', file: 'sisia-aluih.png', value: 22, suit: 'sisia' },
    'sisia-gadang': { id: 23, name: 'Sisia Gadang', file: 'sisia-gadang.png', value: 23, suit: 'sisia' },
    
    // Kapik
    'kapik-manih': { id: 24, name: 'Kapik Manih', file: 'kapik-manih.png', value: 24, suit: 'kapik' },
    'kapik-anam': { id: 25, name: 'Kapik Anam', file: 'kapik-anam.png', value: 25, suit: 'kapik' },
    
    // Suduang
    'suduang-putiah': { id: 26, name: 'Suduang Putiah', file: 'suduang-putiah.png', value: 26, suit: 'suduang' },
    'suduang-wajik': { id: 27, name: 'Suduang Wajik', file: 'suduang-wajik.png', value: 27, suit: 'suduang' },
    
    // Lainnya
    'bendera': { id: 28, name: 'Bendera', file: 'bendera.png', value: 28, suit: 'lain' },
    'batuang-anam': { id: 29, name: 'Batuang Anam', file: 'batuang-anam.png', value: 29, suit: 'lain' },
    'pinggang': { id: 30, name: 'Pinggang', file: 'pinggang.png', value: 30, suit: 'lain' }
  };
  
  // Fungsi untuk mendapat URL gambar kartu
  window.getCardImage = function(cardId){
    var card = CEKI_CARDS[cardId];
    if(!card) return 'cards/default.png';
    return 'cards/' + card.file;
  };
  
  // Fungsi untuk mendapat info kartu
  window.getCardInfo = function(cardId){
    return CEKI_CARDS[cardId] || null;
  };
  
  // Fungsi shuffle deck
  window.shuffleDeck = function(){
    var keys = Object.keys(CEKI_CARDS);
    for(var i = keys.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var temp = keys[i];
      keys[i] = keys[j];
      keys[j] = temp;
    }
    return keys;
  };
  
  console.log('✅ Ceki Cards loaded: ' + Object.keys(CEKI_CARDS).length + ' cards');
})();

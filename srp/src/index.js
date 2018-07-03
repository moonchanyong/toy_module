var srp = require('./srp');

function qs(selector){
  return document.querySelector(selector);
}

srp.setDisplay(qs('#display'));
srp.print();

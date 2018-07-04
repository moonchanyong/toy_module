var css = require('./base.css').toString();
var srp = require('./srp');


function qs(selector){
  return document.querySelector(selector);
}

let sheet = document.createElement('link');
sheet.rel = "stylesheet";
sheet.href = "dist/styles.css";
document.head.append(sheet);
srp.setDisplay(qs('.display'));

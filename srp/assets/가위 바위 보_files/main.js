!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){function n(e,t,n,r){e.addEventListener(t,n,!!r)}var r=function(){var e=["circle","control"],t=document.createElement("div");t.classList.add("rock",...e),t.setAttribute("val","rock");var r=document.createElement("div");r.classList.add("scissor",...e),t.setAttribute("val","scissor");var o=document.createElement("div");function i(e){console.log("game",e)}return o.classList.add("paper",...e),t.setAttribute("val","paper"),n(t,"click",i),n(r,"click",i),n(o,"click",i),{print:function(){console.log("call print in srp")},setDisplay:function(e){e.appendChild(t),e.appendChild(r),e.appendChild(o)},game:i}}();e.exports=r},function(e,t,n){var r,o=n(0);o.setDisplay((r="#display",document.querySelector(r))),o.print()}]);
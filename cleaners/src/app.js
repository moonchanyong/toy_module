import * as _ from 'partial-js';
import ComponentSet from './ComponentSet'

function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}


function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
}


const setArr = [];
$on(document, 'DOMContentLoaded', () => {
  $on(qs('#plus'), 'click', () =>{
    setArr.push(new ComponentSet());
    setArr[setArr.length-1].export(qs('#display'));
  });
  $on(qs('#equal'), 'click', (e) => {
    result();
    qs('#control_pannel').style['display'] = 'none';
    e.target.value=""
  });
});

function result() {
  let strData = _.compact(qs('#nameList').value.replace(' ', '').split(','));

  console.log(strData.length);
  let fixedMemberNum = _.reduce(setArr, (a, b) => a+b.getLength(), 0);
  console.log(fixedMemberNum);
  let limitH = Math.ceil((strData.length+fixedMemberNum) / setArr.length);
  console.log(limitH);
  // 전처리, immutable 위반
  setArr = _.filter(setArr, (item) => item.getLength() < limitH);
  _.go(
    strData,
    _.hi,
    _.each((item) => {
      let idx = _.random(0, setArr.length-1);
      setArr[idx].push(item);
      if(setArr[idx].getLength() >= limitH) _.removeByIndex(setArr, idx);
    })
  )
  _.go(
    setArr,
    _.filter((item) => item.getLength() === 0),
    _.each((item)=> {item.el.remove();})
  )
}

import Component from '@egjs/component';
import * as _ from 'partial-js';

function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
}

function curry(fn) {
  return (...xs) => {
    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION');
    }
    if (xs.length >= fn.length) {
      return fn(...xs);
    }
    return curry(fn.bind(null, ...xs));
  };
}

function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}
/**
 * A function used to create Element
 * @ko Element 생성
 * @param {string} tag tagname
 */
function createEl(tag) {
  return document.createElement(tag);
}

function curryr(fn, ...args) {
  return (...xs) => {
    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION');
    }
    if (xs.length + args.length >= fn.length) {
      let params = [...args, ...xs];
      return fn(...params.reverse());
    }
    return curryr(fn, ...args, ...xs);
  };
}

/**
 * A function used to append class
 * @ko class를 추가한다.
 * @param {Element} el Element
 * @param {Array} classList to be added class
 */
function appendClass(el, ...classList) {
  // 1이상이면 true
  if (!classList.length) return;

  let list = _.go(
    classList,
    _.filter((item)=> typeof item === 'string'),
    _.compact,
    _.uniq,
  )
  el.classList.add(...list);
  return el;
}

class ComponentSet extends Component {
  constructor() {
    super();
    this.nameList = [];
    this.el = createEl('div');
    this.el.classList.add('compoenetSet');

    // append div
    // _.go(
    //   appendClass(createEl('div'), 'close-btn'),
    //   this.el.appendChild.bind(this.el),
    // ).innerText = 'x';

    _.go(
      appendClass(createEl('input'), 'compoenet-input'),
      this.el.appendChild.bind(this.el),
    );
    this.el.addEventListener('keyup', (e)=> {
      e.preventDefault();
      if (e.keyCode === 13 && !!(e.target.value)) {
        // Trigger the button element with a click
        this.push(e.target.value);
        e.target.value = "";
      }
    });
  } // end constructor

  getLength() {
    return this.nameList.length;
  }

  find_delete(val) {
    _.go(
      this.nameList,
      _.findIndex((i) => i===val),
      curry(_.removeByIndex)(this.nameList)
    )
  }

  push(data) {
    this.nameList.push(data);
    let nameTag = document.createElement('div', 'nameTag')
    nameTag.addEventListener('click', (e) => {
      this.find_delete(e.target.innerText);
      e.target.remove();
    });
    nameTag.innerText=data;
    this.el.appendChild(nameTag);
  }

  /**
   * A function used to append in target
   * @ko 컴포넌트를 targetElement에 추가
   * @param {Element} target destination Element
   */
  export(target) {
    target.append(this.el);
  }
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
  // 전처리
  _.filter(setArr, (item) => item.getLength() < limitH);
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

window._ = _;
window.ComponentSet = ComponentSet;

import Component from '@egjs/component';
import * as _ from 'partial-js';

function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
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



class componentSet extends Component {
  constructor() {
    super();
    this.el = createEl('div');
    this.el.classList.add('compoenetSet');
    _.go(
      appendClass(createEl('div'), 'close-btn'),
      this.el.appendChild.bind(this.el),
    ).innerText = 'x';
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

window._ = _;
window.componentSet = componentSet;

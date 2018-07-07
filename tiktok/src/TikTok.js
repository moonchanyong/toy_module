class TikTok {
  constructor() {
    this.qs = document.querySelector.bind(document);
    this.handler = {};
    this.listener = {};

    // revealing only public API
    let ret = {};
    ret.next = this.next.bind(this);
    ret.subscribe = this.subscribe.bind(this);
    ret.hasHandler = this.hasHandler.bind(this);
    ret.handler = this.handler;
    return ret;
  }

  on(el, type, f) {
    // TODO: el.outerHTML은 같은 속성에 같은 이름을 가진 태그라면 똑같이 실행된다. 고유 아이디값이 돔에 매핑되야 해결이된다. => (Symbol사용)
    if(!this.listener[type]) {
      this.listener[type] = {};
      document.addEventListener.call(document,
        type,
        (e) => {
          if(!!this.listener[type][e.target.outerHTML])
          this.listener[type][e.target.outerHTML].forEach((func)=>{func(e)});
        }
      );
    }

    this.listener[type] = this.listener[type] || {};
    this.listener[type][el.outerHTML] = this.listener[type][el] || [];
    this.listener[type][el.outerHTML].push(f);
  }

  enter(val) {
    let recl = this.enter.bind(this);
    return {
      do(f) {
        return recl(f(val));
      },
      getValue() { return val; },
      hi() {
        return recl(val);
      }
    }
  }

  checkType(val, type, msg) {
    type = type.toLowerCase();
    let pass = false;
    if(type === 'array' && Array.isArray(val)) pass = true;
    if(!pass && typeof val !== type) throw Error(msg);

    return this.enter(val);
  }

  trigger(keyword) {
    return (e) => {
      this.checkType.call(this, this.handler[keyword], 'array', 'error, report to writer')
      .hi()
      .getValue().forEach((f)=>{f(e)});
    }
  }

  /**
  * @ko dom찾아서 이벤트 핸들러 등록
  * @param {String} el it's selector of document
  * @param {String} type eventType
  * @param {String} keyword call handler type
  */
  next(selector, type, keyword) {
    let el = this.checkType(selector, 'string', 'selector is not string')
    .do(this.qs)
    .getValue();
    this.checkType(el, 'object', 'it is invalid selector');
    this.checkType(type, 'string', 'type is invalid');
    this.checkType(keyword, 'string', 'it is invalid keyword');

    // TODO: document로 바꿔야 함
    this.on(el, type, this.trigger(keyword));
  }

  pipe(...fs) {
    if(fs.length === 0 ) return (arg) => arg;
    return (...arg) => {
      let f = fs.shift();
      return pipe(...fs)(f(...arg));
    }
  }

  /**
  * @ko 키워드따라 실행 할 이벤트 등록
  * @param {String} keyword call handler type
  * @param {Function} handler event Handelr
  */
  subscribe(keyword, handler) {
    this.checkType(keyword, 'string', 'it is invalid keyword');
    // TODO: 파이프라인 지원 할 것인지 생각해봐야한다.
    // let func = this.pipe(...handler);
    this.handler[keyword] = this.handler[keyword] || [];
    this.handler[keyword].push(handler);
  }

  hasHandler(keyword, f) {
    if(!this.handler[keyword]) return false;
    for(let idx = 0; idx < this.handler[keyword].length; idx++)
      if(this.handler[keyword][idx] === f) return true;
    return false;
  }

  hasListener() {
  }
}

module.exports = new TikTok();

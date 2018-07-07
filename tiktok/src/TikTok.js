class TikTok {
  constructor() {
    this.qs = document.querySelector.bind(document);
    this.handler = {};
    this.listener = {};
    // TODO: reveal only public api
    let ret = {};
    ret.next = this.next.bind(this);
    ret.subscribe = this.subscribe.bind(this);
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
    this.checkType(el, 'object', 'it is invalid selector or element');
    this.checkType(type, 'string', 'type is invalid');
    this.checkType(keyword, 'string', 'it is invalid selector or element');

    // TODO: document로 바꿔야 함
    this.on(el, type, this.trigger(keyword));
  }

  /**
  * @ko 키워드따라 실행 할 이벤트 등록
  * @param {String} keyword call handler type
  * @param {Function} handler event Handelr
  */
  subscribe(keyword, handler) {

    this.handler[keyword] = this.handler[keyword] || [];
    this.handler[keyword].push(handler);
  }
}

module.exports = new TikTok();

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
    ret.hasListener = this.hasListener.bind(this);
    return ret;
  }

  // @TODO: keyword를 리스너에 저장하고 그 키워드로 핸드러를 실행하도록 하는 키워드 중심의 데이터 구조로 바꿔아한다.
  on(el, type, keyword) {
    if(!this.listener[type]) {
      this.listener[type] = {};
      document.addEventListener.call(document,
        type,
        (e) => {
          if(!!this.listener[type][e.target._uniqSymbol])
          Object.keys(this.listener[type][e.target._uniqSymbol])
          .forEach((_keyword) => { this.handler[_keyword].forEach(func => func(e)) });
        }
      );
    }
    if(!el._uniqSymbol) el._uniqSymbol = Symbol('uniq');
    this.listener[type] = this.listener[type] || {};
    this.listener[type][el._uniqSymbol] = this.listener[type][el._uniqSymbol] || {};
    this.listener[type][el._uniqSymbol][keyword] = keyword;
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

  /**
  * @ko dom찾아서 이벤트 핸들러 등록
  * @param {String} uri
  * @param {String} el it's selector of document
  * @param {String} type eventType
  * @param {String} keyword call handler type
  */
  next(uri) {
    let [selector, type, keyword] = uri.split('/').map((i) => i.trim());
    let el = this.checkType(selector, 'string', 'selector is not string')
    .do(this.qs)
    .getValue();
    this.checkType(el, 'object', 'it is invalid selector');
    this.checkType(type, 'string', 'type is invalid');
    this.checkType(keyword, 'string', 'it is invalid keyword');

    // TODO: document로 바꿔야 함
    this.on(el, type, keyword);
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

  /**
  * @TODO: @ko 이거 키워드로확인해야하는데 키워드로 확인하는 구분이 없음
  * @ko element에 특정 이벤트에 키워드가 등록되어 있는지 확인해야한다.
  */
  hasListener(uri) {
    let [selector, type, keyword] = uri.split('/').map((item) => item.trim());
    let el = this.checkType(selector, 'string', 'selector is not string')
    .do(this.qs)
    .getValue();
    this.checkType(el, 'object', 'it is invalid selector');
    this.checkType(type, 'string', 'type is invalid');
    this.checkType(keyword, 'string', 'type is invalid');

    return !!this.listener[type][el._uniqSymbol][keyword]
  }
}

module.exports = new TikTok();

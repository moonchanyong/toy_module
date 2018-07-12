class TikTok {
  /**
  * Create: next, subscribe
  * Read: hasHandler, hasListener
  * Update: replaceHandler, replaceListener
  * Delete:
  */

  constructor() {
    this.qs = document.querySelector.bind(document);
    this.handler = {};
    this.listener = {};

    // revealing only public API
    let ret = {};
    // create
    ret.next = this.next.bind(this);
    ret.subscribe = this.subscribe.bind(this);
    // read
    ret.hasHandler = this.hasHandler.bind(this);
    ret.hasListener = this.hasListener.bind(this);
    // update
    ret.replaceListener = this.replaceListener.bind(this);
    ret.replaceHandler = this.replaceHandler.bind(this);
    // delete
    ret.deleteListener = this.deleteListener.bind(this);
    ret.deleteHandler = this.deleteHandler.bind(this);
    return ret;
  }

  preProcessing(uri) {
    let [selector, type, keyword] = uri.split('/').map((item) => item.trim());
    let el = this.checkType(selector, 'string', 'selector is not string')
    .do(this.qs)
    .getValue();
    this.checkType(el, 'object', 'it is invalid selector');
    this.checkType(type, 'string', 'type is invalid');
    this.checkType(keyword, 'string', 'it is invalid keyword');
    return [el, type, keyword];
  }

  // @TODO: keyword를 리스너에 저장하고 그 키워드로 핸드러를 실행하도록 하는 키워드 중심의 데이터 구조로 바꿔아한다.
  on(el, type, keyword) {
    if(!this.listener[type]) {
      this.listener[type] = {};
      document.addEventListener.call(document,
        type,
        (e) => {
          if(!!this.listener[type][e.target._uniqSymbol]) {
            Object.keys(this.listener[type][e.target._uniqSymbol])
            .forEach((_keyword) => {
              if(!!this.handler[_keyword]) this.handler[_keyword].forEach(func => func(e));
            });
          }
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

  rm(arr, idx) {
    return arr.splice(idx, 1).length > 0;
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
    let [el, type, keyword] = this.preProcessing(uri);
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
  * @ko element에 특정 이벤트에 키워드가 등록되어 있는지 확인한다
  * @param {String} uri
  * @param {String} el it's selector of document
  * @param {String} type eventType
  * @param {String} keyword call handler type
  * @return {Boolean} @ko 가지고 있으면 리턴
  */
  hasListener(uri) {
    let [el, type, keyword] = this.preProcessing(uri);
    return !!this.listener[type][el._uniqSymbol][keyword]
  }

  /**
  * @ko 등록된 keyword의 핸들러를 다른 핸들러로 교체한다.
  * @param {String} keyword handler category
  * @param {String} dst @ko 원래 있는 핸들러
  * @param {String} src @ko 바꿀 핸들러
  * @return {Boolean} @ko 가지고 있으면 리턴
  */
  replaceHandler(keyword, dst, src) {
    const idx = this.handler[keyword].find(dst)-1;
    if(!idx) return false;
    this.handler[keyword][idx] = src;
    return true;
  }

  /**
  * @ko 등록된 트리거 키워드를 교체한다.
  * @param {String} el target element
  * @param {String} type target type
  * @param {String} keyword target keyword
  * @return {Boolean} is deleted
  */
  replaceListener(uri, newKeyword) {
    let [el, type, keyword] = this.preProcessing(uri);
    if(!this.listener[type][el._uniqSymbol][newKeyword]) throw new Error('it has been keyword')
    this.listener[type][el._uniqSymbol][newKeyword] = this.listener[type][el._uniqSymbol][keyword];
    return (delete this.listener[type][el._uniqSymbol][keyword]);

  }

  /**
  * @ko 등록된 keyword의 핸들러를 제거한다
  * @param {String} el target element
  * @param {String} type target type
  * @param {String} keyword target keyword
  * @return {Boolean} is deleted
  * FIXME: 리스너는 안지우고 남아있다.
  */
  deleteHandler(keyword, dst) {
    this.checkType(keyword, 'string', 'type is invalid');
    this.checkType(this.handler[keyword], 'array', 'handler is added no one');
    let idx = this.handler[keyword].findIndex((f) => dst===f);
    if(idx === -1) throw Error('there is no the function');
    return this.rm(this.handler[keyword], idx);
  }

  /**
  * @ko 등록된 keyword의 리스너를 제거한다
  * @param {String} el target element
  * @param {String} type target type
  * @param {String} keyword target keyword
  * @return {Boolean} is deleted
  * FIXME: 리스너는 안지우고 남아있다.
  */
  deleteListener(uri) {
    let [el, type, keyword] = this.preProcessing(uri);
    let ret = (delete this.listener[type][el._uniqSymbol][keyword]);
    return ret;
  }
}

module.exports = new TikTok();

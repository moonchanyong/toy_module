class TikTok {

  constructor() {
    this.on = document.addEventListener.bind(document);
    this.qs = document.querySelector.bind(document);
    this.handler = {};
    // TODO: reveal only public api
  }
  enter(val){
    let recl = this.enter.bind(this);
    return {
      do(f) {
        return recl(f(val));
      },
      getValue() { return val; }
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
      this.checkType(this.handler[keyword], 'array', 'error, report to writer')
      .getValue().forEach((f)=>{f(e)});
    }
  }

  /**
  *
  * @param {String} el it's selector of document
  * @param {String} type eventType
  * @param {String} keyword call handler type
  */
  next(selector, type, keyword) {
    let el = this.checkType(selector, 'string', 'selector is not string').do(this.qs).getValue();
    this.checkType(el, 'object', 'it is invalid selector or element');
    this.checkType(type, 'string', 'type is invalid');
    this.checkType(keyword, 'string', 'it is invalid selector or element');

    // TODO: document로 바꿔야 함
    // this.on(el, type, this.trigger(keyword));

    el.addEventListener(type, this.trigger(keyword));
  }

  subscribe(keyword, handler) {
    this.handler[keyword] = this.handler[keyword] || [];
    this.handler[keyword].push(handler);
  }
  // curry 적용 .. subscribe(function, f, f)(f)(f)(f) pipe로 하도록
}


export defaults TikTok;

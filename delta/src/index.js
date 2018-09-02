import { extend } from "./snippet";

export default class Delta {
    constructor(option) {
        this._state = option.state || {};
        this._transitions = option.transitions || {};
        return {
            _setState: this._setState.bind(this),
            setTransition: this.setTransition.bind(this),
            translate: this.translate.bind(this),
        };
    }

    // getter
    get state() {
        return this._state;
    }

    // setter

    // Interface
    setTransition(transitions) {
        this._transitions = extend(this._transitions, transitions);
    }

    translate(transition, payload) {
        const nextState = this._transitions[transition](this.state, payload);
        this._setState(nextState);
    }

    // private
    _trigger(...keys) {

    }

    _setState(state) {
        this._state = extend(this._state, state);
        this._trigger(...Object.keys(state));
    }
}
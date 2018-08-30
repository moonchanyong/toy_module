import { extend } from "./snippet";

export default class Delta {
    constructor(state) {
        this._state = state;
        return {
            setState: this.setState.bind(this),
        }
    }

    setState(state) {
        this._state = extend(this._state, state);
        this._trigger(...Object.keys(state));
        return this._state;
    }

    _trigger(...keys) {

    }
}
import { extend } from "./snippet";

export default class Delta {
    constructor(state) {
        this._state = state;
        this._actors = {};
        return {
            setState: this.setState.bind(this),
        }
    }

    setState(state) {
        this._state = extend(this._state, state);
        this._trigger(...Object.keys(state));
        return this._state;
    }

    setActor(key, actor) {
        this._actors[key] = actor;
    }

    _trigger(...keys) {

    }
}
import { extend } from "./snippet";

export default class Delta {
    constructor(option) {
        this._state = option.state || {};
        this._transitions = option.transitions || {};
        return {
            setState: this.setState.bind(this),
            setTransition: this.setTransition.bind(this),
        }
    }

    setState(state) {
        this._state = extend(this._state, state);
        this._trigger(...Object.keys(state));
    }

    setTransition(transitions) {
        this._transitions = extend(this._transitions, transitions);
    }

    _trigger(...keys) {

    }
}
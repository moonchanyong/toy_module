import {
    extend,
    containKeys,
    cloneObj
} from "./snippet";

export default class Delta {
    constructor(option) {
        this._state = option.state || {};
        this._transitions = option.transitions || {};
        return {
            setTransition: this.setTransition.bind(this),
            translate: this.translate.bind(this),
        };
    }

    // getter
    get state() {
        // 상태를 마음대로 바꿀 수 없도록
        return cloneObj(this._state);
    }

    // setter
    set state(state) {
        this._state = state;
    }

    // Interface
    setTransition(transitions) {
        this._transitions = extend(this._transitions, transitions);
    }

    translate(transition, payload) {
        const nextState = this._transitions[transition](this.state, payload);

        // 미리 선언된 상태가 유효한 경우에만 상태 적용
        this._setState(containKeys(this.state, nextState) ? nextState : this.state);
    }

    // private
    _trigger(...keys) {

    }

    _setState(state) {
        this.state = extend(this.state, state);
        this._trigger(...Object.keys(state));
    }
}
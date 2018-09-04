function extend(dst, src) {
    if (!isObject(dst) || !isObject(src)) return dst;
    const ret = cloneObj(dst);

    Object.keys(src).forEach(key => {
        ret[key] = src[key];
    });

    return ret;
}

function isObject(obj) {
    return typeof obj === "object";
}

function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// src는 dst의 부분집합인지 확인하는 함수
function containKeys(dst, src) {
    const keys = Object.keys(src);

    // filter를 통해서 dst에 없는 키만 남겨둔다.
    const invalidKeys= keys.filter(key => dst[key] === undefined || dst[key] === null);
    // 남은 key가 없으면 모두 유효한 key라서 true
    return !invalidKeys.length;
}

export default {
    extend,
    containKeys
};
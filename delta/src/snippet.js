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

export default {
    extend
};
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceState = void 0;
var react_1 = require("react");
var throttle_debounce_1 = require("throttle-debounce");
var useDebounceState = function (defaultValue, delay) {
    var _a = __read(react_1.useState(defaultValue), 2), debouncedValue = _a[0], setDebouncedValue = _a[1];
    var setValue = react_1.useMemo(function () {
        return throttle_debounce_1.debounce(delay, function (newValue) {
            setDebouncedValue(newValue);
        });
    }, [delay]);
    return [debouncedValue, setValue];
};
exports.useDebounceState = useDebounceState;
//# sourceMappingURL=useDebounceState.js.map
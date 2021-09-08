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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeepEqualState = void 0;
var react_1 = require("react");
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var useDeepEqualState = function (defaultValue) {
    var _a = __read(react_1.useState(defaultValue), 2), value = _a[0], setValue = _a[1];
    var customSetValue = react_1.useCallback(function (newValue) {
        setValue(function (prevValue) {
            var nextValue = typeof newValue === 'function'
                ? newValue(prevValue)
                : newValue;
            return fast_deep_equal_1.default(nextValue, prevValue) ? prevValue : nextValue;
        });
    }, [setValue]);
    return [value, customSetValue];
};
exports.useDeepEqualState = useDeepEqualState;
//# sourceMappingURL=useDeepEqualState.js.map
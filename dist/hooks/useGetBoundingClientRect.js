"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetBoundingClientRect = void 0;
var react_1 = require("react");
var throttle_debounce_1 = require("throttle-debounce");
// Cache bounding rect in a ref and only recompute every <delay>ms
var useGetBoundingClientRect = function (ref, delay) {
    if (delay === void 0) { delay = 200; }
    var boundingRect = react_1.useRef(null);
    var throttledCompute = react_1.useMemo(function () {
        return throttle_debounce_1.throttle(delay, true, function () {
            setTimeout(function () {
                var _a;
                return (boundingRect.current =
                    ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) || null);
            }, 0);
        });
    }, [ref, delay]);
    return react_1.useCallback(function (force) {
        var _a;
        if (force === void 0) { force = false; }
        if (force) {
            boundingRect.current = ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) || null;
        }
        else {
            throttledCompute();
        }
        return boundingRect.current;
    }, [ref, throttledCompute]);
};
exports.useGetBoundingClientRect = useGetBoundingClientRect;
//# sourceMappingURL=useGetBoundingClientRect.js.map
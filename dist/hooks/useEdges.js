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
exports.useEdges = void 0;
var react_1 = require("react");
var throttle_debounce_1 = require("throttle-debounce");
var useDeepEqualState_1 = require("./useDeepEqualState");
var useEdges = function (ref, width, height) {
    var _a = __read(useDeepEqualState_1.useDeepEqualState({
        top: true,
        right: true,
        bottom: true,
        left: true,
    }), 2), edges = _a[0], setEdges = _a[1];
    react_1.useEffect(function () {
        var onScroll = throttle_debounce_1.throttle(100, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            setEdges({
                top: ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.scrollTop) === 0,
                right: ((_b = ref.current) === null || _b === void 0 ? void 0 : _b.scrollLeft) ===
                    ((_d = (_c = ref.current) === null || _c === void 0 ? void 0 : _c.scrollWidth) !== null && _d !== void 0 ? _d : 0) - (width !== null && width !== void 0 ? width : 0),
                bottom: ((_e = ref.current) === null || _e === void 0 ? void 0 : _e.scrollTop) ===
                    ((_g = (_f = ref.current) === null || _f === void 0 ? void 0 : _f.scrollHeight) !== null && _g !== void 0 ? _g : 0) - (height !== null && height !== void 0 ? height : 0),
                left: ((_h = ref.current) === null || _h === void 0 ? void 0 : _h.scrollLeft) === 0,
            });
        });
        var current = ref.current;
        current === null || current === void 0 ? void 0 : current.addEventListener('scroll', onScroll);
        setTimeout(onScroll, 100);
        return function () {
            current === null || current === void 0 ? void 0 : current.removeEventListener('scroll', onScroll);
            onScroll.cancel();
        };
    }, [height, width, ref, setEdges]);
    return edges;
};
exports.useEdges = useEdges;
//# sourceMappingURL=useEdges.js.map
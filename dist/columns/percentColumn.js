"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.percentColumn = void 0;
var react_1 = __importStar(require("react"));
var TEN_TO_THE_12 = 1000000000000;
var TEN_TO_THE_10 = 10000000000;
// We turn percentages (numbers between 0 and 1) into string (between 0 and 100)
// We could have just multiply percentages by 100, but due to floating point arithmetic: 0.29 * 100 === 28.999999999999996
// So we have to round those numbers to 10 decimals before turning them into strings
var numberToString = function (value) {
    return typeof value === 'number' && !isNaN(value)
        ? String(Math.round(value * TEN_TO_THE_12) / TEN_TO_THE_10)
        : '';
};
var PercentComponent = react_1.default.memo(function (_a) {
    var focus = _a.focus, active = _a.active, rowData = _a.rowData, setRowData = _a.setRowData;
    // This is the same as in `floatColumn`
    var _b = __read(react_1.useState(numberToString(rowData)), 2), rawValue = _b[0], setRawValue = _b[1];
    var ref = react_1.useRef(null);
    // This is the same trick as in `textColumn`
    react_1.useLayoutEffect(function () {
        var _a, _b;
        if (focus) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.select();
        }
        else {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
    }, [focus]);
    // This is the same as in `floatColumn`
    react_1.useEffect(function () {
        if (!focus) {
            setRawValue(numberToString(rowData));
        }
    }, [focus, rowData]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { className: "dsg-input dsg-input-align-right", 
            // Important to prevent any undesired "tabbing"
            tabIndex: -1, ref: ref, 
            // This is the same trick as in `textColumn`
            style: { pointerEvents: focus ? 'auto' : 'none' }, 
            // We use the internal state, not the rowData
            value: rawValue, 
            // This is the same as in `floatColumn`, but we divide by 100 to have a percentage
            onChange: function (e) {
                var targetValue = e.target.value;
                var number = parseFloat(targetValue);
                setRawValue(targetValue);
                setRowData(!isNaN(number) && targetValue ? number / 100 : null);
            } }),
        react_1.default.createElement("span", { className: "dsg-input-suffix", 
            // Only show the "%" symbol on non-empty cells, or when cell is active, otherwise set opacity to 0
            style: {
                opacity: (rowData !== null && rowData !== undefined) || active
                    ? undefined
                    : 0,
            } }, "%")));
});
PercentComponent.displayName = 'PercentComponent';
exports.percentColumn = {
    component: PercentComponent,
    deleteValue: function () { return null; },
    copyValue: function (_a) {
        var rowData = _a.rowData;
        return rowData;
    },
    // This is the same as in `floatColumn`
    pasteValue: function (_a) {
        var value = _a.value;
        var number = parseFloat(value);
        return !isNaN(number) ? number : null;
    },
    isCellEmpty: function (_a) {
        var rowData = _a.rowData;
        return rowData === null || rowData === undefined;
    },
};
//# sourceMappingURL=percentColumn.js.map
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
exports.floatColumn = void 0;
var react_1 = __importStar(require("react"));
var numberToString = function (value) {
    return typeof value === 'number' && !isNaN(value) ? String(value) : '';
};
var FloatComponent = react_1.default.memo(function (_a) {
    var focus = _a.focus, rowData = _a.rowData, setRowData = _a.setRowData;
    // We keep an internal state of the input, we we directly use rowData weird things happen because we are trying
    // to parse the input value at every key stroke
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
    // When the cell looses focus, or when the value changes while the cell is not in focus, make sure to update
    // the internal state to match this new value (otherwise an oudated value would be displayed)
    react_1.useEffect(function () {
        if (!focus) {
            setRawValue(numberToString(rowData));
        }
    }, [focus, rowData]);
    return (react_1.default.createElement("input", { className: "dsg-input dsg-input-align-right", 
        // Important to prevent any undesired "tabbing"
        tabIndex: -1, ref: ref, 
        // This is the same trick as in `textColumn`
        style: { pointerEvents: focus ? 'auto' : 'none' }, 
        // We use the internal state, not the rowData
        value: rawValue, 
        // When value changes, we update the internal state without parsing anything (allowing the user to
        // type invalid data)
        // We also update the rowData, but with a parsed and checked value this time, so any invalid input
        // would become null
        onChange: function (e) {
            var targetValue = e.target.value;
            var number = parseFloat(targetValue);
            setRawValue(targetValue);
            setRowData(!isNaN(number) && targetValue ? number : null);
        } }));
});
FloatComponent.displayName = 'FloatComponent';
exports.floatColumn = {
    component: FloatComponent,
    deleteValue: function () { return null; },
    copyValue: function (_a) {
        var rowData = _a.rowData;
        return rowData;
    },
    // Because copyValue returns the number directly, and that number is automatically converted to a string, we can
    // use parseFloat to get back the original number
    // We still have to check for non parsable values and return null in those cases
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
//# sourceMappingURL=floatColumn.js.map
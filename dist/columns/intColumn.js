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
exports.intColumn = void 0;
var react_1 = __importStar(require("react"));
var numberToString = function (value) {
    return typeof value === 'number' && !isNaN(value) ? String(value) : '';
};
var IntComponent = react_1.default.memo(function (_a) {
    var focus = _a.focus, rowData = _a.rowData, setRowData = _a.setRowData;
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
    return (react_1.default.createElement("input", { className: "dsg-input dsg-input-align-right", 
        // Important to prevent any undesired "tabbing"
        tabIndex: -1, ref: ref, 
        // This is the same trick as in `textColumn`
        style: { pointerEvents: focus ? 'auto' : 'none' }, value: rawValue, 
        // This is the same as in `floatColumn`
        onChange: function (e) {
            var targetValue = e.target.value;
            var number = parseFloat(targetValue);
            setRawValue(targetValue);
            setRowData(!isNaN(number) && targetValue ? Math.round(number) : null);
        } }));
});
IntComponent.displayName = 'IntComponent';
exports.intColumn = {
    component: IntComponent,
    deleteValue: function () { return null; },
    copyValue: function (_a) {
        var rowData = _a.rowData;
        return rowData;
    },
    // This is the same as in `floatColumn`
    pasteValue: function (_a) {
        var value = _a.value;
        var number = parseFloat(value);
        return !isNaN(number) ? Math.round(number) : null;
    },
    isCellEmpty: function (_a) {
        var rowData = _a.rowData;
        return rowData === null || rowData === undefined;
    },
};
//# sourceMappingURL=intColumn.js.map
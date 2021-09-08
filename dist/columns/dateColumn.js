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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateColumn = void 0;
var react_1 = __importStar(require("react"));
var DateComponent = react_1.default.memo(function (_a) {
    var _b;
    var focus = _a.focus, active = _a.active, rowData = _a.rowData, setRowData = _a.setRowData;
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
    return (react_1.default.createElement("input", { className: "dsg-input", type: "date", 
        // Important to prevent any undesired "tabbing"
        tabIndex: -1, ref: ref, 
        // The `pointerEvents` trick is the same than in `textColumn`
        // The `opacity` trick is the same than in `percentColumn`
        style: {
            pointerEvents: focus ? 'auto' : 'none',
            opacity: rowData || active ? undefined : 0,
        }, 
        // Because rowData is a Date object and we need a string, we use toISOString...
        value: (_b = rowData === null || rowData === void 0 ? void 0 : rowData.toISOString().substr(0, 10)) !== null && _b !== void 0 ? _b : '', 
        // ...and the input returns a string that should be converted into a Date object
        onChange: function (e) {
            var date = new Date(e.target.value);
            setRowData(isNaN(date.getTime()) ? null : date);
        } }));
});
DateComponent.displayName = 'DateComponent';
exports.dateColumn = {
    component: DateComponent,
    deleteValue: function () { return null; },
    // We convert the date to a string for copying using toISOString
    copyValue: function (_a) {
        var rowData = _a.rowData;
        return rowData ? rowData.toISOString().substr(0, 10) : null;
    },
    // Because the Date constructor works using iso format, we can use it to parse ISO string back to a Date object
    pasteValue: function (_a) {
        var value = _a.value;
        var date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    },
    minWidth: 170,
    isCellEmpty: function (_a) {
        var rowData = _a.rowData;
        return !rowData;
    },
};
//# sourceMappingURL=dateColumn.js.map
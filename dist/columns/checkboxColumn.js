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
exports.checkboxColumn = void 0;
var react_1 = __importStar(require("react"));
// Those values are used when pasting values, all those values will be considered false, any other true
var FALSY = [
    '',
    'false',
    'no',
    'off',
    'disabled',
    '0',
    'n',
    'f',
    'unchecked',
    'undefined',
    'null',
    'wrong',
    'negative',
];
var CheckboxComponent = react_1.default.memo(function (_a) {
    var focus = _a.focus, rowData = _a.rowData, setRowData = _a.setRowData, active = _a.active, stopEditing = _a.stopEditing;
    var ref = react_1.useRef(null);
    // When cell becomes focus we immediately toggle the checkbox and blur the cell by calling `stopEditing`
    // Notice the `nextRow: false` to make sure the active cell does not go to the cell bellow and stays on this cell
    // This way the user can keep pressing Enter to toggle the checkbox on and off multiple times
    react_1.useLayoutEffect(function () {
        if (focus) {
            setRowData(!rowData);
            stopEditing({ nextRow: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focus, stopEditing]);
    return (react_1.default.createElement("input", { className: "dsg-checkbox", 
        // Important to prevent any undesired "tabbing"
        tabIndex: -1, type: "checkbox", ref: ref, checked: Boolean(rowData), 
        // When cell is not active, we allow the user to toggle the checkbox by clicking on it
        // When cell becomes active, we disable this feature and rely on focus instead (see `useLayoutEffect` above)
        onMouseDown: function () { return !active && setRowData(!rowData); }, onChange: function () { return null; } }));
});
CheckboxComponent.displayName = 'CheckboxComponent';
exports.checkboxColumn = {
    component: CheckboxComponent,
    deleteValue: function () { return false; },
    // We can customize what value is copied: when the checkbox is checked we copy YES, otherwise we copy NO
    copyValue: function (_a) {
        var rowData = _a.rowData;
        return (rowData ? 'YES' : 'NO');
    },
    // Since we copy custom values, we have to make sure pasting gives us the expected result
    // Here NO is included in the FALSY array, so it will be converted to false, YES is not, so it will be converted to true
    pasteValue: function (_a) {
        var value = _a.value;
        return !FALSY.includes(value.toLowerCase());
    },
    isCellEmpty: function (_a) {
        var rowData = _a.rowData;
        return !rowData;
    },
};
//# sourceMappingURL=checkboxColumn.js.map
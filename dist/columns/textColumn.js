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
exports.textColumn = void 0;
var react_1 = __importStar(require("react"));
var TextComponent = react_1.default.memo(function (_a) {
    var focus = _a.focus, rowData = _a.rowData, setRowData = _a.setRowData;
    var ref = react_1.useRef(null);
    react_1.useLayoutEffect(function () {
        var _a, _b;
        // When the cell gains focus we make sure to immediately select the text in the input:
        // - If the user gains focus by typing, it will replace the existing text, as expected
        // - If the user gains focus by clicking or pressing Enter, the text will be preserved and selected
        if (focus) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.select();
        }
        // When the cell looses focus (by pressing Esc or Enter) we make sure to blur the input
        // Otherwise the user would still see its cursor blinking
        else {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
    }, [focus]);
    return (react_1.default.createElement("input", { className: "dsg-input", 
        // Important to prevent any undesired "tabbing"
        tabIndex: -1, ref: ref, 
        // Make sure that while the cell is not focus, the user cannot interact with the input
        // The cursor will not change to "I", the style of the input will not change,
        // and the user cannot click and edit the input (this part should be handled by DataSheetGrid itself)
        style: { pointerEvents: focus ? 'auto' : 'none' }, 
        // This "|| ''" trick makes sure that we do not pass `null` as a value to the input, if we would pass null
        // the input would display the previous value it receives instead of being empty
        value: rowData || '', 
        // This "|| null" trick allows us to not have empty strings as value, we either have a non-empty string or null
        // Of course depending on your application this might not be desirable
        onChange: function (e) { return setRowData(e.target.value || null); } }));
});
TextComponent.displayName = 'TextComponent';
exports.textColumn = {
    component: TextComponent,
    // We decided to have null instead of empty strings, but we could also have chosen to do "() => ''"
    deleteValue: function () { return null; },
    copyValue: function (_a) {
        var rowData = _a.rowData;
        return rowData;
    },
    // Same thing here, replace empty strings by null
    pasteValue: function (_a) {
        var value = _a.value;
        return value ? value.replace(/[\n\r]+/g, ' ').trim() : null;
    },
};
//# sourceMappingURL=textColumn.js.map
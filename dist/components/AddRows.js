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
exports.AddRows = void 0;
var react_1 = __importStar(require("react"));
var AddRows = function (_a) {
    var addRows = _a.addRows;
    var _b = __read(react_1.useState(1), 2), value = _b[0], setValue = _b[1];
    var _c = __read(react_1.useState(String(value)), 2), rawValue = _c[0], setRawValue = _c[1];
    return (react_1.default.createElement("div", { className: "dsg-add-row" },
        react_1.default.createElement("button", { className: "dsg-add-row-btn", onClick: function () { return addRows(value); } }, "\u6DFB\u52A0"),
        ' ',
        react_1.default.createElement("input", { className: "dsg-add-row-input", value: rawValue, onBlur: function () { return setRawValue(String(value)); }, onChange: function (e) {
                setRawValue(e.target.value);
                setValue(Math.max(1, Math.round(parseInt(e.target.value) || 0)));
            }, onKeyPress: function (event) {
                if (event.key === 'Enter') {
                    addRows(value);
                }
            } }),
        ' ',
        "\u884C"));
};
exports.AddRows = AddRows;
//# sourceMappingURL=AddRows.js.map
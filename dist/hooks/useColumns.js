"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumns = void 0;
var react_1 = __importStar(require("react"));
var defaultComponent = function () { return react_1.default.createElement(react_1.default.Fragment, null); };
var defaultIsCellEmpty = function () { return false; };
var identityRow = function (_a) {
    var rowData = _a.rowData;
    return rowData;
};
var defaultCopyValue = function () { return null; };
var defaultGutterComponent = function (_a) {
    var rowIndex = _a.rowIndex;
    return (react_1.default.createElement(react_1.default.Fragment, null, rowIndex + 1));
};
var cellAlwaysEmpty = function () { return true; };
var useColumns = function (columns, gutterColumn, stickyRightColumn) {
    return react_1.useMemo(function () {
        var partialColumns = __spreadArray([
            __assign({ width: '0 0 40px', minWidth: 0, title: react_1.default.createElement("div", { className: "dsg-corner-indicator" }), component: defaultGutterComponent, isCellEmpty: cellAlwaysEmpty }, gutterColumn)
        ], __read(columns));
        if (stickyRightColumn) {
            partialColumns.push(__assign(__assign({ width: '0 0 40px', minWidth: 0 }, stickyRightColumn), { isCellEmpty: cellAlwaysEmpty }));
        }
        return partialColumns.map(function (column) { return (__assign({ width: 1, minWidth: 100, renderWhenScrolling: true, component: defaultComponent, disableKeys: false, disabled: false, keepFocus: false, deleteValue: identityRow, copyValue: defaultCopyValue, pasteValue: identityRow, isCellEmpty: defaultIsCellEmpty }, column)); });
    }, [gutterColumn, stickyRightColumn, columns]);
};
exports.useColumns = useColumns;
//# sourceMappingURL=useColumns.js.map
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticDataSheetGrid = void 0;
var react_1 = require("react");
var DataSheetGrid_1 = require("./DataSheetGrid");
var react_2 = __importDefault(require("react"));
exports.StaticDataSheetGrid = react_2.default.forwardRef(function (_a, ref) {
    var columns = _a.columns, gutterColumn = _a.gutterColumn, stickyRightColumn = _a.stickyRightColumn, addRowsComponent = _a.addRowsComponent, createRow = _a.createRow, duplicateRow = _a.duplicateRow, rest = __rest(_a, ["columns", "gutterColumn", "stickyRightColumn", "addRowsComponent", "createRow", "duplicateRow"]);
    var _b = __read(react_1.useState({
        columns: columns,
        gutterColumn: gutterColumn,
        stickyRightColumn: stickyRightColumn,
        addRowsComponent: addRowsComponent,
        createRow: createRow,
        duplicateRow: duplicateRow,
    }), 1), staticProps = _b[0];
    return react_2.default.createElement(DataSheetGrid_1.DataSheetGrid, __assign({}, staticProps, rest, { ref: ref }));
});
//# sourceMappingURL=StaticDataSheetGrid.js.map
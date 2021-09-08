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
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyColumn = void 0;
var react_1 = __importStar(require("react"));
var KeyComponent = function (_a) {
    var _b = _a.columnData, key = _b.key, original = _b.original, rowData = _a.rowData, setRowData = _a.setRowData, rest = __rest(_a, ["columnData", "rowData", "setRowData"]);
    // We use a ref so useCallback does not produce a new setKeyData function every time the rowData changes
    var rowDataRef = react_1.useRef(rowData);
    rowDataRef.current = rowData;
    // We wrap the setRowData function to assign the value to the desired key
    var setKeyData = react_1.useCallback(function (value) {
        var _a;
        setRowData(__assign(__assign({}, rowDataRef.current), (_a = {}, _a[key] = value, _a)));
    }, [key, setRowData]);
    if (!original.component) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    var Component = original.component;
    return (react_1.default.createElement(Component, __assign({ columnData: original.columnData, setRowData: setKeyData, 
        // We only pass the value of the desired key, this is why each cell does not have to re-render everytime
        // another cell in the same row changes!
        rowData: rowData[key] }, rest)));
};
var keyColumn = function (key, column) { return (__assign(__assign({ id: key }, column), { 
    // We pass the key and the original column as columnData to be able to retrieve them in the cell component
    columnData: { key: key, original: column }, component: KeyComponent, 
    // Here we simply wrap all functions to only pass the value of the desired key to the column, and not the entire row
    copyValue: function (_a) {
        var _b, _c;
        var rowData = _a.rowData, rowIndex = _a.rowIndex;
        return (_c = (_b = column.copyValue) === null || _b === void 0 ? void 0 : _b.call(column, { rowData: rowData[key], rowIndex: rowIndex })) !== null && _c !== void 0 ? _c : null;
    }, deleteValue: function (_a) {
        var _b;
        var _c, _d;
        var rowData = _a.rowData, rowIndex = _a.rowIndex;
        return (__assign(__assign({}, rowData), (_b = {}, _b[key] = (_d = (_c = column.deleteValue) === null || _c === void 0 ? void 0 : _c.call(column, { rowData: rowData[key], rowIndex: rowIndex })) !== null && _d !== void 0 ? _d : null, _b)));
    }, pasteValue: function (_a) {
        var _b;
        var _c, _d;
        var rowData = _a.rowData, value = _a.value, rowIndex = _a.rowIndex;
        return (__assign(__assign({}, rowData), (_b = {}, _b[key] = (_d = (_c = column.pasteValue) === null || _c === void 0 ? void 0 : _c.call(column, { rowData: rowData[key], value: value, rowIndex: rowIndex })) !== null && _d !== void 0 ? _d : null, _b)));
    }, disabled: typeof column.disabled === 'function'
        ? function (_a) {
            var _b;
            var rowData = _a.rowData, rowIndex = _a.rowIndex;
            return typeof column.disabled === 'function'
                ? column.disabled({ rowData: rowData[key], rowIndex: rowIndex })
                : (_b = column.disabled) !== null && _b !== void 0 ? _b : false;
        }
        : column.disabled, cellClassName: typeof column.cellClassName === 'function'
        ? function (_a) {
            var _b;
            var rowData = _a.rowData, rowIndex = _a.rowIndex;
            return typeof column.cellClassName === 'function'
                ? column.cellClassName({ rowData: rowData[key], rowIndex: rowIndex })
                : (_b = column.cellClassName) !== null && _b !== void 0 ? _b : undefined;
        }
        : column.cellClassName, isCellEmpty: function (_a) {
        var _b, _c;
        var rowData = _a.rowData, rowIndex = _a.rowIndex;
        return (_c = (_b = column.isCellEmpty) === null || _b === void 0 ? void 0 : _b.call(column, { rowData: rowData[key], rowIndex: rowIndex })) !== null && _c !== void 0 ? _c : false;
    } })); };
exports.keyColumn = keyColumn;
//# sourceMappingURL=keyColumn.js.map
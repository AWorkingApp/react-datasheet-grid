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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
var react_window_1 = require("react-window");
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var Cell_1 = require("./Cell");
var useFirstRender_1 = require("../hooks/useFirstRender");
var nullfunc = function () { return null; };
var RowComponent = react_1.default.memo(function (_a) {
    var index = _a.index, style = _a.style, data = _a.data, isScrolling = _a.isScrolling, columns = _a.columns, hasStickyRightColumn = _a.hasStickyRightColumn, active = _a.active, activeColIndex = _a.activeColIndex, editing = _a.editing, setRowData = _a.setRowData, deleteRows = _a.deleteRows, insertRowAfter = _a.insertRowAfter, duplicateRows = _a.duplicateRows, stopEditing = _a.stopEditing, getContextMenuItems = _a.getContextMenuItems;
    var firstRender = useFirstRender_1.useFirstRender();
    // True when we should render the light version (when we are scrolling)
    var renderLight = isScrolling && firstRender;
    var setGivenRowData = react_1.useCallback(function (rowData) {
        setRowData(index, rowData);
    }, [index, setRowData]);
    var deleteGivenRow = react_1.useCallback(function () {
        deleteRows(index);
    }, [deleteRows, index]);
    var duplicateGivenRow = react_1.useCallback(function () {
        duplicateRows(index);
    }, [duplicateRows, index]);
    var insertAfterGivenRow = react_1.useCallback(function () {
        insertRowAfter(index);
    }, [insertRowAfter, index]);
    return (react_1.default.createElement("div", { className: "dsg-row", style: style }, columns.map(function (column, i) {
        var Component = column.component;
        var disabled = column.disabled === true ||
            (typeof column.disabled === 'function' &&
                column.disabled({ rowData: data }));
        return (react_1.default.createElement(Cell_1.Cell, { key: i, gutter: i === 0, disabled: disabled, stickyRight: hasStickyRightColumn && i === columns.length - 1, column: column, active: active, className: classnames_1.default(!column.renderWhenScrolling && renderLight && 'dsg-cell-light') }, (column.renderWhenScrolling || !renderLight) && (react_1.default.createElement(Component, { rowData: data, getContextMenuItems: getContextMenuItems, disabled: disabled, active: activeColIndex === i - 1, columnIndex: i - 1, rowIndex: index, focus: activeColIndex === i - 1 && editing, deleteRow: deleteGivenRow, duplicateRow: duplicateGivenRow, stopEditing: activeColIndex === i - 1 && editing && stopEditing
                ? stopEditing
                : nullfunc, insertRowBelow: insertAfterGivenRow, setRowData: setGivenRowData, columnData: column.columnData }))));
    })));
}, function (prevProps, nextProps) {
    var prevIsScrolling = prevProps.isScrolling, prevRest = __rest(prevProps, ["isScrolling"]);
    var nextIsScrolling = nextProps.isScrolling, nextRest = __rest(nextProps
    // When we are scrolling always re-use previous render, otherwise check props
    , ["isScrolling"]);
    // When we are scrolling always re-use previous render, otherwise check props
    return nextIsScrolling || (!prevIsScrolling && react_window_1.areEqual(prevRest, nextRest));
});
RowComponent.displayName = 'RowComponent';
var Row = function (_a) {
    var _b, _c, _d, _e, _f;
    var index = _a.index, style = _a.style, data = _a.data, isScrolling = _a.isScrolling;
    // Do not render header row, it is rendered by the InnerContainer
    if (index === 0) {
        return null;
    }
    return (react_1.default.createElement(RowComponent, { index: index - 1, data: data.data[index - 1], columns: data.columns, style: __assign(__assign({}, style), { width: data.contentWidth ? data.contentWidth : '100%' }), hasStickyRightColumn: data.hasStickyRightColumn, isScrolling: isScrolling, active: Boolean(index - 1 >= ((_b = data.selectionMinRow) !== null && _b !== void 0 ? _b : Infinity) &&
            index - 1 <= ((_c = data.selectionMaxRow) !== null && _c !== void 0 ? _c : -Infinity) &&
            data.activeCell), activeColIndex: ((_d = data.activeCell) === null || _d === void 0 ? void 0 : _d.row) === index - 1 ? data.activeCell.col : null, editing: Boolean(((_e = data.activeCell) === null || _e === void 0 ? void 0 : _e.row) === index - 1 && data.editing), setRowData: data.setRowData, deleteRows: data.deleteRows, insertRowAfter: data.insertRowAfter, duplicateRows: data.duplicateRows, stopEditing: ((_f = data.activeCell) === null || _f === void 0 ? void 0 : _f.row) === index - 1 && data.editing
            ? data.stopEditing
            : undefined, getContextMenuItems: data.getContextMenuItems }));
};
exports.Row = Row;
//# sourceMappingURL=Row.js.map
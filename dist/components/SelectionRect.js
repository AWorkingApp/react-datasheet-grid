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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRect = void 0;
var react_1 = __importStar(require("react"));
var SelectionContext_1 = require("../contexts/SelectionContext");
var classnames_1 = __importDefault(require("classnames"));
var buildSquare = function (top, right, bottom, left) {
    return [
        [left, top],
        [right, top],
        [right, bottom],
        [left, bottom],
        [left, top],
    ];
};
var buildClipPath = function (top, right, bottom, left) {
    var values = __spreadArray(__spreadArray([], __read(buildSquare(0, '100%', '100%', 0))), __read(buildSquare(top, right, bottom, left)));
    return "polygon(evenodd, " + values
        .map(function (pair) {
        return pair
            .map(function (value) {
            return typeof value === 'number' && value !== 0 ? value + 'px' : value;
        })
            .join(' ');
    })
        .join(',') + ")";
};
exports.SelectionRect = react_1.default.memo(function () {
    var _a, _b, _c, _d;
    var _e = react_1.useContext(SelectionContext_1.SelectionContext), columnWidths = _e.columnWidths, columnRights = _e.columnRights, headerRowHeight = _e.headerRowHeight, selection = _e.selection, rowHeight = _e.rowHeight, activeCell = _e.activeCell, hasStickyRightColumn = _e.hasStickyRightColumn, dataLength = _e.dataLength, viewWidth = _e.viewWidth, viewHeight = _e.viewHeight, contentWidth = _e.contentWidth, edges = _e.edges, isCellDisabled = _e.isCellDisabled, editing = _e.editing;
    var activeCellIsDisabled = activeCell ? isCellDisabled(activeCell) : false;
    var selectionIsDisabled = react_1.useMemo(function () {
        if (!selection) {
            return activeCellIsDisabled;
        }
        for (var col = selection.min.col; col <= selection.max.col; ++col) {
            for (var row = selection.min.row; row <= selection.max.row; ++row) {
                if (!isCellDisabled({ col: col, row: row })) {
                    return false;
                }
            }
        }
        return true;
    }, [activeCellIsDisabled, isCellDisabled, selection]);
    if (!columnWidths || !columnRights) {
        return null;
    }
    var extraPixelV = function (rowI) {
        return rowI < dataLength - 1 ? 1 : 0;
    };
    var extraPixelH = function (colI) {
        return colI < columnWidths.length - (hasStickyRightColumn ? 3 : 2) ? 1 : 0;
    };
    var activeCellRect = activeCell && {
        width: columnWidths[activeCell.col + 1] + extraPixelH(activeCell.col),
        height: rowHeight + extraPixelV(activeCell.row),
        left: columnRights[activeCell.col],
        top: rowHeight * activeCell.row + headerRowHeight,
    };
    var selectionRect = selection && {
        width: columnWidths
            .slice(selection.min.col + 1, selection.max.col + 2)
            .reduce(function (a, b) { return a + b; }) + extraPixelH(selection.max.col),
        height: rowHeight * (selection.max.row - selection.min.row + 1) +
            extraPixelV(selection.max.row),
        left: columnRights[selection.min.col],
        top: rowHeight * selection.min.row + headerRowHeight,
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "dsg-scrollable-view-container", style: {
                height: dataLength * rowHeight + headerRowHeight,
                width: contentWidth ? contentWidth : '100%',
            } },
            react_1.default.createElement("div", { className: classnames_1.default({
                    'dsg-scrollable-view': true,
                    'dsg-scrollable-view-t': !edges.top,
                    'dsg-scrollable-view-r': !edges.right,
                    'dsg-scrollable-view-b': !edges.bottom,
                    'dsg-scrollable-view-l': !edges.left,
                }), style: {
                    top: headerRowHeight,
                    left: columnWidths[0],
                    height: viewHeight ? viewHeight - headerRowHeight : 0,
                    width: contentWidth && viewWidth
                        ? viewWidth -
                            columnWidths[0] -
                            (hasStickyRightColumn
                                ? columnWidths[columnWidths.length - 1]
                                : 0)
                        : "calc(100% - " + (columnWidths[0] +
                            (hasStickyRightColumn
                                ? columnWidths[columnWidths.length - 1]
                                : 0)) + "px)",
                } })),
        (selectionRect || activeCellRect) && (react_1.default.createElement("div", { className: "dsg-selection-col-marker-container", style: {
                left: (_a = selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.left) !== null && _a !== void 0 ? _a : activeCellRect === null || activeCellRect === void 0 ? void 0 : activeCellRect.left,
                width: (_b = selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.width) !== null && _b !== void 0 ? _b : activeCellRect === null || activeCellRect === void 0 ? void 0 : activeCellRect.width,
                height: dataLength * rowHeight + headerRowHeight,
            } },
            react_1.default.createElement("div", { className: classnames_1.default('dsg-selection-col-marker', selectionIsDisabled && 'dsg-selection-col-marker-disabled'), style: { top: headerRowHeight } }))),
        (selectionRect || activeCellRect) && (react_1.default.createElement("div", { className: "dsg-selection-row-marker-container", style: {
                top: (_c = selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.top) !== null && _c !== void 0 ? _c : activeCellRect === null || activeCellRect === void 0 ? void 0 : activeCellRect.top,
                height: (_d = selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.height) !== null && _d !== void 0 ? _d : activeCellRect === null || activeCellRect === void 0 ? void 0 : activeCellRect.height,
                width: contentWidth ? contentWidth : '100%',
            } },
            react_1.default.createElement("div", { className: classnames_1.default('dsg-selection-row-marker', selectionIsDisabled && 'dsg-selection-row-marker-disabled'), style: { left: columnWidths[0] } }))),
        activeCellRect && activeCell && (react_1.default.createElement("div", { className: classnames_1.default('dsg-active-cell', {
                'dsg-active-cell-focus': editing,
                'dsg-active-cell-disabled': activeCellIsDisabled,
            }), style: activeCellRect })),
        selectionRect && activeCellRect && (react_1.default.createElement("div", { className: classnames_1.default('dsg-selection-rect', selectionIsDisabled && 'dsg-selection-rect-disabled'), style: __assign(__assign({}, selectionRect), { clipPath: buildClipPath(activeCellRect.top - selectionRect.top, activeCellRect.left - selectionRect.left, activeCellRect.top + activeCellRect.height - selectionRect.top, activeCellRect.left + activeCellRect.width - selectionRect.left) }) }))));
});
exports.SelectionRect.displayName = 'SelectionRect';
//# sourceMappingURL=SelectionRect.js.map
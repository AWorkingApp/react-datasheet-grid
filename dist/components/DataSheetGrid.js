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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.DataSheetGrid = void 0;
var react_1 = __importStar(require("react"));
var react_window_1 = require("react-window");
require("../style.css");
var Row_1 = require("./Row");
var useColumnWidths_1 = require("../hooks/useColumnWidths");
var react_resize_detector_1 = require("react-resize-detector");
var InnerContainer_1 = require("./InnerContainer");
var HeaderContext_1 = require("../contexts/HeaderContext");
var useColumns_1 = require("../hooks/useColumns");
var useMemoObject_1 = require("../hooks/useMemoObject");
var SelectionContext_1 = require("../contexts/SelectionContext");
var useEdges_1 = require("../hooks/useEdges");
var useDeepEqualState_1 = require("../hooks/useDeepEqualState");
var useDocumentEventListener_1 = require("../hooks/useDocumentEventListener");
var useGetBoundingClientRect_1 = require("../hooks/useGetBoundingClientRect");
var AddRows_1 = require("./AddRows");
var useDebounceState_1 = require("../hooks/useDebounceState");
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var ContextMenu_1 = require("./ContextMenu");
var copyPasting_1 = require("../utils/copyPasting");
var DEFAULT_DATA = [];
var DEFAULT_COLUMNS = [];
var DEFAULT_CREATE_ROW = function () { return ({}); };
var DEFAULT_ON_CHANGE = function () { return null; };
var DEFAULT_DUPLICATE_ROW = function (_a) {
    var rowData = _a.rowData;
    return (__assign({}, rowData));
};
var DEFAULT_IS_ROW_EMPTY = function (_a) {
    var rowData = _a.rowData;
    return Object.values(rowData).every(function (value) { return !value; });
};
exports.DataSheetGrid = react_1.default.memo(function (_a) {
    var _b, _c, _d, _e;
    var _f = _a.data, data = _f === void 0 ? DEFAULT_DATA : _f, _g = _a.height, maxHeight = _g === void 0 ? 400 : _g, _h = _a.onChange, onChange = _h === void 0 ? DEFAULT_ON_CHANGE : _h, _j = _a.columns, rawColumns = _j === void 0 ? DEFAULT_COLUMNS : _j, _k = _a.rowHeight, rowHeight = _k === void 0 ? 40 : _k, _l = _a.headerRowHeight, headerRowHeight = _l === void 0 ? rowHeight : _l, gutterColumn = _a.gutterColumn, stickyRightColumn = _a.stickyRightColumn, _m = _a.addRowsComponent, AddRowsComponent = _m === void 0 ? AddRows_1.AddRows : _m, _o = _a.createRow, createRow = _o === void 0 ? DEFAULT_CREATE_ROW : _o, _p = _a.autoAddRow, autoAddRow = _p === void 0 ? false : _p, _q = _a.lockRows, lockRows = _q === void 0 ? false : _q, _r = _a.duplicateRow, duplicateRow = _r === void 0 ? DEFAULT_DUPLICATE_ROW : _r, _s = _a.isRowEmpty, isRowEmpty = _s === void 0 ? DEFAULT_IS_ROW_EMPTY : _s, _t = _a.contextMenuComponent, ContextMenuComponent = _t === void 0 ? ContextMenu_1.ContextMenu : _t, _u = _a.disableContextMenu, disableContextMenuRaw = _u === void 0 ? false : _u;
    var disableContextMenu = disableContextMenuRaw || lockRows;
    var columns = useColumns_1.useColumns(rawColumns, gutterColumn, stickyRightColumn);
    var hasStickyRightColumn = Boolean(stickyRightColumn);
    var listRef = react_1.useRef(null);
    var innerRef = react_1.useRef(null);
    var outerRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var _a;
        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(0);
    }, [headerRowHeight, rowHeight]);
    var _v = __read(useDebounceState_1.useDebounceState(0, 100), 2), heightDiff = _v[0], setHeightDiff = _v[1];
    // Height of the list (including scrollbars and borders) to display
    var displayHeight = Math.min(maxHeight, headerRowHeight + data.length * rowHeight + heightDiff);
    // Width and height of the scrollable area
    var _w = react_resize_detector_1.useResizeDetector({
        targetRef: outerRef,
        refreshMode: 'throttle',
        refreshRate: 100,
    }), width = _w.width, height = _w.height;
    setHeightDiff(height ? displayHeight - height : 0);
    var edges = useEdges_1.useEdges(outerRef, width, height);
    var _x = useColumnWidths_1.useColumnWidths(columns, width), fullWidth = _x.fullWidth, contentWidth = _x.totalWidth, columnWidths = _x.columnWidths, columnRights = _x.columnRights;
    // x,y coordinates of the right click
    var _y = __read(react_1.useState(null), 2), contextMenu = _y[0], setContextMenu = _y[1];
    // Items of the context menu
    var _z = __read(react_1.useState([]), 2), contextMenuItems = _z[0], setContextMenuItems = _z[1];
    // True when the active cell is being edited
    var _0 = __read(react_1.useState(false), 2), editing = _0[0], setEditing = _0[1];
    // Highlighted cell, null when not focused
    var _1 = __read(useDeepEqualState_1.useDeepEqualState(null), 2), activeCell = _1[0], setActiveCell = _1[1];
    // The selection cell and the active cell are the two corners of the selection, null when nothing is selected
    var _2 = __read(useDeepEqualState_1.useDeepEqualState(null), 2), selectionCell = _2[0], setSelectionCell = _2[1];
    // Min and max of the current selection (rectangle defined by the active cell and the selection cell), null when nothing is selected
    var selection = react_1.useMemo(function () {
        return activeCell &&
            selectionCell && {
            min: {
                col: Math.min(activeCell.col, selectionCell.col),
                row: Math.min(activeCell.row, selectionCell.row),
            },
            max: {
                col: Math.max(activeCell.col, selectionCell.col),
                row: Math.max(activeCell.row, selectionCell.row),
            },
        };
    }, [activeCell, selectionCell]);
    // Behavior of the selection when the user drags the mouse around
    var _3 = __read(useDeepEqualState_1.useDeepEqualState({
        // True when the position of the cursor should impact the columns of the selection
        columns: false,
        // True when the position of the cursor should impact the rows of the selection
        rows: false,
        // True when the user is dragging the mouse around to select
        active: false,
    }), 2), selectionMode = _3[0], setSelectionMode = _3[1];
    var getInnerBoundingClientRect = useGetBoundingClientRect_1.useGetBoundingClientRect(innerRef);
    var getOuterBoundingClientRect = useGetBoundingClientRect_1.useGetBoundingClientRect(outerRef);
    // Blur any element on focusing the grid
    react_1.useEffect(function () {
        var _a;
        if (activeCell !== null) {
            ;
            document.activeElement.blur();
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCell !== null]);
    // Extract the coordinates of the cursor from a mouse event
    var getCursorIndex = react_1.useCallback(function (event, force, includeSticky) {
        if (force === void 0) { force = false; }
        if (includeSticky === void 0) { includeSticky = false; }
        var innerBoundingClientRect = getInnerBoundingClientRect(force);
        var outerBoundingClientRect = includeSticky && getOuterBoundingClientRect(force);
        if (innerBoundingClientRect && columnRights && columnWidths) {
            var x_1 = event.clientX - innerBoundingClientRect.left;
            var y = event.clientY - innerBoundingClientRect.top;
            if (outerBoundingClientRect) {
                if (event.clientY - outerBoundingClientRect.top <=
                    headerRowHeight) {
                    y = 0;
                }
                if (event.clientX - outerBoundingClientRect.left <=
                    columnWidths[0]) {
                    x_1 = 0;
                }
                if (hasStickyRightColumn &&
                    outerBoundingClientRect.right - event.clientX <=
                        columnWidths[columnWidths.length - 1]) {
                    x_1 = columnRights[columnRights.length - 2] + 1;
                }
            }
            return {
                col: columnRights.findIndex(function (right) { return x_1 < right; }) - 1,
                row: Math.min(data.length - 1, Math.max(-1, Math.floor((y - headerRowHeight) / rowHeight))),
            };
        }
        return null;
    }, [
        columnRights,
        columnWidths,
        data.length,
        getInnerBoundingClientRect,
        getOuterBoundingClientRect,
        headerRowHeight,
        rowHeight,
        hasStickyRightColumn,
    ]);
    var dataRef = react_1.useRef(data);
    dataRef.current = data;
    var isCellDisabled = react_1.useCallback(function (cell) {
        var disabled = columns[cell.col + 1].disabled;
        return Boolean(typeof disabled === 'function'
            ? disabled({ rowData: dataRef.current[cell.row] })
            : disabled);
    }, [columns]);
    var insertRowAfter = react_1.useCallback(function (row, count) {
        if (count === void 0) { count = 1; }
        if (lockRows) {
            return;
        }
        setSelectionCell(null);
        setEditing(false);
        onChange(__spreadArray(__spreadArray(__spreadArray([], __read(dataRef.current.slice(0, row + 1))), __read(new Array(count).fill(0).map(createRow))), __read(dataRef.current.slice(row + 1))));
        setActiveCell(function (a) { return ({ col: (a === null || a === void 0 ? void 0 : a.col) || 0, row: row + count }); });
    }, [createRow, lockRows, onChange, setActiveCell, setSelectionCell]);
    var duplicateRows = react_1.useCallback(function (rowMin, rowMax) {
        if (rowMax === void 0) { rowMax = rowMin; }
        if (lockRows) {
            return;
        }
        onChange(__spreadArray(__spreadArray(__spreadArray([], __read(dataRef.current.slice(0, rowMax + 1))), __read(dataRef.current
            .slice(rowMin, rowMax + 1)
            .map(function (rowData) { return duplicateRow({ rowData: rowData }); }))), __read(dataRef.current.slice(rowMax + 1))));
        setActiveCell({ col: 0, row: rowMax + 1 });
        setSelectionCell({
            col: columns.length - (hasStickyRightColumn ? 3 : 2),
            row: 2 * rowMax - rowMin + 1,
        });
        setEditing(false);
    }, [
        columns.length,
        duplicateRow,
        lockRows,
        onChange,
        setActiveCell,
        setSelectionCell,
        hasStickyRightColumn,
    ]);
    // Scroll to any given cell making sure it is in view
    var scrollTo = react_1.useCallback(function (cell) {
        var _a, _b, _c;
        if (!height || !width) {
            return;
        }
        // Align top
        var topMax = cell.row * rowHeight;
        // Align bottom
        var topMin = (cell.row + 1) * rowHeight + headerRowHeight - height + 1;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        var scrollTop = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.state.scrollOffset;
        if (scrollTop > topMax) {
            (_b = listRef.current) === null || _b === void 0 ? void 0 : _b.scrollTo(topMax);
        }
        else if (scrollTop < topMin) {
            (_c = listRef.current) === null || _c === void 0 ? void 0 : _c.scrollTo(topMin);
        }
        if (columnRights && columnWidths && outerRef.current) {
            // Align left
            var leftMax = columnRights[cell.col] - columnRights[0];
            // Align right
            var leftMin = columnRights[cell.col] +
                columnWidths[cell.col + 1] +
                (hasStickyRightColumn ? columnWidths[columnWidths.length - 1] : 0) -
                width +
                1;
            var scrollLeft = outerRef.current.scrollLeft;
            if (scrollLeft > leftMax) {
                outerRef.current.scrollLeft = leftMax;
            }
            else if (scrollLeft < leftMin) {
                outerRef.current.scrollLeft = leftMin;
            }
        }
    }, [
        height,
        width,
        rowHeight,
        headerRowHeight,
        columnRights,
        columnWidths,
        hasStickyRightColumn,
    ]);
    // Scroll to the selectionCell cell when it changes
    react_1.useEffect(function () {
        if (selectionCell) {
            scrollTo(selectionCell);
        }
    }, [selectionCell, scrollTo]);
    // Scroll to the active cell when it changes
    react_1.useEffect(function () {
        if (activeCell) {
            scrollTo(activeCell);
        }
    }, [activeCell, scrollTo]);
    var setRowData = react_1.useCallback(function (rowIndex, item) {
        var _a, _b;
        onChange(__spreadArray(__spreadArray(__spreadArray([], __read((_a = dataRef.current) === null || _a === void 0 ? void 0 : _a.slice(0, rowIndex))), [
            item
        ]), __read((_b = dataRef.current) === null || _b === void 0 ? void 0 : _b.slice(rowIndex + 1))));
    }, [onChange]);
    var deleteRows = react_1.useCallback(function (rowMin, rowMax) {
        if (rowMax === void 0) { rowMax = rowMin; }
        if (lockRows) {
            return;
        }
        setEditing(false);
        setActiveCell(function (a) {
            var row = Math.min(dataRef.current.length - 2 - rowMax + rowMin, rowMin);
            if (row < 0) {
                return null;
            }
            return a && __assign(__assign({}, a), { row: row });
        });
        setSelectionCell(null);
        onChange(__spreadArray(__spreadArray([], __read(dataRef.current.slice(0, rowMin))), __read(dataRef.current.slice(rowMax + 1))));
    }, [lockRows, onChange, setActiveCell, setSelectionCell]);
    var deleteSelection = react_1.useCallback(function (smartDelete) {
        if (smartDelete === void 0) { smartDelete = true; }
        if (!activeCell) {
            return;
        }
        var min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
        var max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;
        if (data
            .slice(min.row, max.row + 1)
            .every(function (rowData) { return isRowEmpty({ rowData: rowData }); })) {
            if (smartDelete) {
                deleteRows(min.row, max.row);
            }
            return;
        }
        var newData = __spreadArray([], __read(data));
        for (var row = min.row; row <= max.row; ++row) {
            for (var col = min.col; col <= max.col; ++col) {
                if (!isCellDisabled({ col: col, row: row })) {
                    var _a = columns[col + 1].deleteValue, deleteValue = _a === void 0 ? function (_a) {
                        var rowData = _a.rowData;
                        return rowData;
                    } : _a;
                    newData[row] = deleteValue({ rowData: newData[row] });
                }
            }
        }
        if (smartDelete && fast_deep_equal_1.default(newData, data)) {
            setActiveCell({ col: 0, row: min.row });
            setSelectionCell({
                col: columns.length - (hasStickyRightColumn ? 3 : 2),
                row: max.row,
            });
            return;
        }
        onChange(newData);
    }, [
        activeCell,
        columns,
        data,
        deleteRows,
        isCellDisabled,
        isRowEmpty,
        onChange,
        selection === null || selection === void 0 ? void 0 : selection.max,
        selection === null || selection === void 0 ? void 0 : selection.min,
        setActiveCell,
        setSelectionCell,
        hasStickyRightColumn,
    ]);
    var stopEditing = react_1.useCallback(function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.nextRow, nextRow = _c === void 0 ? true : _c;
        if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) === dataRef.current.length - 1) {
            if (nextRow && autoAddRow) {
                insertRowAfter(activeCell.row);
            }
            else {
                setEditing(false);
            }
        }
        else {
            setEditing(false);
            if (nextRow) {
                setActiveCell(function (a) { return a && __assign(__assign({}, a), { row: a.row + 1 }); });
            }
        }
    }, [activeCell === null || activeCell === void 0 ? void 0 : activeCell.row, autoAddRow, insertRowAfter, setActiveCell]);
    var onCopy = react_1.useCallback(function (event) {
        var _a;
        if (!editing && activeCell) {
            var copyData = [];
            var min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
            var max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;
            for (var row = min.row; row <= max.row; ++row) {
                copyData.push([]);
                for (var col = min.col; col <= max.col; ++col) {
                    var _b = columns[col + 1].copyValue, copyValue = _b === void 0 ? function () { return null; } : _b;
                    copyData[row - min.row].push(copyValue({ rowData: data[row] }));
                }
            }
            (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData('text/plain', copyData.map(function (row) { return row.join('\t'); }).join('\n'));
            event.preventDefault();
        }
    }, [activeCell, columns, data, editing, selection]);
    useDocumentEventListener_1.useDocumentEventListener('copy', onCopy);
    var onCut = react_1.useCallback(function (event) {
        if (!editing && activeCell) {
            onCopy(event);
            deleteSelection(false);
            event.preventDefault();
        }
    }, [activeCell, deleteSelection, editing, onCopy]);
    useDocumentEventListener_1.useDocumentEventListener('cut', onCut);
    var onPaste = react_1.useCallback(function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var clipBoardData, pasteData, min, max, newData, columnIndex, pasteValue, rowIndex, _a, _b, newData, missingRows, columnIndex, pasteValue, rowIndex, _c, _d;
        var _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!(!editing && activeCell)) return [3 /*break*/, 15];
                    clipBoardData = (_f = (_e = event.clipboardData) === null || _e === void 0 ? void 0 : _e.getData('text')) !== null && _f !== void 0 ? _f : (_g = event.clipboardData) === null || _g === void 0 ? void 0 : _g.getData('text/plain');
                    pasteData = clipBoardData ? copyPasting_1.parseData(clipBoardData) : [];
                    min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
                    max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;
                    if (!(pasteData.length === 1)) return [3 /*break*/, 7];
                    newData = __spreadArray([], __read(data));
                    columnIndex = 0;
                    _k.label = 1;
                case 1:
                    if (!(columnIndex < pasteData[0].length)) return [3 /*break*/, 6];
                    pasteValue = (_h = columns[min.col + columnIndex + 1]) === null || _h === void 0 ? void 0 : _h.pasteValue;
                    if (!pasteValue) return [3 /*break*/, 5];
                    rowIndex = min.row;
                    _k.label = 2;
                case 2:
                    if (!(rowIndex <= max.row)) return [3 /*break*/, 5];
                    if (!!isCellDisabled({
                        col: columnIndex + min.col,
                        row: rowIndex,
                    })) return [3 /*break*/, 4];
                    _a = newData;
                    _b = rowIndex;
                    return [4 /*yield*/, pasteValue({
                            rowData: newData[rowIndex],
                            value: pasteData[0][columnIndex],
                        })];
                case 3:
                    _a[_b] = _k.sent();
                    _k.label = 4;
                case 4:
                    rowIndex++;
                    return [3 /*break*/, 2];
                case 5:
                    columnIndex++;
                    return [3 /*break*/, 1];
                case 6:
                    onChange(newData);
                    setActiveCell({ col: min.col, row: min.row });
                    setSelectionCell({
                        col: min.col + pasteData[0].length - 1,
                        row: max.row,
                    });
                    return [3 /*break*/, 14];
                case 7:
                    newData = __spreadArray([], __read(data));
                    missingRows = min.row + pasteData.length - data.length;
                    if (missingRows > 0) {
                        if (!lockRows) {
                            newData = __spreadArray(__spreadArray([], __read(newData)), __read(new Array(missingRows).fill(0).map(function () { return createRow(); })));
                        }
                        else {
                            pasteData.splice(pasteData.length - missingRows, missingRows);
                        }
                    }
                    columnIndex = 0;
                    _k.label = 8;
                case 8:
                    if (!(columnIndex < pasteData[0].length &&
                        min.col + columnIndex <
                            columns.length - (hasStickyRightColumn ? 2 : 1))) return [3 /*break*/, 13];
                    pasteValue = (_j = columns[min.col + columnIndex + 1]) === null || _j === void 0 ? void 0 : _j.pasteValue;
                    if (!pasteValue) return [3 /*break*/, 12];
                    rowIndex = 0;
                    _k.label = 9;
                case 9:
                    if (!(rowIndex < pasteData.length)) return [3 /*break*/, 12];
                    if (!!isCellDisabled({
                        col: min.col + columnIndex,
                        row: min.row + rowIndex,
                    })) return [3 /*break*/, 11];
                    _c = newData;
                    _d = min.row + rowIndex;
                    return [4 /*yield*/, pasteValue({
                            rowData: newData[min.row + rowIndex],
                            value: pasteData[rowIndex][columnIndex],
                        })];
                case 10:
                    _c[_d] = _k.sent();
                    _k.label = 11;
                case 11:
                    rowIndex++;
                    return [3 /*break*/, 9];
                case 12:
                    columnIndex++;
                    return [3 /*break*/, 8];
                case 13:
                    onChange(newData);
                    setActiveCell({ col: min.col, row: min.row });
                    setSelectionCell({
                        col: Math.min(min.col + pasteData[0].length - 1, columns.length - (hasStickyRightColumn ? 3 : 2)),
                        row: min.row + pasteData.length - 1,
                    });
                    _k.label = 14;
                case 14:
                    event.preventDefault();
                    _k.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    }); }, [
        activeCell,
        columns,
        createRow,
        data,
        editing,
        hasStickyRightColumn,
        isCellDisabled,
        lockRows,
        onChange,
        selection === null || selection === void 0 ? void 0 : selection.max,
        selection === null || selection === void 0 ? void 0 : selection.min,
        setActiveCell,
        setSelectionCell,
    ]);
    useDocumentEventListener_1.useDocumentEventListener('paste', onPaste);
    var onMouseDown = react_1.useCallback(function (event) {
        var _a;
        if (contextMenu && contextMenuItems.length) {
            return;
        }
        var rightClick = event.button === 2;
        var clickInside = ((_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) || false;
        var cursorIndex = clickInside
            ? getCursorIndex(event, true, true)
            : null;
        if (!clickInside &&
            editing &&
            activeCell &&
            columns[activeCell.col + 1].keepFocus) {
            return;
        }
        var clickOnActiveCell = cursorIndex &&
            activeCell &&
            activeCell.col === cursorIndex.col &&
            activeCell.row === cursorIndex.row &&
            !isCellDisabled(activeCell);
        if (clickOnActiveCell && editing) {
            return;
        }
        var clickOnStickyRightColumn = (cursorIndex === null || cursorIndex === void 0 ? void 0 : cursorIndex.col) === columns.length - 2 && hasStickyRightColumn;
        var rightClickInSelection = rightClick &&
            selection &&
            cursorIndex &&
            cursorIndex.row >= selection.min.row &&
            cursorIndex.row <= selection.max.row &&
            cursorIndex.col >= selection.min.col &&
            cursorIndex.col <= selection.max.col;
        var rightClickOnSelectedHeaders = rightClick &&
            selection &&
            cursorIndex &&
            cursorIndex.row === -1 &&
            cursorIndex.col >= selection.min.col &&
            cursorIndex.col <= selection.max.col;
        var rightClickOnSelectedGutter = rightClick &&
            selection &&
            cursorIndex &&
            cursorIndex.row >= selection.min.row &&
            cursorIndex.row <= selection.max.row &&
            cursorIndex.col === -1;
        var clickOnSelectedStickyRightColumn = clickOnStickyRightColumn &&
            selection &&
            cursorIndex &&
            cursorIndex.row >= selection.min.row &&
            cursorIndex.row <= selection.max.row;
        if (rightClick && !disableContextMenu) {
            setContextMenu({ x: event.clientX, y: event.clientY });
        }
        if (!(event.shiftKey && activeCell) || rightClick) {
            setActiveCell(cursorIndex && {
                col: (rightClickInSelection || rightClickOnSelectedHeaders) &&
                    activeCell
                    ? activeCell.col
                    : Math.max(0, clickOnStickyRightColumn ? 0 : cursorIndex.col),
                row: (rightClickInSelection ||
                    rightClickOnSelectedGutter ||
                    clickOnSelectedStickyRightColumn) &&
                    activeCell
                    ? activeCell.row
                    : Math.max(0, cursorIndex.row),
            });
        }
        setEditing(Boolean(clickOnActiveCell && !rightClick));
        setSelectionMode(cursorIndex && !rightClick
            ? {
                columns: (cursorIndex.col !== -1 && !clickOnStickyRightColumn) ||
                    Boolean(event.shiftKey && activeCell),
                rows: cursorIndex.row !== -1 ||
                    Boolean(event.shiftKey && activeCell),
                active: true,
            }
            : {
                columns: false,
                rows: false,
                active: false,
            });
        if (event.shiftKey && activeCell && !rightClick) {
            setSelectionCell(cursorIndex && {
                col: Math.max(0, cursorIndex.col - (clickOnStickyRightColumn ? 1 : 0)),
                row: Math.max(0, cursorIndex.row),
            });
        }
        else if (!rightClickInSelection) {
            if (cursorIndex &&
                ((cursorIndex === null || cursorIndex === void 0 ? void 0 : cursorIndex.col) === -1 ||
                    (cursorIndex === null || cursorIndex === void 0 ? void 0 : cursorIndex.row) === -1 ||
                    clickOnStickyRightColumn)) {
                var col = cursorIndex.col;
                var row = cursorIndex.row;
                if (cursorIndex.col === -1 || clickOnStickyRightColumn) {
                    col = columns.length - (hasStickyRightColumn ? 3 : 2);
                }
                if (cursorIndex.row === -1) {
                    row = data.length - 1;
                }
                if (rightClickOnSelectedHeaders && selectionCell) {
                    col = selectionCell.col;
                }
                if ((rightClickOnSelectedGutter ||
                    clickOnSelectedStickyRightColumn) &&
                    selectionCell) {
                    row = selectionCell.row;
                }
                setSelectionCell({ col: col, row: row });
            }
            else {
                setSelectionCell(null);
            }
            if (clickInside) {
                event.preventDefault();
            }
        }
    }, [
        contextMenu,
        contextMenuItems.length,
        getCursorIndex,
        editing,
        activeCell,
        columns,
        isCellDisabled,
        selection,
        hasStickyRightColumn,
        disableContextMenu,
        setSelectionMode,
        setActiveCell,
        setSelectionCell,
        selectionCell,
        data.length,
    ]);
    useDocumentEventListener_1.useDocumentEventListener('mousedown', onMouseDown);
    var onMouseUp = react_1.useCallback(function () {
        setSelectionMode({
            columns: false,
            rows: false,
            active: false,
        });
    }, [setSelectionMode]);
    useDocumentEventListener_1.useDocumentEventListener('mouseup', onMouseUp);
    var onMouseMove = react_1.useCallback(function (event) {
        if (selectionMode.active) {
            var cursorIndex = getCursorIndex(event);
            var lastColumnIndex = columns.length - (hasStickyRightColumn ? 3 : 2);
            setSelectionCell(cursorIndex && {
                col: selectionMode.columns
                    ? Math.max(0, Math.min(lastColumnIndex, cursorIndex.col))
                    : lastColumnIndex,
                row: selectionMode.rows
                    ? Math.max(0, cursorIndex.row)
                    : data.length - 1,
            });
            setEditing(false);
        }
    }, [
        selectionMode.active,
        selectionMode.columns,
        selectionMode.rows,
        getCursorIndex,
        columns.length,
        hasStickyRightColumn,
        setSelectionCell,
        data.length,
    ]);
    useDocumentEventListener_1.useDocumentEventListener('mousemove', onMouseMove);
    var onKeyDown = react_1.useCallback(function (event) {
        if (!activeCell) {
            return;
        }
        if (event.key.startsWith('Arrow') || event.key === 'Tab') {
            if (editing && columns[activeCell.col + 1].disableKeys) {
                return;
            }
            if (editing && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
                return;
            }
            var add_1 = function (_a, cell) {
                var _b = __read(_a, 2), x = _b[0], y = _b[1];
                return cell && {
                    col: Math.max(0, Math.min(columns.length - (hasStickyRightColumn ? 3 : 2), cell.col + x)),
                    row: Math.max(0, Math.min(data.length - 1, cell.row + y)),
                };
            };
            if (event.key === 'Tab' && event.shiftKey) {
                setActiveCell(function (cell) { return add_1([-1, 0], cell); });
                setSelectionCell(null);
            }
            else {
                var direction_1 = {
                    ArrowDown: [0, 1],
                    ArrowUp: [0, -1],
                    ArrowLeft: [-1, 0],
                    ArrowRight: [1, 0],
                    Tab: [1, 0],
                }[event.key];
                if (event.ctrlKey || event.metaKey) {
                    direction_1[0] *= columns.length;
                    direction_1[1] *= data.length;
                }
                if (event.shiftKey) {
                    setSelectionCell(function (cell) { return add_1(direction_1, cell || activeCell); });
                }
                else {
                    setActiveCell(function (cell) { return add_1(direction_1, cell); });
                    setSelectionCell(null);
                }
            }
            setEditing(false);
            event.preventDefault();
        }
        else if (event.key === 'Escape') {
            if (!editing && !selectionCell) {
                setActiveCell(null);
            }
            setSelectionCell(null);
            setEditing(false);
        }
        else if (event.key === 'Enter' &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            !event.shiftKey) {
            setSelectionCell(null);
            if (editing) {
                if (!columns[activeCell.col + 1].disableKeys) {
                    stopEditing();
                }
            }
            else if (!isCellDisabled(activeCell)) {
                setEditing(true);
                scrollTo(activeCell);
            }
        }
        else if (event.key === 'Enter' &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            event.shiftKey) {
            insertRowAfter((selection === null || selection === void 0 ? void 0 : selection.max.row) || activeCell.row);
        }
        else if (event.key === 'd' &&
            (event.ctrlKey || event.metaKey) &&
            !event.altKey &&
            !event.shiftKey) {
            duplicateRows((selection === null || selection === void 0 ? void 0 : selection.min.row) || activeCell.row, selection === null || selection === void 0 ? void 0 : selection.max.row);
            event.preventDefault();
        }
        else if (event.key.match(/^[a-zA-Z0-9 ,.+-]$/) &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey) {
            if (!editing && !isCellDisabled(activeCell)) {
                setSelectionCell(null);
                setEditing(true);
                scrollTo(activeCell);
            }
        }
        else if (['Backspace', 'Delete'].includes(event.key)) {
            if (!editing) {
                deleteSelection();
                event.preventDefault();
            }
        }
        else if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
            if (!editing) {
                setActiveCell({ col: 0, row: 0 });
                setSelectionCell({
                    col: columns.length - (hasStickyRightColumn ? 3 : 2),
                    row: data.length - 1,
                });
                event.preventDefault();
            }
        }
    }, [
        activeCell,
        columns,
        data.length,
        deleteSelection,
        duplicateRows,
        editing,
        insertRowAfter,
        isCellDisabled,
        scrollTo,
        selection === null || selection === void 0 ? void 0 : selection.max.row,
        selection === null || selection === void 0 ? void 0 : selection.min.row,
        selectionCell,
        setActiveCell,
        setSelectionCell,
        stopEditing,
        hasStickyRightColumn,
    ]);
    useDocumentEventListener_1.useDocumentEventListener('keydown', onKeyDown);
    var onContextMenu = react_1.useCallback(function (event) {
        var _a;
        var clickInside = ((_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) || false;
        var cursorIndex = clickInside
            ? getCursorIndex(event, true, true)
            : null;
        var clickOnActiveCell = cursorIndex &&
            activeCell &&
            activeCell.col === cursorIndex.col &&
            activeCell.row === cursorIndex.row &&
            editing;
        if (clickInside && !clickOnActiveCell) {
            event.preventDefault();
        }
    }, [getCursorIndex, activeCell, editing]);
    useDocumentEventListener_1.useDocumentEventListener('contextmenu', onContextMenu);
    react_1.useEffect(function () {
        var items = [];
        if ((selection === null || selection === void 0 ? void 0 : selection.max.row) !== undefined) {
            items.push({
                type: 'INSERT_ROW_BELLOW',
                action: function () {
                    setContextMenu(null);
                    insertRowAfter(selection.max.row);
                },
            });
        }
        else if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) !== undefined) {
            items.push({
                type: 'INSERT_ROW_BELLOW',
                action: function () {
                    setContextMenu(null);
                    insertRowAfter(activeCell.row);
                },
            });
        }
        if ((selection === null || selection === void 0 ? void 0 : selection.min.row) !== undefined &&
            selection.min.row !== selection.max.row) {
            items.push({
                type: 'DUPLICATE_ROWS',
                fromRow: selection.min.row + 1,
                toRow: selection.max.row + 1,
                action: function () {
                    setContextMenu(null);
                    duplicateRows(selection.min.row, selection.max.row);
                },
            });
        }
        else if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) !== undefined) {
            items.push({
                type: 'DUPLICATE_ROW',
                action: function () {
                    setContextMenu(null);
                    duplicateRows(activeCell.row);
                },
            });
        }
        if ((selection === null || selection === void 0 ? void 0 : selection.min.row) !== undefined &&
            selection.min.row !== selection.max.row) {
            items.push({
                type: 'DELETE_ROWS',
                fromRow: selection.min.row + 1,
                toRow: selection.max.row + 1,
                action: function () {
                    setContextMenu(null);
                    deleteRows(selection.min.row, selection.max.row);
                },
            });
        }
        else if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) !== undefined) {
            items.push({
                type: 'DELETE_ROW',
                action: function () {
                    setContextMenu(null);
                    deleteRows(activeCell.row);
                },
            });
        }
        setContextMenuItems(items);
        if (!items.length) {
            setContextMenu(null);
        }
    }, [
        activeCell === null || activeCell === void 0 ? void 0 : activeCell.row,
        deleteRows,
        duplicateRows,
        insertRowAfter,
        selection === null || selection === void 0 ? void 0 : selection.min.row,
        selection === null || selection === void 0 ? void 0 : selection.max.row,
    ]);
    var headerContext = useMemoObject_1.useMemoObject({
        hasStickyRightColumn: hasStickyRightColumn,
        height: headerRowHeight,
        contentWidth: fullWidth ? undefined : contentWidth,
        columns: columns,
        activeColMin: (_b = selection === null || selection === void 0 ? void 0 : selection.min.col) !== null && _b !== void 0 ? _b : activeCell === null || activeCell === void 0 ? void 0 : activeCell.col,
        activeColMax: (_c = selection === null || selection === void 0 ? void 0 : selection.max.col) !== null && _c !== void 0 ? _c : activeCell === null || activeCell === void 0 ? void 0 : activeCell.col,
    });
    var selectionContext = useMemoObject_1.useMemoObject({
        columnRights: columnRights,
        columnWidths: columnWidths,
        activeCell: activeCell,
        selection: selection,
        headerRowHeight: headerRowHeight,
        rowHeight: rowHeight,
        hasStickyRightColumn: hasStickyRightColumn,
        dataLength: data.length,
        viewHeight: height,
        viewWidth: width,
        contentWidth: fullWidth ? undefined : contentWidth,
        edges: edges,
        editing: editing,
        isCellDisabled: isCellDisabled,
    });
    var contextMenuItemsRef = react_1.useRef(contextMenuItems);
    contextMenuItemsRef.current = contextMenuItems;
    var getContextMenuItems = react_1.useCallback(function () { return contextMenuItemsRef.current; }, []);
    var itemData = useMemoObject_1.useMemoObject({
        data: data,
        contentWidth: fullWidth ? undefined : contentWidth,
        columns: columns,
        hasStickyRightColumn: hasStickyRightColumn,
        activeCell: activeCell,
        selectionMinRow: (_d = selection === null || selection === void 0 ? void 0 : selection.min.row) !== null && _d !== void 0 ? _d : activeCell === null || activeCell === void 0 ? void 0 : activeCell.row,
        selectionMaxRow: (_e = selection === null || selection === void 0 ? void 0 : selection.max.row) !== null && _e !== void 0 ? _e : activeCell === null || activeCell === void 0 ? void 0 : activeCell.row,
        editing: editing,
        setRowData: setRowData,
        deleteRows: deleteRows,
        duplicateRows: duplicateRows,
        insertRowAfter: insertRowAfter,
        stopEditing: stopEditing,
        getContextMenuItems: getContextMenuItems,
    });
    var itemSize = react_1.useCallback(function (index) { return (index === 0 ? headerRowHeight : rowHeight); }, [headerRowHeight, rowHeight]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { tabIndex: rawColumns.length && data.length ? 0 : undefined, onFocus: function (e) {
                e.target.blur();
                setActiveCell({ col: 0, row: 0 });
            } }),
        react_1.default.createElement(HeaderContext_1.HeaderContext.Provider, { value: headerContext },
            react_1.default.createElement(SelectionContext_1.SelectionContext.Provider, { value: selectionContext },
                react_1.default.createElement(react_window_1.VariableSizeList, { className: "dsg-container", width: "100%", ref: listRef, height: displayHeight, itemCount: data.length + 1, itemSize: itemSize, estimatedItemSize: rowHeight, itemData: itemData, outerRef: outerRef, innerRef: innerRef, innerElementType: InnerContainer_1.InnerContainer, children: Row_1.Row, useIsScrolling: columns.some(function (_a) {
                        var renderWhenScrolling = _a.renderWhenScrolling;
                        return !renderWhenScrolling;
                    }) }))),
        react_1.default.createElement("div", { tabIndex: rawColumns.length && data.length ? 0 : undefined, onFocus: function (e) {
                e.target.blur();
                setActiveCell({
                    col: columns.length - (hasStickyRightColumn ? 3 : 2),
                    row: data.length - 1,
                });
            } }),
        !lockRows && (react_1.default.createElement(AddRowsComponent, { addRows: function (count) { return insertRowAfter(data.length - 1, count); } })),
        contextMenu && contextMenuItems.length > 0 && (react_1.default.createElement(ContextMenuComponent, { clientX: contextMenu.x, clientY: contextMenu.y, items: contextMenuItems, close: function () { return setContextMenu(null); } }))));
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
exports.DataSheetGrid.displayName = 'DataSheetGrid';
//# sourceMappingURL=DataSheetGrid.js.map
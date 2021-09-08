"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelection = exports.getCell = void 0;
var getCell = function (value, colMax, rowMax, columns) {
    if (value === null || !colMax || !rowMax) {
        return null;
    }
    if (typeof value !== 'object') {
        throw new Error('Value must be an object or null');
    }
    var colIndex = columns.findIndex(function (column) { return column.id === value.col; });
    var cell = {
        col: Math.max(0, Math.min(colMax - 1, colIndex === -1 ? Number(value.col) : colIndex - 1)),
        row: Math.max(0, Math.min(rowMax - 1, Number(value.row))),
    };
    if (isNaN(cell.col) || isNaN(cell.row)) {
        throw new Error('col or cell are not valid positive numbers');
    }
    return cell;
};
exports.getCell = getCell;
var getSelection = function (value, colMax, rowMax, columns) {
    if (value === null || !colMax || !rowMax) {
        return null;
    }
    if (typeof value !== 'object') {
        throw new Error('Value must be an object or null');
    }
    var selection = {
        min: exports.getCell(value.min, colMax, rowMax, columns),
        max: exports.getCell(value.max, colMax, rowMax, columns),
    };
    if (!selection.min || !selection.max) {
        throw new Error('min and max must be defined');
    }
    return selection;
};
exports.getSelection = getSelection;
//# sourceMappingURL=typeCheck.js.map
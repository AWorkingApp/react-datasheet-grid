"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var Cell = function (_a) {
    var children = _a.children, gutter = _a.gutter, stickyRight = _a.stickyRight, column = _a.column, active = _a.active, disabled = _a.disabled, className = _a.className;
    return (react_1.default.createElement("div", { className: classnames_1.default('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', className), style: {
            flex: String(column.width),
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
        } }, children));
};
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map
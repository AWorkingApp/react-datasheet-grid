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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderRow = void 0;
var react_1 = __importStar(require("react"));
var HeaderContext_1 = require("../contexts/HeaderContext");
var classnames_1 = __importDefault(require("classnames"));
var Cell_1 = require("./Cell");
exports.HeaderRow = react_1.default.memo(function () {
    var _a = react_1.useContext(HeaderContext_1.HeaderContext), columns = _a.columns, contentWidth = _a.contentWidth, height = _a.height, hasStickyRightColumn = _a.hasStickyRightColumn, activeColMin = _a.activeColMin, activeColMax = _a.activeColMax;
    return (react_1.default.createElement("div", { className: classnames_1.default('dsg-row', 'dsg-row-header'), style: {
            width: contentWidth ? contentWidth : '100%',
            height: height,
        } }, columns.map(function (column, i) { return (react_1.default.createElement(Cell_1.Cell, { key: i, gutter: i === 0, stickyRight: hasStickyRightColumn && i === columns.length - 1, column: column, className: classnames_1.default('dsg-cell-header', activeColMin !== undefined &&
            activeColMax !== undefined &&
            activeColMin <= i - 1 &&
            activeColMax >= i - 1 &&
            'dsg-cell-header-active') }, column.title)); })));
});
exports.HeaderRow.displayName = 'HeaderRow';
//# sourceMappingURL=HeaderRow.js.map
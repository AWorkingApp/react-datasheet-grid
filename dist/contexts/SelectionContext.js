"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionContext = void 0;
var react_1 = __importDefault(require("react"));
exports.SelectionContext = react_1.default.createContext({
    selection: null,
    headerRowHeight: 0,
    activeCell: null,
    rowHeight: 0,
    hasStickyRightColumn: false,
    dataLength: 0,
    edges: {
        top: true,
        left: true,
        bottom: true,
        right: true,
    },
    editing: false,
    isCellDisabled: function () { return false; },
});
//# sourceMappingURL=SelectionContext.js.map
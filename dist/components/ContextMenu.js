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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var useDocumentEventListener_1 = require("../hooks/useDocumentEventListener");
var renderItem = function (item) {
    if (item.type === 'DELETE_ROW') {
        return 'Delete row';
    }
    if (item.type === 'DELETE_ROWS') {
        return (React.createElement(React.Fragment, null,
            "Delete rows ",
            React.createElement("b", null, item.fromRow),
            " to ",
            React.createElement("b", null, item.toRow)));
    }
    if (item.type === 'INSERT_ROW_BELLOW') {
        return 'Insert row bellow';
    }
    if (item.type === 'DUPLICATE_ROW') {
        return 'Duplicate row';
    }
    if (item.type === 'DUPLICATE_ROWS') {
        return (React.createElement(React.Fragment, null,
            "Duplicate rows ",
            React.createElement("b", null, item.fromRow),
            " to ",
            React.createElement("b", null, item.toRow)));
    }
    return item.type;
};
var ContextMenu = function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY, items = _a.items, close = _a.close;
    var containerRef = react_1.useRef(null);
    var onClickOutside = react_1.useCallback(function (event) {
        var _a;
        var clickInside = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target);
        if (!clickInside) {
            close();
        }
    }, [close]);
    useDocumentEventListener_1.useDocumentEventListener('mousedown', onClickOutside);
    return (React.createElement("div", { className: "dsg-context-menu", style: { left: clientX + 'px', top: clientY + 'px' }, ref: containerRef }, items.map(function (item) { return (React.createElement("div", { key: item.type, onClick: item.action, className: "dsg-context-menu-item" }, renderItem(item))); })));
};
exports.ContextMenu = ContextMenu;
//# sourceMappingURL=ContextMenu.js.map
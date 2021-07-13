"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentEventListener = void 0;
var react_1 = require("react");
var useDocumentEventListener = function (type, listener) {
    react_1.useEffect(function () {
        document.addEventListener(type, listener);
        return function () {
            document.removeEventListener(type, listener);
        };
    }, [listener, type]);
};
exports.useDocumentEventListener = useDocumentEventListener;
//# sourceMappingURL=useDocumentEventListener.js.map
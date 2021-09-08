"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefObject = void 0;
var react_1 = require("react");
var useRefObject = function (object) {
    var ref = react_1.useRef(object);
    ref.current = object;
    return ref;
};
exports.useRefObject = useRefObject;
//# sourceMappingURL=useRefObject.js.map
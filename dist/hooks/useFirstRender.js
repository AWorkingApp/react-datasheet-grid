"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirstRender = void 0;
var react_1 = require("react");
var useFirstRender = function () {
    var firstRenderRef = react_1.useRef(true);
    var firstRender = firstRenderRef.current;
    firstRenderRef.current = false;
    return firstRender;
};
exports.useFirstRender = useFirstRender;
//# sourceMappingURL=useFirstRender.js.map
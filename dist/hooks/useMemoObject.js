"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMemoObject = void 0;
var react_1 = require("react");
var useMemoObject = function (object) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return react_1.useMemo(function () { return object; }, Object.values(object));
};
exports.useMemoObject = useMemoObject;
//# sourceMappingURL=useMemoObject.js.map
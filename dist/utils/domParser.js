"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDom = void 0;
var parser = new DOMParser();
var parseDom = function (html) {
    return parser.parseFromString(html, 'text/html');
};
exports.parseDom = parseDom;
//# sourceMappingURL=domParser.js.map
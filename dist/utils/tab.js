"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTabbableElements = void 0;
var getAllTabbableElements = function () {
    return Array.from(document.querySelectorAll('*')).filter(function (element) {
        return (element instanceof HTMLElement &&
            typeof element.tabIndex === 'number' &&
            element.tabIndex >= 0 &&
            !element.disabled &&
            (!(element instanceof HTMLAnchorElement) ||
                !!element.href ||
                element.getAttribute('tabIndex') !== null) &&
            getComputedStyle(element).visibility !== 'collapse');
    });
};
exports.getAllTabbableElements = getAllTabbableElements;
//# sourceMappingURL=tab.js.map
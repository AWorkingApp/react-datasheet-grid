"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumnWidths = void 0;
var react_1 = require("react");
var useDeepEqualState_1 = require("./useDeepEqualState");
var useColumnWidths = function (columns, width) {
    var _a = __read(useDeepEqualState_1.useDeepEqualState(undefined), 2), columnWidths = _a[0], setColumnWidths = _a[1];
    var _b = __read(react_1.useState(width), 2), prevWidth = _b[0], setPrevWidth = _b[1];
    var _c = react_1.useMemo(function () {
        if (!columnWidths) {
            return { totalWidth: undefined, columnRights: undefined };
        }
        var total = 0;
        var columnRights = columnWidths.map(function (w, i) {
            total += w;
            return i === columnWidths.length - 1 ? Infinity : total;
        });
        return {
            columnRights: columnRights,
            totalWidth: total,
        };
    }, [columnWidths]), totalWidth = _c.totalWidth, columnRights = _c.columnRights;
    var columnsHash = columns
        .map(function (_a) {
        var width = _a.width, minWidth = _a.minWidth, maxWidth = _a.maxWidth;
        return [width, minWidth, maxWidth].join(',');
    })
        .join('|');
    react_1.useEffect(function () {
        if (width === undefined) {
            return;
        }
        var el = document.createElement('div');
        el.style.display = 'flex';
        el.style.position = 'fixed';
        el.style.width = width + "px";
        el.style.left = '-999px';
        el.style.top = '-1px';
        var children = columns.map(function (column) {
            var child = document.createElement('div');
            child.style.display = 'block';
            child.style.flex = String(column.width);
            child.style.minWidth = column.minWidth + "px";
            child.style.maxWidth = column.maxWidth + "px";
            return child;
        });
        children.forEach(function (child) { return el.appendChild(child); });
        document.body.insertBefore(el, null);
        setColumnWidths(children.map(function (child) { return child.offsetWidth; }));
        setPrevWidth(width);
        el.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, columnsHash]);
    return {
        fullWidth: prevWidth === totalWidth,
        columnWidths: columnWidths,
        columnRights: columnRights,
        totalWidth: totalWidth,
    };
};
exports.useColumnWidths = useColumnWidths;
//# sourceMappingURL=useColumnWidths.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData2 = exports.parseTextPlainData = exports.parseTextHtmlData = void 0;
var domParser_1 = require("./domParser");
var parseTextHtmlData = function (data) {
    var _a, _b;
    var doc = domParser_1.parseDom(data.replace(/<br\/?>/g, '\n'));
    var table = doc.getElementsByTagName('table')[0];
    if (table) {
        var rows = [];
        for (var i = 0; i < table.rows.length; i++) {
            var row = [];
            rows.push(row);
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                row.push((_a = table.rows[i].cells[j].textContent) !== null && _a !== void 0 ? _a : '');
            }
        }
        return rows;
    }
    var span = doc.getElementsByTagName('span')[0];
    if (span) {
        return [[(_b = span.textContent) !== null && _b !== void 0 ? _b : '']];
    }
    return [['']];
};
exports.parseTextHtmlData = parseTextHtmlData;
var parseTextPlainData = function (data) {
    var cleanData = data.replace(/\r|\n$/g, '');
    var output = [[]];
    var cursor = 0;
    var startCell = 0;
    var quoted = false;
    var lastRowIndex = 0;
    var saveCell = function () {
        var str = cleanData.slice(startCell, cursor);
        if (quoted && str[str.length - 1] === '"' && str.includes('\n')) {
            str = str.slice(1, str.length - 1).replace(/""/g, '"');
        }
        if (quoted && str[str.length - 1] !== '"') {
            str.split('\n').forEach(function (cell, i, _a) {
                var length = _a.length;
                output[lastRowIndex].push(cell);
                if (i < length - 1) {
                    output.push([]);
                    lastRowIndex++;
                }
            });
        }
        else {
            output[lastRowIndex].push(str);
        }
    };
    while (cursor < cleanData.length) {
        if (quoted &&
            cleanData[cursor] === '"' &&
            ![undefined, '\t', '"'].includes(cleanData[cursor + 1])) {
            quoted = false;
        }
        if (quoted && cleanData[cursor] === '"' && cleanData[cursor + 1] === '"') {
            cursor++;
        }
        if (cursor === startCell && cleanData[cursor] === '"') {
            quoted = true;
        }
        if (cleanData[cursor] === '\t') {
            saveCell();
            startCell = cursor + 1;
            quoted = false;
        }
        if (cleanData[cursor] === '\n' && !quoted) {
            saveCell();
            output.push([]);
            startCell = cursor + 1;
            lastRowIndex++;
        }
        cursor++;
    }
    saveCell();
    return output;
};
exports.parseTextPlainData = parseTextPlainData;
var parseData2 = function (data) {
    var rowsT = data.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
        // This function runs for each cell with multi lined text.
        return p1
            // Replace any double double-quotes with a single
            // double-quote
            .replace(/""/g, '"')
            // Replace all new lines with spaces.
            .replace(/\r\n|\n\r|\n|\r/g, ' ');
    });
    var rows = rowsT === null || rowsT === void 0 ? void 0 : rowsT.split(/\r\n|\n\r|\n|\r/g);
    var cleanData = (rows === null || rows === void 0 ? void 0 : rows.map(function (row) { return row.split(/\t/g); })) || [];
    return cleanData;
};
exports.parseData2 = parseData2;
//# sourceMappingURL=copyPasting.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData2 = exports.parseData = void 0;
var parseData = function (data) {
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
exports.parseData = parseData;
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
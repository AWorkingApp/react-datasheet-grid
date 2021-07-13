"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = void 0;
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
//# sourceMappingURL=copyPasting.js.map
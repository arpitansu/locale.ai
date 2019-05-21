"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csv = require("csv-parser");
var ReadCsv = /** @class */ (function () {
    function ReadCsv(filePath) {
        this._filePath = filePath;
    }
    ReadCsv.prototype.readLine = function (start, end) {
        this._readCsv();
    };
    ReadCsv.prototype._readCsv = function () {
        var data = [];
        fs.createReadStream(this._filePath)
            .pipe(csv())
            .on('data', function (row) {
            console.log(row);
        })
            .on('end', function () {
            console.log('Data loaded');
        });
    };
    return ReadCsv;
}());
exports.ReadCsv = ReadCsv;

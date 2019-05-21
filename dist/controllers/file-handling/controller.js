"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FileValidate_1 = require("./modules/FileValidate");
var locale_db_1 = require("../../configuration/locale.db");
var SaveToDatabase_1 = require("./modules/SaveToDatabase");
function get(req, res) {
    locale_db_1.db['trackback'].findAll()
        .then(function (r) { return console.log(r); });
    res.json({ msg: "working" });
}
exports.get = get;
function validateFile(req, res) { }
exports.validateFile = validateFile;
function upload(req, res) {
    var _this = this;
    var fileName = new Date();
    var filePath = "./tmp/" + fileName + ".csv";
    req.pipe(fs.createWriteStream(filePath));
    req.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
        var fileVaidate, isValid, saveData, save;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileVaidate = new FileValidate_1.FileValidate(filePath);
                    return [4 /*yield*/, fileVaidate.execute()];
                case 1:
                    isValid = _a.sent();
                    if (!!isValid.status) return [3 /*break*/, 2];
                    res.status(500);
                    return [3 /*break*/, 4];
                case 2:
                    if (!isValid.status) return [3 /*break*/, 4];
                    saveData = new SaveToDatabase_1.SaveToDatabase(filePath);
                    return [4 /*yield*/, saveData.execute()];
                case 3:
                    save = _a.sent();
                    isValid.trackback = save;
                    _a.label = 4;
                case 4:
                    res.json(isValid);
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.upload = upload;
function trackback(req, res) {
    if (!req.query.trackback_id) {
        res.status(422);
        res.json({ msg: "Trackback id not present in the database" });
        return;
    }
    var id = req.query.trackback_id;
    return locale_db_1.db['trackback'].findOne({
        where: {
            id: id
        }
    })
        .then(function (result) {
        if (result)
            res.json(result);
        else {
            res.status(404);
            res.json({ msg: "No Data Found" });
        }
    });
}
exports.trackback = trackback;

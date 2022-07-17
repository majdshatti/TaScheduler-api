"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageData = exports.enData = exports.arData = void 0;
const ar_lang_1 = __importDefault(require("./ar.lang"));
exports.arData = ar_lang_1.default;
const en_lang_1 = __importDefault(require("./en.lang"));
exports.enData = en_lang_1.default;
const get_lang_1 = require("./get.lang");
Object.defineProperty(exports, "getLanguageData", { enumerable: true, get: function () { return get_lang_1.getLanguageData; } });

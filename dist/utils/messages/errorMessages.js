"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const lang_1 = require("../../lang");
const getErrorMessage = (type, path, value) => {
    const arSentance = (0, lang_1.getArData)(path, value).errorData;
    const enSentance = (0, lang_1.getEnData)(path, value).errorData;
    return {
        ar: arSentance[type],
        en: enSentance[type],
    };
};
exports.getErrorMessage = getErrorMessage;

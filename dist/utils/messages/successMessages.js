"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuccessMessage = void 0;
const lang_1 = require("../../lang");
const getSuccessMessage = (type, path) => {
    const arSentance = (0, lang_1.getArData)(path).successData;
    const enSentance = (0, lang_1.getEnData)(path).successData;
    return {
        ar: arSentance[type],
        en: enSentance[type],
    };
};
exports.getSuccessMessage = getSuccessMessage;

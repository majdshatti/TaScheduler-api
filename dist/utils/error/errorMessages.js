"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const lang_1 = require("../../lang/");
const getErrorMessage = (type, path, value) => {
    const sentance = (0, lang_1.getLanguageData)(path, value);
    return sentance[type];
};
exports.getErrorMessage = getErrorMessage;

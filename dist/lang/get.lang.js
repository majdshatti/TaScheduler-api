"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageData = void 0;
// Languages Data
const _1 = require("./");
// Get terms based on language
const getLanguageData = (path, value) => {
    let lang = "ar";
    switch (lang) {
        case "ar":
            return (0, _1.arData)(path, value);
        case "en":
            return (0, _1.enData)(path, value);
        default:
            return (0, _1.enData)(path, value);
    }
};
exports.getLanguageData = getLanguageData;

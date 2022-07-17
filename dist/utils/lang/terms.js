"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
// Get terms based on language
const getLanguageData = (messageData) => {
    let lang = "en";
    switch (lang) {
        case "ar":
            return (0, lang_1.arData)(messageData);
        case "en":
            return (0, lang_1.enData)(messageData);
        default:
            return (0, lang_1.enData)(messageData);
    }
};
exports.default = getLanguageData;

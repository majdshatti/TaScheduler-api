"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArData = exports.getEnData = exports.getLanguageData = void 0;
// Languages Data
const _1 = require("./");
// Get terms based on language
const getLanguageData = (lang, path, value) => {
    switch (lang) {
        case "ar":
            return {
                terms: _1.arTerms,
                errorData: (0, _1.arErrorData)(path, value),
                successData: (0, _1.arSuccessData)(path),
            };
        case "en":
            return {
                terms: _1.enTerms,
                errorData: (0, _1.enErrorData)(path, value),
                successData: (0, _1.enSuccessData)(path),
            };
        default:
            return {
                terms: _1.enTerms,
                errorData: (0, _1.enErrorData)(path, value),
                successData: (0, _1.enSuccessData)(path),
            };
    }
};
exports.getLanguageData = getLanguageData;
const getEnData = (path, value) => {
    return {
        terms: _1.enTerms,
        errorData: (0, _1.enErrorData)(path, value),
        successData: (0, _1.enSuccessData)(path),
    };
};
exports.getEnData = getEnData;
const getArData = (path, value) => {
    return {
        terms: _1.arTerms,
        errorData: (0, _1.arErrorData)(path, value),
        successData: (0, _1.arSuccessData)(path),
    };
};
exports.getArData = getArData;

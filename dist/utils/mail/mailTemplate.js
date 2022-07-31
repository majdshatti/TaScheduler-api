"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const mailTemplate = (template, value) => {
    let htmlTemplate = "";
    switch (template) {
        case "resetPassword":
            htmlTemplate = (0, __1.resetTemplate)(value);
            return htmlTemplate;
        default:
            return "";
    }
};
exports.default = mailTemplate;

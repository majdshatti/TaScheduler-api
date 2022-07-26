"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const todoValidate = (validationCase) => {
    switch (validationCase) {
        case "check" || "delete":
            (0, utils_1.validate)("todoId").isRequired().isObjectId().exec();
        case "edit" || "create":
            (0, utils_1.validate)("paragraph").isRequired().isString().exec();
        default:
            return [];
    }
};
exports.default = todoValidate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const todoValidate = (validationCase) => {
    switch (validationCase) {
        case "check" || "delete":
            return [
                (0, utils_1.validate)("id").isObjectId().exec(),
                (0, utils_1.validate)("todoId").isRequired().isObjectId().exec(),
            ];
        case "create":
            return [
                (0, utils_1.validate)("id").isObjectId().exec(),
                (0, utils_1.validate)("paragraph").isRequired().isString().exec(),
            ];
        case "edit":
            return [
                (0, utils_1.validate)("id").isObjectId().exec(),
                (0, utils_1.validate)("todoId").isRequired().isObjectId().exec(),
                (0, utils_1.validate)("paragraph").isRequired().isString().exec(),
            ];
        default:
            return [];
    }
};
exports.default = todoValidate;

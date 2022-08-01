"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const userValidate = (validationCase) => {
    switch (validationCase) {
        case "edit":
            return [
                (0, utils_1.validate)("username").optional().isString().isUnique("User").exec(),
                (0, utils_1.validate)("email").optional().isEmail().isUnique("User").exec(),
            ];
        default:
            return [];
    }
};
exports.default = userValidate;

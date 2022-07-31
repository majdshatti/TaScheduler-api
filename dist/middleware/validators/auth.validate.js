"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const authValidate = (validationCase) => {
    switch (validationCase) {
        case "login":
            return [
                (0, utils_1.validate)("username").isRequired().exec(),
                (0, utils_1.validate)("password").isRequired().exec(),
            ];
        case "register":
            return [
                (0, utils_1.validate)("username").isRequired().isString().isUnique("User").exec(),
                (0, utils_1.validate)("password").isRequired().isLength(8, 20).exec(),
                (0, utils_1.validate)("email").isRequired().isEmail().isUnique("User").exec(),
            ];
        case "forgot":
            return [(0, utils_1.validate)("email").isRequired().isEmail().exec()];
        case "reset":
            return [(0, utils_1.validate)("password").isRequired().isString().exec()];
        default:
            return [];
    }
};
exports.default = authValidate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const projectValidate = (validationCase) => {
    switch (validationCase) {
        case "create":
            return [
                (0, utils_1.validate)("name").isRequired().isUnique("Project").isString().exec(),
                (0, utils_1.validate)("description")
                    .isRequired()
                    .isString()
                    .isLength(10, 200)
                    .exec(),
            ];
        case "edit":
            return [
                (0, utils_1.validate)("name").optional().isUnique("Project").isString().exec(),
                (0, utils_1.validate)("description")
                    .optional()
                    .isRequired()
                    .isString()
                    .isLength(10, 200)
                    .exec(),
            ];
        default:
            return [];
    }
};
exports.default = projectValidate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const taskValidate = (validationCase) => {
    switch (validationCase) {
        case "create":
            return [
                (0, utils_1.validate)("name").isUnique("Task").isRequired().isString().exec(),
                (0, utils_1.validate)("description").isLength(20, 200).exec(),
                (0, utils_1.validate)("startDate").isDate().exec(),
                (0, utils_1.validate)("dueDate").isDate().exec(),
            ];
        case "edit":
            return [];
    }
};
exports.default = taskValidate;

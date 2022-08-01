"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
//* Validation Task inputs cases
const taskValidate = (validationCase) => {
    switch (validationCase) {
        case "create":
            return [
                (0, utils_1.validate)("project")
                    .isRequired()
                    .isObjectId()
                    .isExist("Project", "_id")
                    .exec(),
                (0, utils_1.validate)("name").isRequired().isString().isUnique("Task").exec(),
                (0, utils_1.validate)("description").optional().isLength(20, 200).exec(),
                (0, utils_1.validate)("dueDate").isRequired().isDate().exec(),
                (0, utils_1.validate)("startDate").isRequired().isDate().isStartDateSmaller().exec(),
            ];
        case "edit":
            return [
                (0, utils_1.validate)("id").isObjectId().exec(),
                (0, utils_1.validate)("name").optional().isString().isUnique("Task").exec(),
                (0, utils_1.validate)("description").optional().isLength(20, 200).exec(),
            ];
        case "delete":
            return [(0, utils_1.validate)("id").isObjectId().exec()];
        case "complete":
            return [
                (0, utils_1.validate)("id")
                    .isObjectId()
                    .isExist("Task", "_id", true)
                    .isTaskStatusTheSame("Completed")
                    .exec(),
            ];
        default:
            return [];
    }
};
exports.default = taskValidate;

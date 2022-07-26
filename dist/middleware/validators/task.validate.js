"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const taskValidate = (validationCase) => {
    switch (validationCase) {
        case "create":
            return [
                (0, utils_1.validate)("project")
                    .isRequired()
                    .isObjectId()
                    .isExist("Project", "_id")
                    .exec(),
                (0, utils_1.validate)("user")
                    .isRequired()
                    .isObjectId()
                    .isExist("User", "_id")
                    .exec(),
                (0, utils_1.validate)("todos").exec(),
                (0, utils_1.validate)("todos.*").isString().exec(),
                (0, utils_1.validate)("name").isUnique("Task").isRequired().isString().exec(),
                (0, utils_1.validate)("description").isLength(20, 200).exec(),
                (0, utils_1.validate)("dueDate").isDate().exec(),
                (0, utils_1.validate)("startDate").isDate().isStartDateSmaller().exec(),
            ];
        case "edit":
            return [
                (0, utils_1.validate)("name").optional().isUnique("Task").isString().exec(),
                (0, utils_1.validate)("description").isLength(20, 200).exec(),
            ];
        case "complete":
            return [
                (0, utils_1.validate)("slug")
                    .isExist("Task", "slug", true)
                    .isTaskStatusTheSame("Completed")
                    .exec(),
            ];
        default:
            return [];
    }
};
exports.default = taskValidate;

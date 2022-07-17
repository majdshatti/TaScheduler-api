"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../../utils/validation/validate"));
const taskValidate = () => {
    return [
        (0, validate_1.default)("name").isUnique("Task").isRequired().isString().exec(),
        (0, validate_1.default)("description").isLength(20, 200).exec(),
        (0, validate_1.default)("startDate").isDate().exec(),
        (0, validate_1.default)("dueDate").isDate().exec(),
    ];
};
exports.default = taskValidate;

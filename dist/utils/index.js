"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjKey = exports.validate = exports.getSuccessMessage = exports.getErrorMessage = exports.ErrorResponse = void 0;
const errorResponse_1 = __importDefault(require("./error/errorResponse"));
exports.ErrorResponse = errorResponse_1.default;
const validate_1 = __importDefault(require("./validation/validate"));
exports.validate = validate_1.default;
const errorMessages_1 = require("./messages/errorMessages");
Object.defineProperty(exports, "getErrorMessage", { enumerable: true, get: function () { return errorMessages_1.getErrorMessage; } });
const successMessages_1 = require("./messages/successMessages");
Object.defineProperty(exports, "getSuccessMessage", { enumerable: true, get: function () { return successMessages_1.getSuccessMessage; } });
const isObjectKey_1 = __importDefault(require("./object/isObjectKey"));
exports.isObjKey = isObjectKey_1.default;
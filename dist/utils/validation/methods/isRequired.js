"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequiredValidate = void 0;
const errorMessages_1 = require("../../error/errorMessages");
function isRequiredValidate(ths, path) {
    ths.result = ths.result
        .exists({ checkFalsy: true })
        .withMessage((0, errorMessages_1.getErrorMessage)("required", path))
        .bail();
    return ths;
}
exports.isRequiredValidate = isRequiredValidate;

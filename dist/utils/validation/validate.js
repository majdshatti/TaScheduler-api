"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = __importDefault(require("mongoose"));
const express_validator_1 = require("express-validator");
// Utility functions
const __1 = require("../");
let validate = (path) => {
    // Chainable object
    let chainablePath = {
        result: (0, express_validator_1.check)(),
        //************************************************/
        //************ GENERAL VALIDATIONS ***************/
        //************************************************/
        //* Setting up Body() for express validator
        path: function () {
            this.result = (0, express_validator_1.check)(path);
            return this;
        },
        //* Make sure a path is sent from the client
        isRequired: function () {
            this.result = this.result
                .exists({ checkFalsy: true })
                .withMessage((0, __1.getErrorMessage)("required", path))
                .bail();
            return this;
        },
        optional: function () {
            this.result = this.result.optional();
            return this;
        },
        //* Check string format
        isString: function () {
            this.result = this.result
                .isString()
                .withMessage((0, __1.getErrorMessage)("string", path))
                .bail();
            return this;
        },
        //* Check if a document is already exists
        isUnique: function (model) {
            this.result = this.result
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield mongoose_1.default
                        .model(model)
                        .findOne({ [path]: value });
                    // If a document is found then return error
                    if (document)
                        return Promise.reject((0, __1.getErrorMessage)("unique", path));
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }))
                .bail();
            return this;
        },
        //* Check minimum characters allowed
        isLength: function (minLength, maxLength) {
            this.result = this.result
                .isLength({ min: minLength, max: maxLength })
                .withMessage((0, __1.getErrorMessage)("betweenLength", path, `${minLength}, ${maxLength}`))
                .bail();
            return this;
        },
        //* Check date vaild format
        isDate: function () {
            this.result = this.result
                .isISO8601()
                .toDate()
                .withMessage((0, __1.getErrorMessage)("date", path))
                .bail();
            return this;
        },
        //* Check if email
        isEmail: function () {
            this.result = this.result
                .isEmail()
                .withMessage((0, __1.getErrorMessage)("email", path))
                .bail();
            return this;
        },
        //* Check if document exists in the db
        isExist: function (model, field, returnData = false) {
            this.result = this.result
                .custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield mongoose_1.default
                        .model(model)
                        .findOne({ [field]: value });
                    // If a document is found then return error
                    if (!document)
                        return Promise.reject((0, __1.getErrorMessage)("exist", path));
                    if (returnData)
                        req.body.validationResults = { [model]: document };
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }))
                .bail();
            return this;
        },
        isObjectId: function () {
            this.result = this.result
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!mongoose_2.default.isValidObjectId(value))
                    return Promise.reject("Not valid object ID");
            }))
                .bail();
            return this;
        },
        //************************************************/
        //********* PROJECT CUSTOM VALIDATIONS ***********/
        //************************************************/
        //* Check if startDate is smaller than dueDate
        isStartDateSmaller: function () {
            this.result = this.result
                .custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const startDate = value.getTime();
                    const dueDate = req.body.dueDate.getTime();
                    if (startDate >= dueDate)
                        return Promise.reject((0, __1.getErrorMessage)("exist", path));
                }
                catch (err) {
                    return Promise.reject(err);
                }
            }))
                .bail();
            return this;
        },
        //! THIS FUNCTION CANNOT BE USED WITH `ISEXIST FUNCTION` WITH RETURN TRUE FOR DATA
        //* Is status already the same
        isTaskStatusTheSame: function (status) {
            this.result = this.result
                .custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                console.log(value);
                try {
                    const task = req.body.validationResults.Task;
                    if (!task)
                        return Promise.reject((0, __1.getErrorMessage)("exist", "task"));
                    if (task.status == status)
                        return Promise.reject((0, __1.getErrorMessage)("statusSame", "task", "Completed"));
                }
                catch (err) {
                    console.log(err);
                    return Promise.reject((0, __1.getErrorMessage)("serverError", "task"));
                }
            }))
                .bail();
            return this;
        },
        // Return results for express validator to be executed
        exec: function () {
            return this.result;
        },
    };
    return chainablePath.path();
};
exports.default = validate;

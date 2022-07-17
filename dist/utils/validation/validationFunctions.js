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
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const errorMessages_1 = require("../error/errorMessages");
let validateFunctions = (path) => {
    let check = {
        result: (0, express_validator_1.body)(),
        // Setting up Body() for express validator
        path: function () {
            this.result = (0, express_validator_1.body)(path);
            return this;
        },
        // Make sure a path is sent from the client
        isRequired: function () {
            this.result = this.result
                .exists({ checkFalsy: true })
                .withMessage((0, errorMessages_1.getErrorMessage)("required", path))
                .bail();
            return this;
        },
        // Check string format
        isString: function () {
            this.result = this.result
                .isString()
                .withMessage((0, errorMessages_1.getErrorMessage)("string", path))
                .bail();
            return this;
        },
        // Check if a document is already exists
        isUnique: function (model) {
            this.result = this.result.custom((value) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield mongoose_1.default
                        .model(model)
                        .findOne({ [path]: value });
                    if (document)
                        return Promise.reject((0, errorMessages_1.getErrorMessage)("unique", path));
                }
                catch (error) {
                    console.log(error);
                }
            }));
            return this;
        },
        exec: function () {
            return this.result;
        },
    };
    return check.path();
};
exports.default = validateFunctions;

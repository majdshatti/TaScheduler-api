"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCondition = void 0;
// Models
const model_1 = require("../model/");
const getUserByCondition = (condition) => {
    try {
        const user = model_1.User.findOne(condition);
        return user;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserByCondition = getUserByCondition;

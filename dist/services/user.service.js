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
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyUser = exports.updateUser = exports.getUserBySlug = exports.getUserById = void 0;
// Models
const model_1 = require("../model/");
const getUserById = (_id, populate) => __awaiter(void 0, void 0, void 0, function* () {
    populate = populate !== null && populate !== void 0 ? populate : "";
    return model_1.User.findOne({ _id }).populate(populate);
});
exports.getUserById = getUserById;
const getUserBySlug = (slug, populate) => __awaiter(void 0, void 0, void 0, function* () {
    populate = populate !== null && populate !== void 0 ? populate : "";
    return model_1.User.findOne({ slug }).populate(populate);
});
exports.getUserBySlug = getUserBySlug;
const updateUser = (slug, data) => __awaiter(void 0, void 0, void 0, function* () {
    return model_1.User.findOneAndUpdate({ slug }, data, {
        new: true,
    });
});
exports.updateUser = updateUser;
const destroyUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return user.deleteOne();
});
exports.destroyUser = destroyUser;

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
exports.deleteProjectBySlug = exports.updateProject = exports.createProject = exports.getProjectBySlug = exports.getAllProjects = void 0;
const slugify_1 = __importDefault(require("slugify"));
// Models
const model_1 = require("./../model");
//* @desc: Get all projects service
const getAllProjects = () => {
    return model_1.Project.find();
};
exports.getAllProjects = getAllProjects;
//* @desc: Get a single project by condition
const getProjectBySlug = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield model_1.Project.findOne(condition).populate("user");
        if (!project)
            return false;
        return project;
    }
    catch (err) {
        return false;
    }
});
exports.getProjectBySlug = getProjectBySlug;
//* @desc: Create a project service
const createProject = (body) => {
    return model_1.Project.create(body);
};
exports.createProject = createProject;
//* @desc: Update a project service
const updateProject = (slug, body) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description } = body;
    const updateObject = {
        name: name !== null && name !== void 0 ? name : undefined,
        slug: name ? (0, slugify_1.default)(name, { lower: true }) : undefined,
        description: description !== null && description !== void 0 ? description : undefined,
        updatedAt: new Date(),
    };
    try {
        return yield model_1.Project.findOneAndUpdate({ slug }, updateObject, {
            new: true,
        });
    }
    catch (err) {
        return false;
    }
});
exports.updateProject = updateProject;
//* @desc: Delete a project service
const deleteProjectBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield model_1.Project.findOneAndRemove({ slug });
        if (!isDeleted)
            return false;
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.deleteProjectBySlug = deleteProjectBySlug;

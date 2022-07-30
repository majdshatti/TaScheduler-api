"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const projectSchema = new mongoose_1.Schema({
    name: String,
    slug: String,
    description: String,
    status: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    updatedAt: Date,
}, { versionKey: false });
projectSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    next();
});
const Project = (0, mongoose_1.model)("Project", projectSchema);
exports.default = Project;

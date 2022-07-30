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
const filter = (model, populate) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    const reqQuery = Object.assign({}, req.query);
    // Don't need to filter over select, sort, page, ..etc
    const removeFields = [
        "select",
        "sort",
        "page",
        "limit",
        "like",
        "populate",
    ];
    removeFields.forEach(param => delete reqQuery[param]);
    // Greate than, less than, ..etc queries support
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|regex)\b/g, match => `$${match}`);
    // Reparse the json string after cleaning
    let params = JSON.parse(queryStr);
    query = mongoose_1.default.model(model).find(params);
    // SELECT fields
    if (req.query.select) {
        const select = req.query.select;
        const fields = select.split(",").join(" ");
        query = query.select(fields);
    }
    // SORTING fields
    if (req.query.sort) {
        const sort = req.query.sort;
        const sortBy = sort.split(",").join(" ");
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("-createdAt");
    }
    const pagination = { next: {}, prev: {} };
    const total = yield query.clone().countDocuments();
    let pageCount = 1;
    // PAGINATION
    if (req.query.limit) {
        let page = 1;
        let limit = 10;
        if (req.query.page)
            page = +req.query.page;
        if (req.query.limit)
            limit = +req.query.limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        pageCount = Math.ceil(total / limit);
        query = query.skip(startIndex).limit(limit);
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }
    }
    // POPULATE
    if (populate) {
        let select;
        if (req.query.populate) {
            select = req.query.populate;
            select = select.split(",").join(" ");
        }
        query = query.populate({
            path: populate,
            select,
        });
    }
    const results = yield query.lean();
    res.filter = {
        success: true,
        rowCount: total,
        pageCount,
        pagination,
        data: results,
    };
    next();
});
exports.default = filter;

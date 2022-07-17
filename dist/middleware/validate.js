"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const results = () => (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(({ msg, param, value }) => ({
        message: msg,
        path: param,
        value
    }));
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};
exports.default = results;

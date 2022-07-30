"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const results = () => (req, res, next) => {
    // Stores error occured while validating
    const errors = (0, express_validator_1.validationResult)(req).formatWith(({ msg, param, value }) => ({
        message: msg,
        path: param,
        value,
    }));
    // Return error response with validation results
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    // An array of unmatched body attributes
    let unMatchedFields = [];
    // An array for storing validated attributes
    let fields = [];
    // Get the key attributes from validated data
    const validatedData = (0, express_validator_1.matchedData)(req, { includeOptionals: true });
    // Store keys
    for (const key in validatedData) {
        fields.push(key);
    }
    // Extra attributes errors
    for (const bodyFields in req.body) {
        if (!fields.includes(bodyFields)) {
            unMatchedFields.push({
                path: bodyFields,
                message: (0, utils_1.getErrorMessage)("extraFields", bodyFields),
            });
        }
    }
    // Return error response with validation results
    if (unMatchedFields.length > 0) {
        return res.status(400).json({
            success: false,
            errors: unMatchedFields,
        });
    }
    next();
};
exports.default = results;

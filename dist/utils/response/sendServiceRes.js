"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceRes = (success, message, data) => {
    const response = {
        success,
        message,
        data: data !== null && data !== void 0 ? data : undefined,
    };
    return response;
};
exports.default = serviceRes;

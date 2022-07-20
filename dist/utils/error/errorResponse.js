"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message.en);
        this.multiLangMessage = message;
        this.statusCode = statusCode;
    }
}
exports.default = ErrorResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPopulatedObject = (populatedObject) => {
    try {
        const jsonObject = JSON.stringify(populatedObject);
        const obj = JSON.parse(jsonObject);
        return obj;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.default = getPopulatedObject;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTodoIndexById = (array, id) => {
    let isTodoExist = false;
    let todoIndex = -1;
    array.map((element, index) => {
        if (element._id.equals(id)) {
            isTodoExist = true;
            todoIndex = index;
        }
    });
    return {
        index: todoIndex,
        isTodoExist,
    };
};
exports.default = getTodoIndexById;

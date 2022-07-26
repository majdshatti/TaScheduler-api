"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enSuccessData = exports.enErrorData = exports.enTerms = void 0;
const enTerms = {
    name: "name",
    username: "username",
    description: "description",
    id: "id",
    slug: "slug",
    project: "project",
    task: "task",
    user: "user",
};
exports.enTerms = enTerms;
const enSuccessData = (path) => {
    const sentances = {
        create: `${path} has been created successfully`,
        edit: `${path} has been edited successfully`,
        delete: `${path} has been delete successfully`,
    };
    return sentances;
};
exports.enSuccessData = enSuccessData;
const enErrorData = (path, value) => {
    const sentances = {
        required: `${path} is required!.`,
        special: "Incorrect format: " + path + " must contain only letters and numbers!.",
        email: "Please enter an email with the format of: example@example.com.",
        number: `Incorrect value entered: ${path} must only contain numbers.`,
        zip: `Please enter a valid Zip code for your region.`,
        unique: `${article(path).toUpperCase()} ${path} with the same value is already exist!.`,
        minLength: `${path} must be atleast ${value !== null && value !== void 0 ? value : "2"} characters.`,
        maxLength: `${path} must be atleast ${value !== null && value !== void 0 ? value : "12"} characters.`,
        boolean: `Incorrect value entred: ${path} must be a boolean.`,
        date: `Incorrect date format.`,
        string: `${path} must be a string!.`,
        betweenLength: `Must contain between ${value !== null && value !== void 0 ? value : "20, to 200"} characters`,
        credentials: `Invalid username or password!.`,
        exist: `${path} does not exist!.`,
        operation: `Operation ${path} could not be performed, try again later.`,
        statusSame: `${path} is already has the same status: ${value}`,
        serverError: `An error occured while trying to perform this operation.`,
    };
    return sentances;
};
exports.enErrorData = enErrorData;
// Descide wether an or a is need for path
const article = (path) => {
    let articleChar = "a";
    const pathFirstCharacter = path[0];
    const phonetic = ["o", "i", "e", "a", "u"];
    if (phonetic.includes(pathFirstCharacter))
        articleChar = "an";
    return articleChar;
};

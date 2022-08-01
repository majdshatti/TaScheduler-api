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
// Logging colors
const colors_1 = __importDefault(require("colors"));
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Models
const model_1 = require("./model");
//*********************************************/
// * -c Insert constant data                  */
// * -i insert test data                      */
// * -t Delete all data                       */
// * -d delete test data                      */
//*********************************************/
// Load environment variables
dotenv_1.default.config({ path: __dirname + "/config/config.env" });
// Connect to mongodb
mongoose_1.default.connect(process.env.MONGO_URI);
// Delete Data
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.User.deleteMany();
        yield model_1.Task.deleteMany();
        yield model_1.Project.deleteMany();
        console.log(colors_1.default.red.inverse("All data deleted..."));
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});
// Execute one of the functions
switch (process.argv[2]) {
    case "-t":
        deleteData();
        break;
    default:
        throw "Invaild argument";
}

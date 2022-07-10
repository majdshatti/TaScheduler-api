"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// DB
const database_1 = require("./config/database");
// Routes
const routes_1 = __importDefault(require("./routes"));
// Logger & Logging colors
const morgan_1 = __importDefault(require("morgan"));
const colors_1 = __importDefault(require("colors"));
// Cross-Origin Resource
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Load environment variables
dotenv_1.default.config({ path: __dirname + "/config/config.env" });
// Connect to the DB
(0, database_1.connectDB)();
// Enable Cross-Origin Resource Sharing
app.use((0, cors_1.default)());
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Logger
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api", routes_1.default);
// Start listening
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(colors_1.default.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});
// Catch unhandled async/await errors
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});

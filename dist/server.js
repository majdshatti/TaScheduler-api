"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Cookies
const cookie_parser_1 = __importDefault(require("cookie-parser"));
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
// Middlewares
const middleware_1 = require("./middleware");
// Cron
const node_cron_1 = __importDefault(require("node-cron"));
// Services
const schedulers_1 = require("./schedulers");
const utils_1 = require("./utils");
// Path
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Server
const httpServer = require("http").Server(app);
// Load environment variables
dotenv_1.default.config({ path: __dirname + "/config/config.env" });
// Connect to the DB
(0, database_1.connectDB)();
// Enable Cross-Origin Resource Sharing
app.use((0, cors_1.default)());
// Cookies
app.use((0, cookie_parser_1.default)());
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Socketing
(0, utils_1.socketConnection)(httpServer);
// Schedule Task Checking
node_cron_1.default.schedule("*/10 * * * * *", (0, schedulers_1.checkTaskStatus)());
// Logger
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api", routes_1.default);
// Error handling middleware
app.use(middleware_1.errorHandler);
// Start listening
const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () => {
    console.log(colors_1.default.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});
// Catch unhandled promises errors
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});
// Catch un caught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});

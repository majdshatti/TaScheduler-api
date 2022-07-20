import express from "express";
// Cookies
import cookies from "cookie-parser";
// Environment variables
import dotenv from "dotenv";
// DB
import { connectDB } from "./config/database";
// Routes
import routes from "./routes";
// Logger & Logging colors
import morgan from "morgan";
import colors from "colors";
// Cross-Origin Resource
import cors from "cors";
// Middlewares
import { errorHandler } from "./middleware";

const app = express();

// Load environment variables
dotenv.config({ path: __dirname + "/config/config.env" });

// Connect to the DB
connectDB();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Cookies
app.use(cookies());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Start listening
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});

// Catch unhandled promises errors
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});

// Catch un caught exceptions
process.on("uncaughtException", (err: Error) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});

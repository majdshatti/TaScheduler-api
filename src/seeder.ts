import mongoose from "mongoose";
// File Stream
import fs from "fs";
// Logging colors
import colors from "colors";
// Environment variables
import dotenv from "dotenv";
// Models
import { User, Task, Project } from "./model";

//*********************************************/
// * -c Insert constant data                  */
// * -i insert test data                      */
// * -t Delete all data                       */
// * -d delete test data                      */
//*********************************************/

// Load environment variables
dotenv.config({ path: __dirname + "/config/config.env" });

// Connect to mongodb
mongoose.connect(process.env.MONGO_URI);

// Delete Data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    await Project.deleteMany();

    console.log(colors.red.inverse("All data deleted..."));
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Execute one of the functions
switch (process.argv[2]) {
  case "-t":
    deleteData();
    break;
  default:
    throw "Invaild argument";
}

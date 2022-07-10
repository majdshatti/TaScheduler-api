import { Schema, model } from "mongoose";

import ITask from "./../interfaces/task.interface";

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;

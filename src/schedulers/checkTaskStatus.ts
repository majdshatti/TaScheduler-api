import colors from "colors";

// Models
import { Task } from "../model";
// Services
import { getAllTasks } from "../services/task.service";
// Interfaces
import { ITask, Status } from "../interfaces";
// Utils
import { getPopulatedObject, sendMessage } from "../utils";

//* @desc: Check task status and change them
const checkTaskStatus = () => async () => {
  let tasks = await getAllTasks();
  for (const task of tasks) {
    const user: ITask = getPopulatedObject(task.user);

    const startDate = new Date(task.startDate).getTime();
    const dueDate = new Date(task.dueDate).getTime();
    const currentDate = new Date().getTime();

    if (currentDate < startDate && task.status != Status.Hold) {
      logStatusChange(task._id, task.status, Status.Active);
      task.status = Status.Hold;
    }
    if (
      currentDate > dueDate &&
      task.status != Status.Overdue &&
      task.status != Status.Completed
    ) {
      logStatusChange(task._id, task.status, Status.Overdue);
      task.status = Status.Overdue;
      const isSent = sendMessage(user._id, "notification", {
        message: "Overdue alart!",
      });
      if (isSent) console.log("did send a message");
    }
    if (
      currentDate > startDate &&
      currentDate < dueDate &&
      task.status != Status.Active
    ) {
      logStatusChange(task._id, task.status, Status.Active);
      task.status = Status.Active;
    }

    await task.updateOne({ status: task.status });
  }

  console.log(
    colors.green(
      "Task status Scheduler has successfully ran at time: " + new Date()
    )
  );
};

const logStatusChange = (
  taskId: string,
  oldStatus: Status,
  newStatus: Status
) => {
  console.log(
    colors.magenta(`${taskId} status changed from ${oldStatus} to ${newStatus}`)
  );
};

export default checkTaskStatus;

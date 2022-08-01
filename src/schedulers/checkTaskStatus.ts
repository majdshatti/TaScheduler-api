import colors from "colors";

// Services
import { getAllTasks } from "../services/task.service";
// Interfaces
import { ITaskDocument, Status } from "../interfaces";
// Utils
import { getPopulatedObject, sendMessage } from "../utils";

//* @desc: Check task status and change them
const checkTaskStatus = () => async () => {
  // Get all tasks
  let tasks = await getAllTasks();

  // Loop over all tasks
  for (const task of tasks) {
    // Get the user of a task to be notified in case of an event
    const user: ITaskDocument = getPopulatedObject(task.user);

    // Gather dates
    const startDate = new Date(task.startDate).getTime();
    const dueDate = new Date(task.dueDate).getTime();
    const currentDate = new Date().getTime();

    // Task hold status
    if (currentDate < startDate && task.status != Status.Hold) {
      logStatusChange(task._id.toString(), task.status, Status.Active);

      // Set status
      task.status = Status.Hold;
    }

    // Task overdue status
    if (
      currentDate > dueDate &&
      task.status != Status.Overdue &&
      task.status != Status.Completed
    ) {
      logStatusChange(task._id.toString(), task.status, Status.Overdue);

      // Set status
      task.status = Status.Overdue;

      // Notify a user that task status has changed
      const isSent = sendMessage(user._id, "notification", {
        message: "Overdue alart!",
      });
    }

    // Task active status
    if (
      currentDate > startDate &&
      currentDate < dueDate &&
      task.status != Status.Active
    ) {
      logStatusChange(task._id.toString(), task.status, Status.Active);

      // Set stauts
      task.status = Status.Active;
    }

    // Update task status
    await task.updateOne({ status: task.status });
  }

  console.log(
    colors.green.italic(
      "Task status Scheduler has successfully ran at time: " + new Date()
    )
  );
};

// Log status changes
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

import { ITodoDocument } from "../../interfaces";

// Get an element inside task.todos
const getTodoIndexById = (array: ITodoDocument[], id: string) => {
  let isTodoExist = false;
  let todoIndex = -1;

  array.map((element: ITodoDocument, index) => {
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

export default getTodoIndexById;

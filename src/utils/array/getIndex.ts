import { ITodo } from "../../interfaces";

const getTodoIndexById = (array: ITodo[], id: string) => {
  let isTodoExist = false;
  let todoIndex = -1;

  array.map((element: ITodo, index) => {
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

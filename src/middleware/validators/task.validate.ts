import { validate } from "../../utils";

const taskValidate = (validationCase: "edit" | "create") => {
  switch (validationCase) {
    case "create":
      return [
        validate("name").isUnique("Task").isRequired().isString().exec(),
        validate("description").isLength(20, 200).exec(),
        validate("startDate").isDate().exec(),
        validate("dueDate").isDate().exec(),
      ];
    case "edit":
      return [];
  }
};

export default taskValidate;

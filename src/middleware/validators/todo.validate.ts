import { validate } from "../../utils";

const todoValidate = (
  validationCase: "edit" | "check" | "delete" | "create"
) => {
  switch (validationCase) {
    case "check" || "delete":
      validate("todoId").isRequired().isObjectId().exec();
    case "edit" || "create":
      validate("paragraph").isRequired().isString().exec();
    default:
      return [];
  }
};

export default todoValidate;

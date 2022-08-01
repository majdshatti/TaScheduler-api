import { validate } from "../../utils";

const todoValidate = (
  validationCase: "edit" | "check" | "delete" | "create"
) => {
  switch (validationCase) {
    case "check" || "delete":
      return [
        validate("id").isObjectId().exec(),
        validate("todoId").isRequired().isObjectId().exec(),
      ];
    case "create":
      return [
        validate("id").isObjectId().exec(),
        validate("paragraph").isRequired().isString().exec(),
      ];
    case "edit":
      return [
        validate("id").isObjectId().exec(),
        validate("todoId").isRequired().isObjectId().exec(),
        validate("paragraph").isRequired().isString().exec(),
      ];
    default:
      return [];
  }
};

export default todoValidate;

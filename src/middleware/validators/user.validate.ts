import { validate } from "../../utils";

const userValidate = (
  validationCase: "edit" | "delete" | "forgot" | "reset"
) => {
  switch (validationCase) {
    case "delete":
      return [];
    case "edit":
      return [
        validate("username").optional().isString().isUnique("User").exec(),
        validate("email").optional().isEmail().isUnique("User").exec(),
      ];
    case "forgot":
      return [];
    case "reset":
      return [];
    default:
      return [];
  }
};

export default userValidate;

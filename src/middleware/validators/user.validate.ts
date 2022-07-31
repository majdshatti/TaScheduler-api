import { validate } from "../../utils";

const userValidate = (validationCase: "edit" | "delete") => {
  switch (validationCase) {
    case "delete":
      return [];
    case "edit":
      return [
        validate("username").optional().isString().isUnique("User").exec(),
        validate("email").optional().isEmail().isUnique("User").exec(),
      ];

    default:
      return [];
  }
};

export default userValidate;

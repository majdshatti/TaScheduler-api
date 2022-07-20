import { validate } from "../../utils";

const authValidate = (validationCase: "login" | "register") => {
  switch (validationCase) {
    case "login":
      return [
        validate("username").isRequired().exec(),
        validate("password").isRequired().exec(),
      ];
    case "register":
      return [
        validate("username").isRequired().isString().isUnique("User").exec(),
        validate("password").isRequired().isLength(8, 20).exec(),
        validate("email").isRequired().isEmail().exec(),
      ];
    default:
      return [];
  }
};

export default authValidate;

import { param } from "express-validator";
import { validate } from "../../utils";

const projectValidate = (validationCase: "edit" | "create") => {
  switch (validationCase) {
    case "create":
      return [
        validate("name").isRequired().isUnique("Project").isString().exec(),
        validate("description")
          .isRequired()
          .isString()
          .isLength(10, 200)
          .exec(),
      ];
    case "edit":
      return [
        validate("name").optional().isUnique("Project").isString().exec(),
        validate("description")
          .optional()
          .isRequired()
          .isString()
          .isLength(10, 200)
          .exec(),
      ];
    default:
      return [];
  }
};

export default projectValidate;

import { validate } from "../../utils";

//* Validation Task inputs cases
const taskValidate = (
  validationCase: "edit" | "create" | "complete" | "delete"
) => {
  switch (validationCase) {
    case "create":
      return [
        validate("project")
          .isRequired()
          .isObjectId()
          .isExist("Project", "_id")
          .exec(),
        validate("name").isRequired().isString().isUnique("Task").exec(),
        validate("description").optional().isLength(20, 200).exec(),
        validate("dueDate").isRequired().isDate().exec(),
        validate("startDate").isRequired().isDate().isStartDateSmaller().exec(),
      ];
    case "edit":
      return [
        validate("id").isObjectId().exec(),
        validate("name").optional().isString().isUnique("Task").exec(),
        validate("description").optional().isLength(20, 200).exec(),
      ];
    case "delete":
      return [validate("id").isObjectId().exec()];
    case "complete":
      return [
        validate("id")
          .isObjectId()
          .isExist("Task", "_id", true)
          .isTaskStatusTheSame("Completed")
          .exec(),
      ];
    default:
      return [];
  }
};

export default taskValidate;

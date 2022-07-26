import { validate } from "../../utils";

const taskValidate = (validationCase: "edit" | "create" | "complete") => {
  switch (validationCase) {
    case "create":
      return [
        validate("project")
          .isRequired()
          .isObjectId()
          .isExist("Project", "_id")
          .exec(),
        validate("user")
          .isRequired()
          .isObjectId()
          .isExist("User", "_id")
          .exec(),
        validate("todos").exec(),
        validate("todos.*").isString().exec(),
        validate("name").isUnique("Task").isRequired().isString().exec(),
        validate("description").isLength(20, 200).exec(),
        validate("dueDate").isDate().exec(),
        validate("startDate").isDate().isStartDateSmaller().exec(),
      ];
    case "edit":
      return [
        validate("name").optional().isUnique("Task").isString().exec(),
        validate("description").isLength(20, 200).exec(),
      ];
    case "complete":
      return [
        validate("slug")
          .isExist("Task", "slug", true)
          .isTaskStatusTheSame("Completed")
          .exec(),
      ];
    default:
      return [];
  }
};

export default taskValidate;

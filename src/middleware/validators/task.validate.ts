import validate from "../../utils/validation/validate";

const taskValidate = () => {
  return [
    validate("name").isUnique("Task").isRequired().isString().exec(),
    validate("description").isLength(20, 200).exec(),
    validate("startDate").isDate().exec(),
    validate("dueDate").isDate().exec(),
  ];
};

export default taskValidate;

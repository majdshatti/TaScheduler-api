import { errorSentances, langTerms, successSentances } from "../types";

const enTerms: langTerms = {
  name: "name",
  username: "username",
  description: "description",
  id: "id",
  slug: "slug",
  project: "project",
  task: "task",
  user: "user",
};

const enSuccessData = (path: string): successSentances => {
  const sentances: successSentances = {
    create: `${path} has been created successfully`,
    edit: `${path} has been edited successfully`,
    delete: `${path} has been delete successfully`,
    emailSent: `Email is sent successfully`,
    resetPass: `Password reset successfully`,
  };

  return sentances;
};

const enErrorData = (path: string, value?: string): errorSentances => {
  const sentances: errorSentances = {
    required: `${path} is required!.`,
    special:
      "Incorrect format: " + path + " must contain only letters and numbers!.",
    email: "Please enter an email with the format of: example@example.com.",
    number: `Incorrect value entered: ${path} must only contain numbers.`,
    zip: `Please enter a valid Zip code for your region.`,
    unique: `${article(
      path
    ).toUpperCase()} ${path} with the same value is already exist!.`,
    minLength: `${path} must be atleast ${value ?? "2"} characters.`,
    maxLength: `${path} must be atleast ${value ?? "12"} characters.`,
    boolean: `Incorrect value entred: ${path} must be a boolean.`,
    date: `Incorrect date format.`,
    string: `${path} must be a string!.`,
    betweenLength: `Must contain between ${value ?? "20, to 200"} characters`,
    credentials: `Invalid username or password!.`,
    exist: `${path} does not exist!.`,
    operation: `Operation ${path} could not be performed, try again later.`,
    statusSame: `${path} is already has the same status: ${value}`,
    serverError: `An error occured while trying to perform this operation.`,
    auth: `Not authenticated to access this route`,
    extraFields: `'${path}' is not recognized as a request parameter.`,
    invalidToken: "Invailed token",
  };

  return sentances;
};

// Descide wether an or a is need for path
const article = (path: string): "an" | "a" => {
  let articleChar: string = "a";
  const pathFirstCharacter: string = path[0];
  const phonetic: string[] = ["o", "i", "e", "a", "u"];

  if (phonetic.includes(pathFirstCharacter)) articleChar = "an";

  return articleChar as "a" | "an";
};

export { enTerms, enErrorData, enSuccessData };

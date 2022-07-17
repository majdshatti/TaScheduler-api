import { messageTypes } from "../types/messages.types";

const enData = (path: string, value?: string): messageTypes => {
  const terms: messageTypes = {
    required: `${path} is required!.`,
    special:
      "Incorrect format: " + path + " must contain only letters and numbers!.",
    email: "Please enter an email with the format of: example@example.com.",
    number: `Incorrect value entered: ${path} must only contain numbers.`,
    zip: `Please enter a valid Zip code for your region.`,
    unique: `${article(path)} ${path} with the same value is already exist!.`,
    minLength: `${path} must be atleast ${value ?? "2"} characters.`,
    maxLength: `${path} must be atleast ${value ?? "12"} characters.`,
    boolean: `Incorrect value entred: ${path} must be a boolean.`,
    date: `Incorrect date format.`,
    string: `${path} must be a string!.`,
    betweenLength: `must contain between ${value ?? "20, to 200"} characters`,
  };

  return terms;
};

// Descide wether an or a is need for path
const article = (path: string): "an" | "a" => {
  let articleChar: string = "a";
  const pathFirstCharacter: string = path[0];
  const phonetic: string[] = ["o", "i", "e", "a", "u"];

  if (phonetic.includes(pathFirstCharacter)) articleChar = "an";

  return articleChar as "a" | "an";
};

export default enData;

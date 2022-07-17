// Types
import { messageTypes } from "../types/messages.types";

// Languages Data
import { arData, enData } from "./";

// Get terms based on language
export const getLanguageData = (path: string, value?: string): messageTypes => {
  let lang = "ar";

  switch (lang) {
    case "ar":
      return arData(path, value);
    case "en":
      return enData(path, value);
    default:
      return enData(path, value);
  }
};

// Languages Data
import {
  arErrorData,
  arSuccessData,
  arTerms,
  enErrorData,
  enSuccessData,
  enTerms,
} from "./";

// Get terms based on language
export const getLanguageData = (lang: string, path: string, value?: string) => {
  switch (lang) {
    case "ar":
      return {
        terms: arTerms,
        errorData: arErrorData(path, value),
        successData: arSuccessData(path),
      };
    case "en":
      return {
        terms: enTerms,
        errorData: enErrorData(path, value),
        successData: enSuccessData(path),
      };
    default:
      return {
        terms: enTerms,
        errorData: enErrorData(path, value),
        successData: enSuccessData(path),
      };
  }
};

export const getEnData = (path: string, value?: string) => {
  return {
    terms: enTerms,
    errorData: enErrorData(path, value),
    successData: enSuccessData(path),
  };
};

export const getArData = (path: string, value?: string) => {
  return {
    terms: arTerms,
    errorData: arErrorData(path, value),
    successData: arSuccessData(path),
  };
};

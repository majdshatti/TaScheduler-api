import { errorSentances } from "../../types";
import { getArData, getEnData } from "../../lang";

export const getErrorMessage = (
  type: keyof errorSentances,
  path: string,
  value?: string
) => {
  const arSentance = getArData(path, value).errorData;
  const enSentance = getEnData(path, value).errorData;
  return {
    ar: arSentance[type],
    en: enSentance[type],
  };
};

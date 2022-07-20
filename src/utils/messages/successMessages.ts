import { successSentances } from "../../types";

import { getArData, getEnData } from "../../lang";

export const getSuccessMessage = (
  type: keyof successSentances,
  path: string
) => {
  const arSentance = getArData(path).successData;
  const enSentance = getEnData(path).successData;
  return {
    ar: arSentance[type],
    en: enSentance[type],
  };
};

import { messageTypes } from "../../types/messages.types";
import { getLanguageData } from "../../lang/";

export const getErrorMessage = (
  type: keyof messageTypes,
  path: string,
  value?: string
) => {
  const sentance = getLanguageData(path, value);
  return sentance[type];
};

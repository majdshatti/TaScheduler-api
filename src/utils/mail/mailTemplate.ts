import { resetTemplate } from "../";

const mailTemplate = (template: string, value: string) => {
  let htmlTemplate: string = "";

  switch (template) {
    case "resetPassword":
      htmlTemplate = resetTemplate(value);
      return htmlTemplate;
    default:
      return "";
  }
};

export default mailTemplate;

import { SendMailOptions } from "nodemailer";

export interface IMailOptions extends SendMailOptions {
  to: string;
  from: string;
  html: string;
  subject: string;
}

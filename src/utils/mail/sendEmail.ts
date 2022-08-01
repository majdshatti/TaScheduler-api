import nodemailer from "nodemailer";
import { mailTemplate } from "../";
import { IMailOptions } from "../../interfaces";

const sendEmail = async (options: any) => {
  // send mail with defined transport object
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Get an html template
  let html = mailTemplate(options.template, options.value);

  // Form message header and body
  const message: IMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: html,
  };

  // Get sending email results
  const info = await transport.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;

import nodemailer from "nodemailer";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { emailTemplate } from "./emailTemplate.js";

export default async function sendEmail(user) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arabeea7104@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const emailToken = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.SECRETKEY,
    {
      expiresIn: "1h",
    },
  );

  const info = await transporter.sendMail({
    from: '"Note APP" <arabeea7104@gmail.com>',
    to: user.email,
    subject: "Verify Your Email!",
    text: "Thanks For Registeration",
    html: emailTemplate(emailToken),
  });
}

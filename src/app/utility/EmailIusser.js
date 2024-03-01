import nodemailer from "nodemailer";

export async function sendMail(EmailTo, EmailText, EmailSubject) {
  console.log(EmailTo, EmailText, EmailSubject);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // or 465 for SSL
    secure: false,
    auth: {
      user: "sarkarsoumik215@gmail.com",
      pass: "unyn oiqq kavj awzj",
    },
  });
  const mailOptions = {
    from: "sarkarsoumik215@gmail.com",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
}

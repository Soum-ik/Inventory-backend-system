import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sarkarsoumik215@gmail.com",
    pass: "ldaz tsjh arcm unle",
  },
});

const sendEmail = async (EmailTo, EmailSubject, EmailText) => {
  const mailOptions = {
    from: "sarkarsoumik215@gmail.com",
    to: EmailTo,
    subject: EmailSubject,
    html: EmailText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;

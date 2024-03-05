import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sarkarsoumik215@gmail.com",
    pass: "unyn oiqq kavj awzj",
  },
});

const sendEmail = async (EmailText, EmailSubject, EmailTo) => {
  const mailOptions = {
    from: "sarkarsoumik215@gmail.com",
    to: `${EmailTo}`,
    subject: `${EmailSubject}`,
    text: `${EmailText}`,
  };
  console.log("data");
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response, "Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;

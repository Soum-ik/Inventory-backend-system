import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sarkarsoumik215@gmail.com",
    pass: "smsw kceo zlmj wdgm",
  },
});

const sendEmail = async (EmailTo, EmailSubject, EmailText) => {
  console.log(EmailTo, EmailSubject, EmailText);
  const mailOptions = {
    from: "sarkarsoumik215@gmail.com",
    to: EmailTo,
    subject: EmailSubject,
    html: EmailText,
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

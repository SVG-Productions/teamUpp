require("dotenv").config();

const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const isProduction = process.env.NODE_ENV === "production";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const sendConfirmationEmail = async (name, email, confirmationCode) => {
  try {
    await transport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "TeamApp account confirmation",
      html: `<div> <h1>Email Confirmation</h1>
                   <h2>Hello ${name}</h2>
                   <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                   <a href=${
                     isProduction
                       ? "https://teamapp-asgn.onrender.com"
                       : "http://localhost:3000"
                   }/confirm/${confirmationCode}> Click here</a>
                   </div>
                   `,
    });
  } catch (error) {
    console.error(error.message);
    throw new Error("Problem sending account confirmation email.");
  }
};

const sendResetPasswordEmail = async (name, email, resetPassword) => {
  try {
    await transport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "TeamApp password reset",
      html: `<div> <h1>Password Reset</h1>
                   <h2>Hello ${name}</h2>
                   <p>There has been a request to reset the password for your account. Please follow the link below to proceed.</p>
                   <a href=${
                     isProduction
                       ? "https://teamapp-asgn.onrender.com"
                       : "http://localhost:3000"
                   }/reset-password/${resetPassword}> Click here</a>
                   </div>
                   `,
    });
  } catch (error) {
    console.error(error.message);
    throw new Error("Problem sending email to reset password.");
  }
};

const sendContactUsEmail = async (email, subject, message) => {
  try {
    await transport.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: email,
      subject: subject + ` from: ${email}`,
      html: message + `<p>from: ${email}</p>`,
    });
  } catch (error) {
    console.error(error.message);
    throw new Error("Problem sending message. Please try again.");
  }
};

module.exports = {
  sendConfirmationEmail,
  sendResetPasswordEmail,
  sendContactUsEmail,
};

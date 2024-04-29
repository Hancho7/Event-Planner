const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { genericResponse } = require("./response");
require("dotenv").config();

module.exports = {
  sendSMS: async (phone, message) => {
    const respone = await axios.get(
      `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=+${phone}&from=HanchoTech&sms=${message}`
    );

    return respone;
  },
  sendEmail: async (recipient_email, subject, templateFile, templateData) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const templatePath = path.join(
        __dirname,
        "..",
        "templates",
        templateFile
      );

      const emailTemplate = await ejs.renderFile(templatePath, templateData);
      console.log("email template", emailTemplate);

      const response = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient_email,
        subject: subject,
        html: emailTemplate,
      });

      return genericResponse(
        200,
        "Email sent successfully",
        response,
        "success"
      );
    } catch (error) {
      if (error instanceof Error) {
        return genericResponse(500, error.message, null, "error");
      } else {
        return genericResponse(500, "Something went wrong", null, "error");
      }
    }
  },
};

const db = require("../../models");
const { sendEmail } = require("../../utils/services");
const { Users } = db;

module.exports = {
  signUp: async (req, res) => {
    await sendEmail(
      "hanchoTech@google.com",
      "Event-Planner",
      "clientVerification.ejs",
      {
        clientName: "hancho",
        verificationLink: "https://www.google.com",
      }
    );
  },
  signIn: async (req, res) => {},
};

const { where, Op } = require("sequelize");
const db = require("../../models");
const { sendEmail, sendSMS } = require("../../utils/communication");
const { responseMiddleware, genericResponse } = require("../../utils/response");
const generateRandomSixDigitNumber = require("../../utils/randomNumbers");
const { hashText, compareHashes } = require("../../utils/bcrypt");
const { Users, Tokens } = db;

module.exports = {
  signUp: async (req, res) => {
    const { name, email, phone_number, password } = req.body;
    if (!name || !email || !phone_number || !password) {
      return responseMiddleware(
        res,
        400,
        "Please fill all the fields",
        null,
        "Error"
      );
    }
    try {
      const user = await Users.findOne({
        where: {
          [Op.or]: {
            email: email,
            phone_number: phone_number,
          },
        },
      });
      if (user) {
        if (user.phone_number_verified && user.email_verified) {
          return responseMiddleware(
            res,
            409,
            "This account has already been verified",
            "success"
          );
        } else {
          const token = await Tokens.findOne({
            where: { clientID: user.client_id },
          });
          if (token) {
            const emailSent = await sendEmail(
              user.email,
              "Verification Email",
              "clientVerification.ejs",
              { clientName: user.name, verificationLink: token.tokenLink }
            );
            const smsSent = await sendSMS(
              user.phone_number,
              `Your verification code is ${token.smsCode}`
            );
            if (emailSent && smsSent) {
              return responseMiddleware(
                res,
                "200",
                "Both verification link and code are sent to your email and phone number respectively"
              );
            }
            return responseMiddleware(res);
          } else {
            return responseMiddleware(
              res,
              "400",
              "Please come back in 10 mins to sign up again ",
              "Error signing up"
            );
          }
        }
      }

      const hashedPassword = await hashText(password, 10);

      const newUser = await Users.build({
        name: name,
        email: email,
        phone_number: phone_number,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      if (!savedUser) {
        return responseMiddleware();
      } else {
        const token = await Tokens.build({
          clientID: user.client_id,
          tokenLink: crypto.randomBytes(32).toString("hex"),
          smsCode: generateRandomSixDigitNumber(),
        });

        const savedToken = await token.save();
        if (savedToken) {
          const emailSent = await sendEmail(
            savedUser.email,
            "Verification Link",
            "clientVerification.ejs",
            {
              clientName: savedUser.name,
              verificationLink: savedToken.tokenLink,
            }
          );

          const smsSent = await sendSMS(
            savedUser.phone_number,
            `Your verification code is ${savedToken.smsCode}`
          );

          if (emailSent && smsSent) {
            return responseMiddleware(
              res,
              "200",
              "Both verification link and code are sent to your email and phone number respectively"
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return responseMiddleware(
          res,
          500,
          error.message,
          null,
          "Server Error"
        );
      }
      return responseMiddleware(
        res,
        500,
        "Something went wrong with server",
        null,
        "Server Error"
      );
    }
  },
  signIn: async (req, res) => {},
};

const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");
const crypto = require("crypto");
const { sendEmail } = require("../../utils/communication");
const { hashText } = require("../../utils/bcrypt");
const { Op, where } = require("sequelize");
const { generateRandomSixDigitNumber } = require("../../utils/random");
const { Users, Tokens } = db;

module.exports = {
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    console.log("email", email);
    try {
      const transaction = await db.sequelize.transaction();
      try {
        const user = await Users.findOne({ where: { email } }, { transaction });
        if (!user) {
          await transaction.rollback();
          return responseMiddleware(res, 400, "User not found", null, "Error");
        }

        const token = await Tokens.create(
          {
            userID: user.userID,
            tokenLink: crypto.randomBytes(32).toString("hex"),
            smsCode: generateRandomSixDigitNumber(),
          },
          { transaction }
        );
        console.log("token", token);
        if (!token) {
          await transaction.rollback();
          return responseMiddleware(res, 400, "Error", null, "Error");
        }

        const url = `${process.env.FRONT_END_URL}/update-password/${user.userID}/${token.tokenLink}`;
        const emailSent = await sendEmail(
          user.email,
          "RESET PASSWORD",
          "forgottenPassword.ejs",
          {
            userName: user.name,
            resetPasswordLink: url,
          }
        );

        console.log("emailSent", emailSent);
        await transaction.commit();
        return responseMiddleware(
          res,
          200,
          "Email sent successfully",
          null,
          "Success"
        );
      } catch (error) {
        await transaction.rollback();
        console.log("error", error);
        return responseMiddleware(res, 400, "Error", null, "Error");
      }
    } catch (error) {
      console.log("error", error);
      return responseMiddleware(res, 500, "Error", null, "Server Error");
    }
  },

  updatePassword: async (req, res) => {
    const { userID, tokenLink } = req.params;
    const { password } = req.body;
    try {
      const transaction = await db.sequelize.transaction();
      try {
        const token = await Tokens.findOne(
          { where: { userID, tokenLink } },
          { transaction }
        );
        if (!token) {
          await transaction.rollback();
          return responseMiddleware(res, 400, "Invalid token", null, "Error");
        }
        const user = await Users.findOne(
          { where: { userID } },
          { transaction }
        );
        if (!user) {
          await transaction.rollback();
          return responseMiddleware(res, 400, "User not found", null, "Error");
        }
        const hashedPassword = await hashText(password, 10);
        const updatedUser = await Users.update(
          { password: hashedPassword },
          { where: { userID } },
          { transaction }
        );
        if (!updatedUser) {
          await transaction.rollback();
          return responseMiddleware(
            res,
            400,
            "Error updating Password",
            null,
            "Error"
          );
        }

        const deletedToken = await token.destroy({ transaction });
        console.log("deletedToken", deletedToken);
        await transaction.commit();
        return responseMiddleware(
          res,
          200,
          "Password updated successfully",
          null,
          "Success"
        );
      } catch (error) {
        await transaction.rollback();
        console.log("error", error);
        return responseMiddleware(res, 500, "Error", null, "Server Error");
      }
    } catch (error) {
      console.log("error", error);
      return responseMiddleware(res, 500, "Error", null, "Server Error");
    }
  },
};

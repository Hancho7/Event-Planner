const { initializeTransaction } = require("../../utils/paystack");
const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");
const { where, Op } = require("sequelize");
const { Payments, Users } = db;

module.exports = {
  initializePaymentRequest: async (req, res) => {
    const { userID, amount, type } = req.body;
    console.log("request body", req.body);

    try {
      const user = await Users.findOne({ where: { userID } });
      console.log("user ID", user.userID);
      if (!user) {
        return responseMiddleware(res, 404, "User not found", null, "Error");
      }
      const actualAmount = amount * 100;
      console.log("actualAmount", actualAmount);
      const request = await initializeTransaction(user.email, actualAmount);
      console.log("request", request);

      const saveRequest = await Payments.create({
        userID: user.userID,
        name: user.name,
        email: user.email,
        amount,
        type,
        paystack: {
          authorization_url: request.data.authorization_url,
          access_code: request.data.access_code,
          reference: request.data.reference,
        },
      });

      console.log("saveRequest", saveRequest);

      if (!saveRequest) {
        return responseMiddleware(
          res,
          500,
          "Error creating request",
          null,
          "Error"
        );
      }
      console.log("request", request);
      return responseMiddleware(
        res,
        200,
        "request successfully made",
        { authorization_url: request.data.authorization_url },
        "Success"
      );
    } catch (error) {
      return responseMiddleware(res, 500, error.message, null, "Error");
    }
  },
  getUserUnpaidRequests: async (req, res) => {
    const { userID } = req.body;

    try {
      const payments = await Payments.findAll({
        where: {
          [Op.and]: [{ userID }, { paid: false }],
        },
        attributes: ["name", "amount", "paystack", "type"],
      });

      if (!payments || payments.length === 0) {
        return responseMiddleware(
          res,
          404,
          "No unpaid requests found",
          null,
          "Error"
        );
      }

      const allPayments = payments.map((payment) => {
        return {
          name: payment.name,
          amount: payment.amount,
          type: payment.type,
          url: payment.paystack.authorization_url,
          reference: payment.paystack.reference,
        };
      });

      return responseMiddleware(
        res,
        200,
        "Unpaid requests found",
        allPayments,
        "Success"
      );
    } catch (error) {
      return responseMiddleware(res, 500, error.message, null, "Error");
    }
  },

  deleteSpecificRequest: async (req, res) => {
    const { userID, reference } = req.body;

    try {
      // Find the specific request
      const request = await Payments.findOne({
        where: {
          [Op.and]: [
            { userID },
            { paystack: { reference } }, // Note: Sequelize does not support nested JSON queries directly
          ],
        },
      });

      // Verify if request exists
      if (!request) {
        return responseMiddleware(res, 404, "Request not found", null, "Error");
      }

      // Delete the request
      await request.destroy();

      return responseMiddleware(
        res,
        200,
        "Request successfully deleted",
        null,
        "Success"
      );
    } catch (error) {
      return responseMiddleware(res, 500, error.message, null, "Error");
    }
  },
};

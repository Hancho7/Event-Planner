const { initializeTransaction } = require("../../utils/paystack");
const db = require("../../models");
const { responseMiddleware } = require("../../utils/response");
const { where, Op } = require("sequelize");
const { Payments, Users, Events } = db;

module.exports = {
  initializePaymentRequest: async (req, res) => {
    const { userID, amount, type, subaccount } = req.body;
    console.log("request body", req.body);

    try {
      const user = await Users.findOne({ where: { userID } });
      console.log("user ID", user.userID);
      if (!user) {
        return responseMiddleware(res, 404, "User not found", null, "Error");
      }
      const actualAmount = amount * 100;
      console.log("actualAmount", actualAmount);
      const request = await initializeTransaction(
        user.email,
        actualAmount,
        subaccount
      );
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
        "Payment initiated successfully",
        { authorization_url: request.data.authorization_url },
        "Success"
      );
    } catch (error) {
      return responseMiddleware(res, 500, error.message, null, "Error");
    }
  },
  retrieveUserPayments: async (req, res) => {
    const { userID } = req.params;
    console.log("userID", userID);

    try {
      // Find the user by userID
      const user = await Users.findOne({ where: { userID } });
      if (!user) {
        return responseMiddleware(res, 404, "User not found");
      }

      // Find all payments for the user
      const payments = await Payments.findAll({ where: { userID } });

      // Fetch event names for each payment
      const paymentsWithEventNames = await Promise.all(
        payments.map(async (payment) => {
          const event = await Events.findOne({
            attributes: ["name"], // Select only 'name' attribute
            where: { eventID: payment.eventID },
          });
          return {
            id: payment.id,
            type: payment.type,
            paid: payment.paid,
            paystack: payment.paystack?.authorization_url,
            amount: payment.amount,
            eventName: event ? event.name : null, // Return null if event is not found
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
          };
        })
      );

      return responseMiddleware(
        res,
        200,
        "Payments retrieved successfully",
        paymentsWithEventNames,
        "Success"
      );
    } catch (error) {
      console.log("error", error);
      return responseMiddleware(
        res,
        500,
        "Internal server error",
        null,
        error.message
      );
    }
  },

  deleteSpecificPaymentRequest: async (req, res) => {
    const { userID, id } = req.body;

    try {
      // Find the specific request
      const request = await Payments.findOne({
        where: {
          [Op.and]: [{ userID }, { id }],
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

require("dotenv").config();
const crypto = require("crypto");
const db = require("../../models");
const { Payments } = db;
const { responseMiddleware } = require("../../utils/response");
const { Op, where } = require("sequelize");

const processedTransactions = new Set();

const verifyWebhookSignature = (req, secret) => {
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  return hash === req.headers["x-paystack-signature"];
};

const processTransaction = async (eventData) => {
  console.log("event data", eventData);
  try {
    const payment = await Payments.findOne({
      where: {
        email: eventData.customer.email,
        paystack: {
          reference: eventData.reference,
        }, // Adjusted query
      },
    });

    if (!payment) {
      console.log("Payment not found for reference:", eventData.reference);
      return false;
    }

    // Update the paid status to true
    payment.paid = true;
    await payment.save();

    return true;
  } catch (error) {
    console.error("Error occurred while processing webhook data:", error);
    return false;
  }
};

const webhook = async (req, res) => {
  console.log("request body", req.body);
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!verifyWebhookSignature(req, secret)) {
    console.log("Hash mismatch. Request might be tampered with.");
    return responseMiddleware(res, 401, "Invalid request", null, "Error");
  }

  const eventData = req.body.data;

  if (processedTransactions.has(eventData.reference)) {
    console.log("Transaction already processed:", eventData.reference);
    return responseMiddleware(
      res,
      200,
      "Transaction already processed",
      null,
      "Success"
    );
  }

  processedTransactions.add(eventData.reference);

  if (eventData.status === "success") {
    const success = await processTransaction(eventData);
    if (success) {
      return responseMiddleware(
        res,
        200,
        "Transaction processed successfully",
        null,
        "Success"
      );
    } else {
      return responseMiddleware(
        res,
        500,
        "Error processing transaction",
        null,
        "Error"
      );
    }
  } else {
    console.log("Transaction status is not successful.");
    return responseMiddleware(res, 400, "Transaction failed", null, "Error");
  }
};

module.exports = { webhook };

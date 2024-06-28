// routes.js
const express = require("express");
const { limit } = require("../middleware/rateLimit");
const {
  initializePaymentRequest,
  retrieveUserPayments,
  deleteSpecificPaymentRequest,
} = require("../controllers/payment/payment");
const { webhook } = require("../controllers/payment/webhook");

const router = express.Router();

router.post("/initialize-planner-request", initializePaymentRequest);
router.get("/get-user-payment/:userID", retrieveUserPayments);
router.post("/delete-user-payment-request", deleteSpecificPaymentRequest);
router.post("/webhook", webhook);

module.exports = router;

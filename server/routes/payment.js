// routes.js
const express = require("express");

const { limit } = require("../middleware/rateLimit");
const {
  initializePaymentRequest,
  getUserUnpaidRequests,deleteSpecificRequest
} = require("../controllers/payment/payment");

const router = express.Router();

router.post("/initialize-planner-request", initializePaymentRequest);
router.post("/get-user-unpaid-requests", getUserUnpaidRequests);
router.post("/delete-user-payment-request", deleteSpecificRequest);

module.exports = router;

const express = require("express");
const logsRouter = require("./logs");
const paymentRouter = require("./payment");

const router = express.Router();

// Add routes here
router.use("/logs", logsRouter);
router.use("/payment", paymentRouter);

module.exports = router;

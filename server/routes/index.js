const express = require("express");
const logsRouter = require("./logs");
const paymentRouter = require("./payment");
const eventRouter = require("./events");

const router = express.Router();

// Add routes here
router.use("/logs", logsRouter);
router.use("/payment", paymentRouter);
router.use("/events", eventRouter);

module.exports = router;

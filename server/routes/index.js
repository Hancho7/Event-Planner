const express = require("express");
const logsRouter = require("./logs");

const router = express.Router();

// Add routes here
router.use("/logs", logsRouter);

module.exports = router;

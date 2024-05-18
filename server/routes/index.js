const express = require("express");
const logsRouter = require("./logs");

const router = express.Router();

// Add routes here
router.use("/users", logsRouter);

module.exports = router;

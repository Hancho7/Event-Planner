const express = require("express");
const clientRouter = require("./client");

const router = express.Router();

// Add routes here
router.use("/clients", clientRouter);

module.exports = router;

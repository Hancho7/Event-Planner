const express = require("express");
const clientRouter = require("./client");
const plannerRouter = require("./planners");

const router = express.Router();

// Add routes here
router.use("/clients", clientRouter);
router.use("/event-planners", plannerRouter);

module.exports = router;

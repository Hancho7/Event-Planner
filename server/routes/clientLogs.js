const express = require("express");
const { signUp } = require("../controllers/clients/clientLogs");

const router = express.Router();

router.get("/signup", signUp);

module.exports = router;

// routes.js
const express = require("express");
const { signup } = require("../controllers/logs/signup");
const {
  signupVerification,
} = require("../controllers/logs/signupVerification");
const { signin } = require("../controllers/logs/signin");
const { limit } = require("../middleware/rateLimit");

const router = express.Router();

router.post("/sign-up", limit, signup);
router.post("/:userID/:tokenLink", signupVerification);
router.post("/sign-in", limit, signin);

module.exports = router;

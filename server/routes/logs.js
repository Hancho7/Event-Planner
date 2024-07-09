// routes.js
const express = require("express");
const { signup } = require("../controllers/logs/signup");
const {
  signupVerification,
} = require("../controllers/logs/signupVerification");
const { signin } = require("../controllers/logs/signin");
const { limit } = require("../middleware/rateLimit");
const {
  forgotPassword,
  updatePassword,
} = require("../controllers/logs/forgotPassword");

const router = express.Router();

router.post("/sign-up", limit, signup);
router.post("/:userID/:tokenLink", signupVerification);
router.post("/sign-in", limit, signin);
router.post("/forgot-password", forgotPassword);
router.post("/update-password/:userID/:tokenLink", updatePassword);

module.exports = router;

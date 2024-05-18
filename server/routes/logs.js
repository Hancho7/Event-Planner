const express = require("express");
const { signup } = require("../controllers/logs/signup");
const {
  signupVerification,
} = require("../controllers/logs/signupVerification");
const { signin } = require("../controllers/logs/signin");

const router = express.Router();

router.post("/sign-up", signup);
router.post("/:userID/:tokenLink", signupVerification);
router.post("/sign-in", signin);

module.exports = router;

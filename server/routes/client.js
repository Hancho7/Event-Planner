const express = require("express");
const { signup } = require("../controllers/clients/signup");
const {
  signupVerification,
} = require("../controllers/clients/signupVerification");

const router = express.Router();

router.post("/sign-up", signup);
router.post("/:clientID/:tokenLink", signupVerification);

module.exports = router;

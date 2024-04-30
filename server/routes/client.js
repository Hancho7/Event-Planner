const express = require("express");
const { signup } = require("../controllers/clients/signup");
const {
  signupVerification,
} = require("../controllers/clients/signupVerification");
const { signin } = require("../controllers/clients/signin");

const router = express.Router();

router.post("/sign-up", signup);
router.post("/:clientID/:tokenLink", signupVerification);
router.post("/sign-in", signin);

module.exports = router;

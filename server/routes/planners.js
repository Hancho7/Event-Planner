const express = require("express");
const { signup } = require("../controllers/eventPlanners/signup");
const { upload } = require("../utils/multer");
const {
  signupVerification,
} = require("../controllers/eventPlanners/signupVerification");
const { signin } = require("../controllers/eventPlanners/signin");

const router = express.Router();

router.post("/sign-up", upload.single("profile_picture"), signup);
router.post("/:plannerID/:tokenLink", signupVerification);
router.post("/sign-in", signin);

module.exports = router;

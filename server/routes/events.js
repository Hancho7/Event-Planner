const express = require("express");
const { createEvents } = require("../controllers/events/addEvents");
const { upload } = require("../utils/multer");
const router = express.Router();

router.post("/add-new-event", upload.array("images", 12), createEvents);

module.exports = router;

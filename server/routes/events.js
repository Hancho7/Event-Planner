const express = require("express");
const { createEvents } = require("../controllers/events/addEvents");
const { addUserToEvent } = require("../controllers/events/attendEvent");
const { upload } = require("../utils/multer");
const router = express.Router();

router.post("/add-new-event", upload.array("images", 12), createEvents);
router.post("/attend-event", addUserToEvent);

module.exports = router;

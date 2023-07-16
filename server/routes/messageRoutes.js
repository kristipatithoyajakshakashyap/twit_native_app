const express = require("express");
const {
  savemessagetodbController,
  getmessagesController,
  setusermessagesController,
  getusermessagesController,
} = require("../controllers/messageController");
const router = express.Router();

// SAVE MESSAGE TO DB
router.post("/savemessagetodb", savemessagetodbController);

// GET MESSAGE
router.post("/getmessages", getmessagesController);

// LAST MESSAGE 
router.post("/setusermessages", setusermessagesController);

// GET USER MESSAGES 
router.post("/getusermessages", getusermessagesController);
module.exports = router;

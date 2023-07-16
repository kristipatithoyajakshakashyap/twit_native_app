const express = require("express");
const mongoose = require("mongoose");
const {
  setprofilepicController,
  addpostController,
} = require("../controllers/uploadMediaController");
const User = mongoose.model("User");

const router = express.Router();

// SET PROFILE PIC 
router.post("/setprofilepic", setprofilepicController);

// UPLOAD POST 
router.post("/addpost", addpostController);
module.exports = router;
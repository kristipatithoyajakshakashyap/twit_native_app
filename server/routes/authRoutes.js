const express = require("express");
const {
  verifyController,
  changeUsernameController,
  signupController,
  verifyFPController,
  resetPasswordController,
  signinController,
  userdataController,
  otheruserdataController,
  changepasswordController,
  setusernameController,
  setdescriptionController,
  searchuserController,
  checkfollowController,
  followuserController,
  unfollowuserController,
} = require("../controllers/authController");

const router = express.Router();

// VERIFY CODE
router.post("/verify", verifyController);

// CHANGE USERNAME
router.post("/changeUsername", changeUsernameController);

// SIGNUP
router.post("/signup", signupController);

// FORGOT PASSWORD
router.post("/verifyfp", verifyFPController);

// RESET PASSWORD
router.post("/resetPassword", resetPasswordController);

// SIGN IN
router.post("/signin", signinController);

//OTHER USER DATA
router.post("/otheruserdata", otheruserdataController);

//USER DATA
router.post("/userdata", userdataController);

// CHANGE PASSWORD
router.post("/changepassword", changepasswordController);

// UPDATE USERNAME
router.post("/setusername", setusernameController);

// SET DESCRIPTION
router.post("/setdescription", setdescriptionController);

// GET SEARCH USER BY KEYWORD
router.post("/searchuser", searchuserController);

// CHECK FOLLOW
router.post("/checkfollow", checkfollowController);

// FOLLOW USER
router.post("/followuser", followuserController);

// FOLLOW USER
router.post("/unfollowuser", unfollowuserController);

module.exports = router;

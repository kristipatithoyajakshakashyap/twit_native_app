const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// MAIL FUNCTION
const mailer = async (recieveremail, code) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,

    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.NodeMailer_email, // generated ethereal user
      pass: process.env.NodeMailer_password, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "GeekChat",
    to: `${recieveremail}`,
    subject: "Email Verification",
    text: `Your Verification Code is ${code}`,
    html: `<b>Your Verification Code is ${code}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

// EMAIL VERIFICATION
const verifyController = async (req, res) => {
  //  console.log("sent by client", req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    try {
      let VerificationCode = Math.floor(100000 + Math.random() * 900000);
      await mailer(email, VerificationCode);
      // console.log("Verification Code", VerificationCode);
      res.send({
        message: "Verification Code Sent to your Email",
        VerificationCode,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  });
};

// CHANGE USERNAME
const changeUsernameController = async (req, res) => {
  const { username, email } = req.body;
  User.find({ username }).then(async (savedUser) => {
    if (savedUser.length > 0) {
      return res.status(422).json({ error: "Username already exists" });
    } else {
      return res
        .status(200)
        .json({ message: "Username Available", username, email });
    }
  });
};

// SIGNUP
const signupController = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const user = new User({
      username,
      password,
      email,
    });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "User Registered Successfully", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in signup",
      success: false,
      error,
    });
  }
};

const verifyFPController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      try {
        let VerificationCode = Math.floor(100000 + Math.random() * 900000);
        await mailer(email, VerificationCode);
        // console.log("Verification Code", VerificationCode);
        res.status(200).json({
          message: "Verification Code Sent to your Email",
          VerificationCode,
          email,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
  });
};

const resetPasswordController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        savedUser.password = password;
        savedUser
          .save()
          .then((user) => {
            return res
              .status(200)
              .json({ message: "Password Changes Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  }
};

const signinController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then(async (savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
      } else {
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedUser._id },
              process.env.JWT_SECRET
            );
            const { _id, username, email } = savedUser;
            return res.status(200).json({
              message: "Successfully Signed In",
              token,
              user: { _id, username, email },
            });
          } else {
            return res.status(422).json({ error: "Invalid Credentials" });
          }
        });
      }
    })
    .catch((err) => console.log(err));
};

// USER DATA
const userdataController = async (req, res) => {
  const { authorization } = req.headers;
  //    authorization = "Bearer afasgsdgsdgdafas"
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "You must be logged in, token not given" });
  }
  const token = authorization.replace("Bearer ", "");
  // console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "You must be logged in, token invalid" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      res.status(200).send({
        message: "User Found",
        user: userdata,
      });
    });
  });
};

// CHANGE PASSWORD
const changepasswordController = async (req, res) => {
  const { oldpassword, newpassword, email } = req.body;
  if (!oldpassword || !newpassword || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        bcrypt.compare(oldpassword, savedUser.password).then((doMatch) => {
          if (doMatch) {
            savedUser.password = newpassword;
            savedUser
              .save()
              .then((user) => {
                res.json({ message: "Password Changed Successfully" });
              })
              .catch((err) => console.log(err));
          } else {
            return res.status(402).json({ error: "Server Error" });
          }
        });
      } else {
        return res.status(402).json({ error: "Invalid Credentials" });
      }
    });
  }
};

const setusernameController = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.find({ username: username }).then(async (savedUser) => {
    if (savedUser.length > 0) {
      return res.status(422).json({ error: "Username already exists" });
    }
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        savedUser.username = username;
        savedUser
          .save()
          .then((user) => res.status(400).json({ message: "Username updated" }))
          .catch((err) => {
            return res.status(402).json({ error: "Server Error" });
          });
      } else {
        return res.status(402).json({ error: "Invalid Credentials" });
      }
    });
  });
};

const setdescriptionController = async (req, res) => {
  const { description, email } = req.body;
  if (!description || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then(async (savedUser) => {
      if (savedUser) {
        savedUser.description = description;
        savedUser
          .save()
          .then((user) =>
            res.status(400).json({ message: "description updated" })
          )
          .catch((err) => {
            return res.status(402).json({ error: "Server Error" });
          });
      } else {
        return res.status(402).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      return res.status(402).json({ error: "Server Error" });
    });
};

const searchuserController = async (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
    return res.status(422).json({ error: "Please search a username" });
  }
  User.find({ username: { $regex: keyword, $options: "i" } })
    .then((user) => {
      // console.log(user);
      let data = [];
      user.map((item) => {
        data.push({
          _id: item._id,
          username: item.username,
          email: item.email,
          description: item.description,
          profilepic: item.profilepic,
        });
      });
      if (data.length === 0) {
        return res.status(422).json({ error: "No User Found" });
      }
      res.status(200).send({
        message: "User found",
        user: data,
      });
    })
    .catch((err) => {
      return res.status(422).json({ error: "Server Error" });
    });
};

// OTHER USER DATA
const otheruserdataController = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((saveduser) => {
    if (!saveduser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    let data = {
      _id: saveduser._id,
      username: saveduser.username,
      email: saveduser.email,
      description: saveduser.description,
      profilepic: saveduser.profilepic,
      followers: saveduser.followers,
      following: saveduser.following,
      posts: saveduser.posts,
    };
    res.status(200).send({
      user: data,
      message: "User Found",
    });
  });
};

// CHECK FOLLOW
const checkfollowController = async (req, res) => {
  const { followfrom, followto } = req.body;
  // followfrom = my email
  // followto = friend email
  if (!followfrom || !followto) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }
  User.findOne({ email: followfrom })
    .then((mainuser) => {
      if (!mainuser) {
        return res.status(422).send({ error: "Invalid Credentials" });
      } else {
        let data = mainuser.following.includes(followto);
        if (data === true) {
          res.status(200).send({
            message: "User in following list",
          });
        } else {
          res.status(200).send({
            message: "User not in following list",
          });
        }
      }
    })
    .catch((err) => {
      return res.status(422).json({ error: "Server Error" });
    });
};

// FOLLOW USER
const followuserController = async (req, res) => {
  const { followfrom, followto } = req.body;
  // followfrom = my email
  // followto = friend email
  // our profile => add friends email to our following
  // friends profile => add our email to friends follower
  if (!followfrom || !followto) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }
  User.findOne({ email: followfrom }).then((mainuser) => {
    if (!mainuser) {
      return res.status(422).send({ error: "Invalid Credentials" });
    } else {
      if (mainuser.following.includes(followto)) {
        return res.status(422).json({ error: "Already following" });
      } else {
        mainuser.following.push(followto);
        mainuser.save();
      }
      User.findOne({ email: followto }).then((otheruser) => {
        if (!otheruser) {
          return res.status(422).send({ error: "Invalid Credentials" });
        } else {
          if (otheruser.followers.includes(followfrom)) {
            return res.status(422).json({ error: "Already following" });
          } else {
            otheruser.followers.push(followfrom);
            otheruser.save();
          }
          res.status(200).send({
            message: "User Followed",
          });
        }
      });
    }
  });
};
// UNFOLLOW USER
const unfollowuserController = async (req, res) => {
  const { followfrom, followto } = req.body;
  // followfrom = my email
  // followto = friend email
  // our profile => add friends email to our following
  // friends profile => add our email to friends follower
  if (!followfrom || !followto) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }
  User.findOne({ email: followfrom }).then((mainuser) => {
    if (!mainuser) {
      return res.status(422).send({ error: "Invalid Credentials" });
    } else {
      if (mainuser.following.includes(followto)) {
        mainuser.following.pull(followto);
        mainuser.save();
        User.findOne({ email: followto }).then(otheruser => {
          if (!otheruser) {
            return res.status(422).send({ error: "Invalid Credentials" });
          } else {
            if (otheruser.followers.includes(followfrom)) {
              otheruser.followers.pull(followfrom);
              otheruser.save();
              return res.status(200).json({ message: "User Unfollowed" });
            } else {
              return res.status(422).json({ error: "Not following" });
            }
          }
        })
      } else {
        res.status(422).json({error:"Not following"})
      }
    }
  });
};

module.exports = {
  verifyController,
  changeUsernameController,
  signupController,
  verifyFPController,
  resetPasswordController,
  signinController,
  userdataController,
  changepasswordController,
  setusernameController,
  setdescriptionController,
  searchuserController,
  otheruserdataController,
  checkfollowController,
  followuserController,
  unfollowuserController,
};

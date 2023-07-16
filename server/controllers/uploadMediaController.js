const User = require("../models/User");

const setprofilepicController = async (req, res) => {
  const { email, profilepic } = req.body;
  //   console.log("profilepic: ", profilepic);
  User.findOne({ email: email })
    .then(async (savedUser) => {
      if (savedUser) {
        savedUser.profilepic = profilepic;
        savedUser
          .save()
          .then((user) =>
            res
              .status(400)
              .json({ message: "Profile picture updated successfully" })
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

// ADD POST
const addpostController = async (req, res) => {
  const { email, post, postdescription } = req.body;
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(402).json({ error: "Invalid Credentials" });
      }
      savedUser.posts.push({ post, postdescription, likes: [], comments: [] });
      savedUser.save().then(user => {
        res.status(200).json({message: "Post added successfully"})
      }).catch(err => {
        return res.status(402).json({ error: "Error adding post" });
      })
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  setprofilepicController,
  addpostController,
};

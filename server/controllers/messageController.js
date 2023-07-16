const User = require("../models/User");
const Message = require("../models/Message");

// SAVE MESSAGE TO DB
const savemessagetodbController = async (req, res) => {
  const { senderid, message, roomid, recieverid } = req.body;
  console.log("MESSAGE RECEIVED - ", req.body);
  try {
    const newMessage = new Message({
      senderid,
      message,
      roomid,
      recieverid,
    });
    await newMessage.save();
    res.send({ message: "Message saved successfully" });
  } catch (err) {
    res.status(422).send(err.message);
  }
};

// GET MESSAGES
const getmessagesController = async (req, res) => {
  const { roomid } = req.body;
  console.log("ROOM ID RECEIVED - ", roomid);

  Message.find({ roomid: roomid })
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      console.log(err);
    });
};

// LAST MESSAGE
const setusermessagesController = async (req, res) => {
  const { ouruserid, fuserid, lastmessage, roomid } = req.body;
  console.log("MESSAGE ID RECEIVED - ", fuserid);
  User.findOne({ _id: ouruserid })
    .then((user) => {
      user.allmessages.map((item) => {
        if (item.fuserid == fuserid) {
          user.allmessages.pull(item);
        }
      });
      const date = Date.now();
      user.allmessages.push({ ouruserid, fuserid, lastmessage, roomid, date });
      user.save();
      res.status(200).send({ message: "Message saved successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err.message);
    });
};

// GET USER MESSAGE
const getusermessagesController = async (req, res) => {
  const { userid } = req.body;
  console.log("USER ID RECEIVED - ", userid);
  User.findOne({ _id: userid })
    .then((user) => {
      res.status(200).send(user.allmessages);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err.message);
    });
};

module.exports = {
  savemessagetodbController,
  getmessagesController,
  setusermessagesController,
  getusermessagesController,
};

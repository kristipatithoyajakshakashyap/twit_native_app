const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    roomid: {
      type: String,
      required: true,
    },
    recieverid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);

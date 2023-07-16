const express = require("express");
const colors = require("colors");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

// socket.io
const httpServer = createServer();
const io = new Server(httpServer, {});
app.use(cors());
app.use(bodyParser.json());

// routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
console.log(readdirSync("./routes"));
// DATABASE
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully".bgGreen.white))
  .catch((error) =>
    console.log("Error connection to mongodb".bgRed.white, error)
  );
const PORT = process.env.PORT || 8000;
const PORT1 = process.env.SOCKETIO || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgCyan.white);
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED - ", socket.id);
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED - ", socket.io);
  });
  socket.on("join_room", (data) => {
    console.log("USER WITH ID - ", socket.id, " JOIN ROOM - ", data.roomid);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    console.log("MESSAGE RECEIVED - ", data);
    io.emit("receieve_message", data);
  });
});

httpServer.listen(PORT1, () => {
  console.log(`Socket server is running on ${PORT1}`.bgBlue.white);
});


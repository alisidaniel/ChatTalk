const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");
const Message = require("./message");
const Pusher = require("pusher");
require("dotenv").config();

const app = express();
const server = http.Server(app);

const port = process.env.PORT || 3338;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

var pusher = new Pusher({
  appId: "1183849",
  key: "d6321e7311e7474f0e63",
  secret: "0a8d61979884dc1e81af",
  cluster: "eu",
  useTLS: true,
});

app.post("/pusher/auth", function (req, res) {
  console.log("got into the auth route");
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: "unique_user_id",
    user_info: {
      name: "Mr Channels",
      twitter_id: "@pusher",
    },
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

// app.post("/pusher/auth", (req, res) => {
//   console.log("got into the auth");
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   // Retrieve username from session and use as presence channel user_id
//   const presenceData = {
//     user_id: "Daniel",
//   };
//   const auth = pusher.authenticate(socketId, channel, presenceData);
//   console.log("Pusher Auth", auth);
//   res.send(auth);
// });

// just to test the server
app.get("/chat", async (req, res) => {
  res.status(200).render("index.html");
});

app.get("/test", async (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.get("/", async (req, res) => {
  res.status(200).render("scanner.html");
});

app.get("/scanner2", async (req, res) => {
  res.status(200).render("scanner2.html");
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find({});
  res.status(200).json(messages);
});

app.post("/post/messages", async (req, res) => {
  const response = await Message.create({ ...req.body });
  let msg = pusher.trigger("private-chat", "event", {
    ...response,
  });
  res.status(200).send(response);
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

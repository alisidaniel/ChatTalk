const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");
const Message = require("./message");
const Pusher = require("pusher");

const app = express();
const port = process.env.PORT || 3000;

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

// just to test the server
app.get("/", async (req, res) => {
  res.status(200).render("index.html");
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.status(200).json(messages);
});

app.post("/post/messages", async (req, res) => {
  const response = await Message.create({ ...req.body });
  pusher.trigger("channel", "event", {
    ...response,
  });
  res.status(200).send(response);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

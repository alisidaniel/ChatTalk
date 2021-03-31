const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");
const message = require("./message");

const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// just to test the server
app.get("/", async (req, res) => {
  res.status(200).render("index.html");
});

app.get("/messages", async (req, res) => {
  const messages = await message.find();
  res.status(200).json(messages);
});

app.post("/post/messages", async (req, res) => {
  const response = await message.create({ ...req.body });
  res.status(200).send(response);
});

io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

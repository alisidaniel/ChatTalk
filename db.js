const mongoose = require("mongoose");

var dbUrl =
  "mongodb+srv://loanservice:0987654321@cluster0-n4wcr.mongodb.net/test";

mongoose.connect(dbUrl, (err) => {
  console.log("mongodb connected");
});

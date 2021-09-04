const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);

module.exports = message;

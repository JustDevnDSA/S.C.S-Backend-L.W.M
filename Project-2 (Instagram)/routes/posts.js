const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/instaclone");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  picture: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  caption: String,
});

module.exports = mongoose.model("post", postSchema);

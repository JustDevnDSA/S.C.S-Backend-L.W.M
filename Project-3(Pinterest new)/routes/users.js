const mongoose = require("mongoose");
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/pinterst");

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  contact: Number,
  boards: {
    type: Array,
    default: [],
  },
  posts:[
    {
      type:Schema.Types.ObjectId,
      ref:"post"
    }
  ]
});

userSchema.plugin(plm)

module.exports = mongoose.model("user", userSchema);

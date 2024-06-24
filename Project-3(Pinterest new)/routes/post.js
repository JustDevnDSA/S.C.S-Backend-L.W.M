const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const postSchema = Schema({
  user: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  title:String,
  description:String,
  image:String,

});


module.exports = mongoose.model("post", postSchema);

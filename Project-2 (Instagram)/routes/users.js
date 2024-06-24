const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/instaclone")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:String,
  name:String,
  email:String,
  password:String,
  profileImage:String,
  bio:String,
  posts:[{type:Schema.Types.ObjectId, ref:'post'}]
})


userSchema.plugin(plm)

module.exports = mongoose.model('user',userSchema)


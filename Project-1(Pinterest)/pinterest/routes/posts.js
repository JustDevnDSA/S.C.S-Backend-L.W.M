const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  imageText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default:Date.now
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  image:{
    type:String,
  },
  likes: {
    type:Array,
    default:[]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);


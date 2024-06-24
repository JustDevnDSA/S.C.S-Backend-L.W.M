// install mongodb
// install mongoosejs
// require and setup connection
// make schema
// create model and export

const mongoose = require('mongoose')

// CREATING THE DATABASE OR CODING DB SETUP
mongoose.connect('mongodb://127.0.0.1:27017/practicekaro')

// CREATING THE DOCUMENT OR CODING SCHEMA
const userSchema = mongoose.Schema({
  username:String,
  name:String,
  age:Number
})

// CREATING THE COLLECTION OR CODING MODEL
// mongoose.model(naam,schema)
module.exports = mongoose.model("user",userSchema)

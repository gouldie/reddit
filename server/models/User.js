var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  _id: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, { versionKey: false })
var User = mongoose.model('User', UserSchema)

module.exports = User

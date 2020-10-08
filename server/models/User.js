import { model, Schema } from 'mongoose'
import { hashSync, compareSync } from 'bcryptjs'

var UserSchema = new Schema({
  _id: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
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

UserSchema.pre('save', async function (next) {
  const emailExists = await User.exists({ email: this.email, _id: { $ne: this._id } })
  if (emailExists) return next('Email already exists')

  const usernameExists = await User.exists({ username: new RegExp(`^${this.username}$`, 'i'), _id: { $ne: this._id } })
  if (usernameExists) return next('Username already exists')

  if (this.isModified('password')) {
    this.password = User.hash(this.password)
  }
})

UserSchema.statics.hash = (password) => {
  return hashSync(password, 10)
}

UserSchema.methods.matchesPassword = function (password) {
  return compareSync(password, this.password)
}

var User = model('User', UserSchema)

export default User

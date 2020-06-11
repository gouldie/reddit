import { model, Schema } from 'mongoose'
import { hashSync, compareSync } from 'bcryptjs'

var UserSchema = new Schema({
  _id: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [
      async email =>
        !(await User.exists({ email })),
      'Email is already taken.'
    ]
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: [
      async username =>
        !(await User.exists({ username })),
      'Username is already taken.'
    ]
  }
}, { versionKey: false })

UserSchema.pre('save', function () {
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

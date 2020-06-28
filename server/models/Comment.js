import { model, Schema } from 'mongoose'

var CommentSchema = new Schema({
  _id: String,
  text: String,
  user: {
    type: String,
    ref: 'User'
  },
  postId: String,
  createdAt: Number,
  updatedAt: Number
}, { versionKey: false })

var Comment = model('Comment', CommentSchema)

export default Comment

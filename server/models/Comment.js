import { model, Schema } from 'mongoose'

const replySchema = new Schema({
  _id: String,
  user: {
    _id: String,
    username: String
  },
  upvotes: [String],
  downvotes: [String],
  createdAt: Number,
  text: String
})

replySchema.add({
  replies: [replySchema]
})

var CommentSchema = new Schema({
  _id: String,
  text: String,
  user: {
    type: String,
    ref: 'User'
  },
  upvotes: [String],
  downvotes: [String],
  postId: String,
  createdAt: Number,
  updatedAt: Number,
  replies: [replySchema]
}, { versionKey: false })

var Comment = model('Comment', CommentSchema)

export default Comment

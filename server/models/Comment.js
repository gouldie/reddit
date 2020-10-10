import { model, Schema } from 'mongoose'

const replySchema = new Schema({
  _id: false,
  user: {
    type: String,
    ref: 'User'
  }
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
  upvotes: [{
    type: String
  }],
  downvotes: [{
    type: String
  }],
  postId: String,
  createdAt: Number,
  updatedAt: Number,
  replies: [replySchema]
}, { versionKey: false })

var Comment = model('Comment', CommentSchema)

export default Comment

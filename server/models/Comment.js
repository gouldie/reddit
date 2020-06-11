import { model, Schema } from 'mongoose'

var CommentSchema = new Schema({
  _id: String,
  content: String,
  userId: String,
  postId: String
}, { versionKey: false })

var Comment = model('Comment', CommentSchema)

export default Comment

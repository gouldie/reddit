import { model, Schema } from 'mongoose'

var ReplySchema = new Schema({
  _id: String,
  content: String,
  userId: String,
  commentId: String
}, { versionKey: false })

var Reply = model('Reply', ReplySchema)

export default Reply

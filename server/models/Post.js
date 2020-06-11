import { model, Schema } from 'mongoose'

var PostSchema = new Schema({
  _id: String,
  title: String,
  content: String,
  userId: String
}, { versionKey: false })

var Post = model('Post', PostSchema)

export default Post

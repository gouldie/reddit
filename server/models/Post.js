import { model, Schema } from 'mongoose'

var PostSchema = new Schema({
  _id: String,
  title: String,
  text: String,
  communityId: String,
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
  createdAt: Number,
  updatedAt: Number
}, { versionKey: false })

var Post = model('Post', PostSchema)

export default Post

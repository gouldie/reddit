import cuid from 'cuid'
import Post from '../models/Post'
import { CreateTextPost } from '../validators/posts'

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username')

  return res.json({
    success: true,
    posts
  })
}

export const createTextPost = async (req, res) => {
  const { error } = CreateTextPost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, text, communityId } = req.body

  await Post.create({
    _id: cuid(),
    title,
    text,
    communityId,
    user: req.userId,
    createdAt: Date.now()
  })

  return res.json({
    success: true
  })
}

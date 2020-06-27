import cuid from 'cuid'
import Post from '../models/Post'
import { CreateTextPost, GetPost } from '../validators/posts'

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username')

  return res.json({
    success: true,
    posts
  })
}

export const getPost = async (req, res) => {
  const { error } = GetPost.validate(req.params, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const post = await Post.findOne({ _id: req.params.postId }).populate('user')

  if (!post) {
    return res.json({
      success: false,
      message: 'Post not found'
    })
  }

  return res.json({
    success: true,
    post
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

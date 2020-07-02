import cuid from 'cuid'
import Post from '../models/Post'
import Comment from '../models/Comment'
import { GetComments, CreateComment } from '../validators/comments'

export const getComments = async (req, res) => {
  const { error } = GetComments.validate(req.params, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const comments = await Comment.find({ postId: req.params.postId }).populate('user')

  return res.json({
    success: true,
    comments
  })
}

export const createComment = async (req, res) => {
  const { error } = CreateComment.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { postId, text } = req.body

  await Comment.create({
    _id: cuid(),
    text,
    postId,
    user: req.userId,
    createdAt: Date.now()
  })

  return res.json({
    success: true
  })
}

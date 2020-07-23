import cuid from 'cuid'
import Comment from '../models/Comment'
import { GetComments, CreateComment, Vote } from '../validators/comments'

export const getComments = async (req, res) => {
  const { error } = GetComments.validate(req.params, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  let comments = await Comment.find({ postId: req.params.postId }).populate('user', 'username').lean()

  comments = comments.map(e => {
    const upvotes = e.upvotes ? e.upvotes.length : 0
    const downvotes = e.downvotes ? e.downvotes.length : 0
    const count = upvotes - downvotes
    const userVote = e.upvotes && e.upvotes.includes(req.userId) ? 1 : e.downvotes && e.downvotes.includes(req.userId) ? -1 : 0

    delete e.upvotes
    delete e.downvotes
    e.count = count
    e.userVote = userVote

    return e
  })

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

export const upvote = async (req, res) => {
  const { error } = Vote.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  await Comment.updateOne({ _id: req.body.commentId }, { $addToSet: { upvotes: req.userId }, $pull: { downvotes: req.userId } })

  return res.json({ success: true })
}

export const downvote = async (req, res) => {
  const { error } = Vote.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  await Comment.updateOne({ _id: req.body.commentId }, { $addToSet: { downvotes: req.userId }, $pull: { upvotes: req.userId } })

  return res.json({ success: true })
}

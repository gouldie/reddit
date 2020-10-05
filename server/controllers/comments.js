import cuid from 'cuid'
import Comment from '../models/Comment'
import { GetComments, CreateComment, Vote } from '../validators/comments'

export const getComments = async (req, res) => {
  const { error } = GetComments.validate(req.params, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  let comments = await Comment.find({ postId: req.params.postId }).populate('user', 'username').lean()

  // order by points
  comments = comments.sort((a, b) => {
    const upvotesA = a.upvotes ? a.upvotes.length : 0
    const downvotesA = a.downvotes ? a.downvotes.length : 0
    const countA = upvotesA - downvotesA

    const upvotesB = b.upvotes ? b.upvotes.length : 0
    const downvotesB = b.downvotes ? b.downvotes.length : 0
    const countB = upvotesB - downvotesB

    return countA < countB ? 1 : -1
  })

  // calculate count and user vote
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

  // only show comments by the logged in user, or users 'lorem' and 'ipsum'
  comments = comments.filter(e => {
    return e.user._id === req.userId || ['lorem', 'ipsum'].includes(e.user.username)
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

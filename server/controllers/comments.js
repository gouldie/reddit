import cuid from 'cuid'
import Comment from '../models/Comment'
import { GetComments, CreateComment, EditComment, Vote, DeleteComment } from '../validators/comments'

export const getComments = async (req, res) => {
  const { error } = GetComments.validate(req.params, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  let comments = await Comment.find({ postId: req.params.postId }).populate('user', 'username').lean()

  // only show comments by the logged in user, or users 'lorem' and 'ipsum'
  comments = comments.filter(e => {
    return e.user._id === req.userId || ['lorem', 'ipsum'].includes(e.user.username)
  })

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

  // add canEdit tag
  comments = comments.map(e => {
    if (e.user._id === req.userId) {
      e.canEdit = true
    }

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

export const editComment = async (req, res) => {
  const { error } = EditComment.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { commentId, text } = req.body

  // validate the userId with the commentId
  const comment = await Comment.findOne({ _id: commentId })

  if (req.userId !== comment.user) {
    return res.json({
      success: false,
      message: 'Unauthorized'
    })
  }

  const newComment = await Comment.findByIdAndUpdate({ _id: commentId }, { $set: { text } }, { new: true }).populate('user')

  return res.json({ success: true, comment: newComment })
}

export const deleteComment = async (req, res) => {
  const { error } = DeleteComment.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { commentId } = req.body

  // validate the userId with the commentId
  const comment = await Comment.findOne({ _id: commentId })

  if (req.userId !== comment.user) {
    return res.json({
      success: false,
      message: 'Unauthorized'
    })
  }

  await Comment.deleteOne({ _id: commentId })

  return res.json({ success: true })
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

import cuid from 'cuid'
import Comment from '../models/Comment'
import User from '../models/User'
import {
  GetComments, CreateComment, EditComment, Vote, DeleteComment,
  Reply, ReplyVote, ReplyEdit, ReplyDelete
} from '../validators/comments'
import { addFields, onlyDemo, findReply, deleteReplyArr, updateReplies, sortReplies, sortBy } from '../utils'

export const getComments = async (req, res) => {
  const { error } = GetComments.validate({ ...req.params, ...req.query }, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { sort } = req.query

  let comments = await Comment.find({ postId: req.params.postId }).populate('user', 'username').lean()

  // only show comments by the logged in user, or users 'lorem' and 'ipsum'
  comments = onlyDemo.multiple(req.userId, comments)

  // order comments by req.query.sort
  comments = comments.sort(sortBy[sort])

  // order replies by points
  comments.replies = sortReplies(comments.replies, sortBy.Best)

  // calculate count and user vote
  comments = comments.map(e => addFields(req.userId, e))

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

  let comment = await Comment.create({
    _id: cuid(),
    text,
    postId,
    user: req.userId,
    createdAt: Date.now()
  })

  comment = await comment.populate('user', 'username').execPopulate()

  return res.json({
    success: true,
    comment: {
      ...comment._doc,
      canEdit: true,
      count: 0,
      userVote: 0
    }
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

  let newComment = await Comment.findByIdAndUpdate({ _id: commentId }, { $set: { text } }, { new: true }).populate('user').lean()

  // filter out non-demo users in the replies
  newComment = onlyDemo.single(req.userId, newComment)

  // add userVote, count and canEdit
  newComment = addFields(req.userId, newComment)

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

export const reply = async (req, res) => {
  const { error } = Reply.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const user = await User.findOne({ _id: req.userId })

  if (!user) {
    return res.json({
      success: false,
      message: 'Invalid token. Please re-login'
    })
  }

  const { rootId, commentId, text } = req.body

  const rootComment = await Comment.findOne({ _id: rootId }).lean()

  const reply = {
    _id: cuid(),
    user: {
      _id: req.userId,
      username: user.username
    },
    text,
    createdAt: Date.now(),
    upvotes: [],
    downvotes: [],
    replies: []
  }

  let comment

  // if root comment is the comment we are replying to
  if (rootComment._id === commentId) {
    comment = await Comment.findOneAndUpdate({ _id: rootId }, { $push: { replies: reply } }, { new: true }).populate('user', 'username').lean()
  } else {
    const newReplies = updateReplies(rootComment.replies, commentId, reply)

    comment = await Comment.findOneAndUpdate({ _id: rootId }, { $set: { replies: newReplies } }, { new: true }).populate('user', 'username').lean()
  }

  // filter out non-demo users in the replies
  comment = onlyDemo.single(req.userId, comment)

  // add userVote, count and canEdit
  comment = addFields(req.userId, comment)

  return res.json({
    success: true,
    comment
  })
}

export const upvoteReply = async (req, res) => {
  const { error } = ReplyVote.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { commentId, rootId } = req.body

  const rootComment = await Comment.findOne({ _id: rootId }).lean()

  if (!rootComment) {
    return res.json({
      success: false,
      message: 'Comment not found'
    })
  }

  const replies = rootComment.replies
  const reply = findReply(replies, commentId)

  if (reply.upvotes.indexOf(req.userId) === -1) {
    reply.upvotes.push(req.userId)
  }

  const downvoteIndex = reply.downvotes.indexOf(req.userId)
  if (downvoteIndex !== -1) {
    reply.downvotes.splice(downvoteIndex, 1)
  }

  await Comment.updateOne({ _id: rootId }, { $set: { replies } })

  return res.json({
    success: true
  })
}

export const downvoteReply = async (req, res) => {
  const { error } = ReplyVote.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { commentId, rootId } = req.body

  const rootComment = await Comment.findOne({ _id: rootId }).lean()

  if (!rootComment) {
    return res.json({
      success: false,
      message: 'Comment not found'
    })
  }

  const replies = rootComment.replies
  const reply = findReply(replies, commentId)

  if (reply.downvotes.indexOf(req.userId) === -1) {
    reply.downvotes.push(req.userId)
  }

  const upvoteIndex = reply.upvotes.indexOf(req.userId)
  if (upvoteIndex !== -1) {
    reply.upvotes.splice(upvoteIndex, 1)
  }

  await Comment.updateOne({ _id: rootId }, { $set: { replies } })

  return res.json({
    success: true
  })
}

export const editReply = async (req, res) => {
  const { error } = ReplyEdit.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { commentId, rootId, text } = req.body

  let comment = await Comment.findOne({ _id: rootId }).populate('user', 'username').lean()

  const reply = findReply(comment.replies, commentId)

  if (req.userId !== reply.user._id) {
    return res.json({
      success: false,
      message: 'Unauthorized'
    })
  }

  reply.text = text

  await Comment.updateOne({ _id: rootId }, { $set: { replies: comment.replies } })

  // filter out non-demo users in the replies
  comment = onlyDemo.single(req.userId, comment)

  // add userVote, count and canEdit
  comment = addFields(req.userId, comment)

  return res.json({
    success: true,
    comment
  })
}

export const deleteReply = async (req, res) => {
  const { error } = ReplyDelete.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { commentId, rootId } = req.body

  let comment = await Comment.findOne({ _id: rootId }).populate('user', 'username').lean()

  if (!comment) {
    return res.json({
      success: false,
      message: 'Comment not found'
    })
  }

  const isUnauthorized = deleteReplyArr(comment.replies, commentId, req.userId)

  if (isUnauthorized) {
    return res.json({
      success: false,
      message: 'Unauthorized'
    })
  }

  await Comment.updateOne({ _id: rootId }, { $set: { replies: comment.replies } })

  // filter out non-demo users in the replies
  comment = onlyDemo.single(req.userId, comment)

  // add userVote, count and canEdit
  comment = addFields(req.userId, comment)

  return res.json({
    success: true,
    comment
  })
}

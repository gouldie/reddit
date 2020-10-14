import cuid from 'cuid'
import Comment from '../models/Comment'
import User from '../models/User'
import { GetComments, CreateComment, EditComment, Vote, DeleteComment, Reply, ReplyVote } from '../validators/comments'
import calculateVotes from '../utils/calculateVotes'

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
  comments = comments.map(e => calculateVotes(req.userId, e))

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

  // if root comment is the comment we are replying to
  if (rootComment._id === commentId) {
    const comment = await Comment.findOneAndUpdate({ _id: rootId }, { $push: { replies: reply } }, { new: true })

    return res.json({
      success: true,
      comment
    })
  } else {
    const updateReplies = (replies) => {
      return replies.map(r => {
        if (r._id === commentId) {
          r.replies.push(reply)
        }

        return {
          ...r,
          replies: updateReplies(r.replies)
        }
      })
    }

    const newReplies = updateReplies(rootComment.replies)

    const comment = await Comment.findOneAndUpdate({ _id: rootId }, { $set: { replies: newReplies } }, { new: true })

    return res.json({
      success: true,
      comment
    })
  }
}

const findReply = (arr, id) => {
  return arr.reduce((acc, e) => {
    if (e._id === id) return e
    const result = findReply(e.replies, id)
    if (result) return result
    return acc
  }, 0)
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

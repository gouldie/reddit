import cuid from 'cuid'
import Post from '../models/Post'
import { CreateTextPost, GetPost, GetPosts, Vote } from '../validators/posts'

export const getPosts = async (req, res) => {
  const { error } = GetPosts.validate(req.query, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const query = {}
  if (req.query.communityId) {
    query.communityId = req.query.communityId
  }

  let posts = await Post.find(query).populate('user', 'username').lean()

  posts = posts.map(e => {
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
    posts
  })
}

export const getPost = async (req, res) => {
  const { error } = GetPost.validate(req.params, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const post = await Post.findOne({ _id: req.params.postId }).populate('user').lean()

  if (!post) {
    return res.json({
      success: false,
      message: 'Post not found'
    })
  }

  const upvotes = post.upvotes ? post.upvotes.length : 0
  const downvotes = post.downvotes ? post.downvotes.length : 0
  const count = upvotes - downvotes
  const userVote = post.upvotes && post.upvotes.includes(req.userId) ? 1 : post.downvotes && post.downvotes.includes(req.userId) ? -1 : 0

  delete post.upvotes
  delete post.downvotes
  post.count = count
  post.userVote = userVote

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

export const upvote = async (req, res) => {
  const { error } = Vote.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  await Post.updateOne({ _id: req.body.postId }, { $addToSet: { upvotes: req.userId }, $pull: { downvotes: req.userId } })

  return res.json({ success: true })
}

export const downvote = async (req, res) => {
  const { error } = Vote.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  await Post.updateOne({ _id: req.body.postId }, { $addToSet: { downvotes: req.userId }, $pull: { upvotes: req.userId } })

  return res.json({ success: true })
}

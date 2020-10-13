import cuid from 'cuid'
import Post from '../models/Post'
import Comment from '../models/Comment'
import { CreateTextPost, CreateImagePost, CreateLinkPost, GetPost, GetPosts, Vote, EditPost, DeletePost } from '../validators/posts'
import sortBy from '../utils/sort'
import calculateVotes from '../utils/calculateVotes'
import commentCount from '../utils/commentCount'
import got from 'got'

const metascraper = require('metascraper')([
  require('metascraper-image')()
])

export const getPosts = async (req, res) => {
  const { error } = GetPosts.validate(req.query, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { sort, communityId } = req.query

  const query = {}
  if (communityId) {
    query.communityId = communityId
  }

  let posts = await Post.find(query).populate('user', 'username').lean()

  // get number of comments
  let comments = await Comment.find({ postId: { $in: posts.map(e => e._id) } }).populate('user', 'username').lean()
  comments = comments.filter(e => e.user._id === req.userId || ['lorem', 'ipsum'].includes(e.user.username))

  // sort
  posts = posts.sort(sortBy[sort])

  // votes
  posts = posts.map(e => {
    return {
      ...calculateVotes(req.userId, e),
      commentCount: commentCount(comments.filter(c => c.postId === e._id))
    }
  })

  // only show posts by the logged in user, or users 'lorem' and 'ipsum'
  posts = posts.filter(e => {
    return e.user._id === req.userId || ['lorem', 'ipsum'].includes(e.user.username)
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

  let post = await Post.findOne({ _id: req.params.postId }).populate('user', 'username').lean()

  if (!post) {
    return res.json({
      success: false,
      message: 'Post not found'
    })
  }

  // only show posts by the logged in user, or users 'lorem' and 'ipsum'
  if (post.user._id !== req.userId && !['lorem', 'ipsum'].includes(post.user.username)) {
    return res.json({
      success: false,
      message: 'Post not found'
    })
  }

  if (req.userId === post.user._id) {
    post.canEdit = true
  }

  post = calculateVotes(req.userId, post)

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

  const post = await Post.create({
    _id: cuid(),
    title,
    text,
    communityId,
    user: req.userId,
    createdAt: Date.now()
  })

  return res.json({
    success: true,
    id: post._id
  })
}

export const createImagePost = async (req, res) => {
  const { error } = CreateImagePost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, image, communityId } = req.body

  const post = await Post.create({
    _id: cuid(),
    title,
    image,
    communityId,
    user: req.userId,
    createdAt: Date.now()
  })

  return res.json({
    success: true,
    id: post._id
  })
}

export const createLinkPost = async (req, res) => {
  const { error } = CreateLinkPost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, link, communityId } = req.body

  // link post image previews
  const { body: html, url } = await got(link, {
    timeout: 3000
  })
  const metadata = await metascraper({ html, url })

  const post = await Post.create({
    _id: cuid(),
    title,
    link,
    linkPreview: metadata.image,
    communityId,
    user: req.userId,
    createdAt: Date.now()
  })

  return res.json({
    success: true,
    id: post._id
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

export const editPost = async (req, res) => {
  const { error } = EditPost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { postId, text, image, link } = req.body

  // validate the userId with the postId
  const post = await Post.findOne({ _id: postId })

  if (req.userId !== post.user) {
    return res.json({
      success: false,
      message: 'Unauthorized'
    })
  }

  const $set = {}
  const $unset = {}
  if (text) {
    $set.text = text
    $unset.image = ''
    $unset.link = ''
  }
  if (image) {
    $set.image = image
    $unset.text = ''
    $unset.link = ''
  }
  if (link) {
    $set.link = link
    $unset.image = ''
    $unset.text = ''
  }

  if (link) {
    // link post image previews
    // using try/catch here as if an error occurs we can continue without creating a link preview image
    try {
      const { body: html, url } = await got(link, {
        timeout: 3000,
        retry: 0
      })
      const metadata = await metascraper({ html, url })
      $set.linkPreview = metadata.image
    } catch (e) {

    }
  }

  const newPost = await Post.findByIdAndUpdate({ _id: postId }, { $set, $unset }, { new: true }).populate('user')

  return res.json({ success: true, post: newPost })
}

export const deletePost = async (req, res) => {
  const { error } = DeletePost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { postId } = req.body

  // validate the userId with the postId
  const post = await Post.findOne({ _id: postId })

  if (req.userId !== post.user) {
    return res.json({
      success: false,
      message: 'Unauthorized'
    })
  }

  await Post.deleteOne({ _id: postId })

  return res.json({ success: true })
}

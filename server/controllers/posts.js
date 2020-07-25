import cuid from 'cuid'
import Post from '../models/Post'
import { CreateTextPost, CreateImagePost, CreateLinkPost, GetPost, GetPosts, Vote, EditPost, DeletePost } from '../validators/posts'
import sortBy from '../utils/sort'
const metascraper = require('metascraper')([
  require('metascraper-image')()
])
const got = require('got')

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

  // sort
  posts = posts.sort(sortBy[sort])

  // votes
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

  if (req.userId === post.user._id) {
    post.canEdit = true
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

export const createImagePost = async (req, res) => {
  const { error } = CreateImagePost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, image, communityId } = req.body

  await Post.create({
    _id: cuid(),
    title,
    image,
    communityId,
    user: req.userId,
    createdAt: Date.now()
  })

  return res.json({
    success: true
  })
}

export const createLinkPost = async (req, res) => {
  const { error } = CreateLinkPost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, link, communityId } = req.body

  // link post image previews
  const { body: html, url } = await got(link)
  const metadata = await metascraper({ html, url })

  await Post.create({
    _id: cuid(),
    title,
    link,
    linkPreview: metadata.image,
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

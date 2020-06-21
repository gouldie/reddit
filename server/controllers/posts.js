import cuid from 'cuid'
import Post from '../models/Post'
import { CreateTextPost } from '../validators/posts'

export const getPosts = async (req, res) => {
  const posts = await Post.find()

  return res.json({
    success: true,
    posts
  })
}

export const createTextPost = async (req, res) => {
  const { error } = CreateTextPost.validate(req.body, { abortEarly: true })

  if (error) {
    console.log('e', error)
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, text, communityId } = req.body

  // todo: ensure text is proper html (if html)

  console.log(title, text, communityId)

  await Post.create({
    _id: cuid(),
    title,
    text,
    communityId
  })

  return res.json({
    success: true
  })
}

import cuid from 'cuid'
import Post from '../models/Post'
import { CreateTextPost } from '../validators/posts'

export const createTextPost = async (req, res) => {
  const { error } = CreateTextPost.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const { title, text, communityId } = req.body

  // todo: ensure text is proper html (if html)

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

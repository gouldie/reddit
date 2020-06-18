import cuid from 'cuid'
import Post from '../models/Post'
// todo: validators

export const createTextPost = async (req, res) => {
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

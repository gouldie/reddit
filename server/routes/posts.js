import { createTextPost, getPosts, getPost } from '../controllers/posts'
import { verifyToken } from '../middleware/auth'

const root = '/api/posts'

export default (app) => {
  app.get(`${root}`, getPosts)
  app.get(`${root}/:postId`, getPost)
  app.post(`${root}/text`, verifyToken, createTextPost)
}

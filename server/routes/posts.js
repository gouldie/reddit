import { createTextPost, getPosts } from '../controllers/posts'
import { verifyToken } from '../middleware/auth'

const root = '/api/posts'

export default (app) => {
  app.get(`${root}`, getPosts)
  app.post(`${root}/text`, verifyToken, createTextPost)
}

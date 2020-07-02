import { createComment, getComments } from '../controllers/comments'
import { verifyToken } from '../middleware/auth'

const root = '/api/comments'

export default (app) => {
  app.get(`${root}/:postId`, getComments)
  app.post(`${root}`, verifyToken, createComment)
}

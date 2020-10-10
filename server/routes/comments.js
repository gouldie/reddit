import { createComment, getComments, upvote, downvote, editComment, deleteComment } from '../controllers/comments'
import { verifyToken, optionalToken } from '../middleware/auth'

const root = '/api/comments'

export default (app) => {
  app.get(`${root}/:postId`, optionalToken, getComments)
  app.post(`${root}`, verifyToken, createComment)
  app.post(`${root}/upvote`, verifyToken, upvote)
  app.post(`${root}/downvote`, verifyToken, downvote)
  app.post(`${root}/edit`, verifyToken, editComment)
  app.post(`${root}/delete`, verifyToken, deleteComment)
}

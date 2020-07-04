import { createTextPost, getPosts, getPost, upvote, downvote } from '../controllers/posts'
import { verifyToken, optionalToken } from '../middleware/auth'

const root = '/api/posts'

export default (app) => {
  app.get(`${root}`, optionalToken, getPosts)
  app.get(`${root}/:postId`, optionalToken, getPost)
  app.post(`${root}/text`, verifyToken, createTextPost)
  app.post(`${root}/upvote`, verifyToken, upvote)
  app.post(`${root}/downvote`, verifyToken, downvote)
}

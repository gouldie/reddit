import { createTextPost, createImagePost, createLinkPost, getPosts, getPost, upvote, downvote, editPost, deletePost } from '../controllers/posts'
import { verifyToken, optionalToken } from '../middleware/auth'

const root = '/api/posts'

export default (app) => {
  app.get(`${root}`, optionalToken, getPosts)
  app.get(`${root}/:postId`, optionalToken, getPost)
  app.post(`${root}/text`, verifyToken, createTextPost)
  app.post(`${root}/image`, verifyToken, createImagePost)
  app.post(`${root}/link`, verifyToken, createLinkPost)
  app.post(`${root}/upvote`, verifyToken, upvote)
  app.post(`${root}/downvote`, verifyToken, downvote)
  app.post(`${root}/edit`, verifyToken, editPost)
  app.post(`${root}/delete`, verifyToken, deletePost)
}

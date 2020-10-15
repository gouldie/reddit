import {
  createComment, getComments, upvote, downvote, editComment, deleteComment,
  reply, upvoteReply, downvoteReply, editReply, deleteReply
} from '../controllers/comments'
import { verifyToken, optionalToken } from '../middleware/auth'

const root = '/api/comments'

export default (app) => {
  app.get(`${root}/:postId`, optionalToken, getComments)
  app.post(`${root}`, verifyToken, createComment)
  app.post(`${root}/upvote`, verifyToken, upvote)
  app.post(`${root}/downvote`, verifyToken, downvote)
  app.post(`${root}/edit`, verifyToken, editComment)
  app.post(`${root}/delete`, verifyToken, deleteComment)
  app.post(`${root}/reply`, verifyToken, reply)
  app.post(`${root}/reply/upvote`, verifyToken, upvoteReply)
  app.post(`${root}/reply/downvote`, verifyToken, downvoteReply)
  app.post(`${root}/reply/edit`, verifyToken, editReply)
  app.post(`${root}/reply/delete`, verifyToken, deleteReply)
}

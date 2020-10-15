import users from '../routes/users'
import posts from '../routes/posts'
import comments from '../routes/comments'

require('express-async-errors') // handles errors within async functions without the need for try/catch

// Note: tried using express.Router for routes but wasn't catching async errors

export default (app) => {
  app.get('/api', (req, res) => res.json({ status: 'up' })) // sanity check

  users(app)
  posts(app)
  comments(app)
}

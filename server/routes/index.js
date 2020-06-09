import users from '../routes/users'

require('express-async-errors') // handles errors within async functions without the need for try/catch

export default (app) => {
  // API routes
  app.get('/api', (req, res) => res.json({ status: 'up' })) // sanity check

  users(app)
}

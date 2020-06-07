import users from '../routes/users'

export default (app) => {
  // API routes
  app.get('/api', (req, res) => res.json({ status: 'up' })) // sanity check

  users(app)
}

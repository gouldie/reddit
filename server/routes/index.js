import users from '../controllers/users'

export default (app, passport) => {
  // API routes
  app.get('/api', (req, res) => res.json({ status: 'up' })) // sanity check

  users()
}

import UserController from '../controllers/users'

export default (app) => {
  app.get('/user', UserController.user)
  app.post('/register', UserController.register)
  app.post('/login', UserController.login)
  app.get('/logout', UserController.logout)
}

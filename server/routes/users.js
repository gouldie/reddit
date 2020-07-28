import { user, register, login, logout, changePassword } from '../controllers/users'
import { verifyToken } from '../middleware/auth'

const root = '/api/users'

export default (app) => {
  app.get(`${root}/me`, user)
  app.post(`${root}/register`, register)
  app.post(`${root}/login`, login)
  app.get(`${root}/logout`, verifyToken, logout)
  app.post(`${root}/password`, verifyToken, changePassword)
}

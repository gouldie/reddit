import { user, register, login, logout } from '../controllers/users'

const root = '/api/users'

export default (app) => {
  app.get(`${root}/me`, user)
  app.post(`${root}/register`, register)
  app.post(`${root}/login`, login)
  app.get(`${root}/logout`, logout)
}

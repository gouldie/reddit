import { create } from '../controllers/posts'

export default (app) => {
  app.get('/posts', create)
}

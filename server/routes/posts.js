import { createTextPost } from '../controllers/posts'

const root = '/api/posts'

export default (app) => {
  app.post(`${root}/text`, createTextPost)
}

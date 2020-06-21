import { createTextPost, getPosts } from '../controllers/posts'

const root = '/api/posts'

export default (app) => {
  app.get(`${root}`, getPosts)
  app.post(`${root}/text`, createTextPost)
}

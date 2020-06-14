import store from '../store'

export const requireAuth = (to, from, next) => {
  if (!store.state.isAuthenticated) {
    window.location.href = '/'
    return
  }

  next()
}

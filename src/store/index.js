import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default (isAuthenticated) => {
  return new Vuex.Store({
    state: {
      isAuthenticated
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
  })
}

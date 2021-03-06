import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    username: null,
    modal: null
  },
  mutations: {
    setModal (state, modal) {
      state.modal = modal
    }
  },
  actions: {
  },
  modules: {
  }
})

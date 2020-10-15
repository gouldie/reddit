import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import TimeAgo from 'vue-timeago'

// Importing the global css file
import '@/assets/global.css'

Vue.use(TimeAgo, {
  name: 'TimeAgo'
})

Vue.config.productionTip = false

axios.get('/api/users/me')
  .then(res => {
    store.state.isAuthenticated = !!res.data.user
    store.state.username = res.data.user && res.data.user.username

    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })

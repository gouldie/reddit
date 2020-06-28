import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import wysiwyg from 'vue-wysiwyg'

import 'vue-wysiwyg/dist/vueWysiwyg.css'

// Importing the global css file
import '@/assets/global.css'

Vue.use(wysiwyg, {})
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

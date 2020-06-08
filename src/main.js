import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.get('/user')
  .then(res => {
    new Vue({
      router,
      store: store(!!res.data.user),
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })

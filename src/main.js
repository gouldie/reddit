import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.$cookies.config('7d')

axios.get('/user')
  .then(res => {
    console.log('res', res)

    new Vue({
      router,
      store: store(!!res.data.user),
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        // primary: '#fff',
        secondary: '#dae0e7',
        blue: '#0578d2',
        grey: '#9e9e9e',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    }
  }
})

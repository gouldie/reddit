import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import { mount, createLocalVue } from '@vue/test-utils'

// import routes from '@/router/routes'
import LogIn from '@/components/Modals/LogIn.vue'
// import posts from './fixtures/posts.json'

// const router = new VueRouter({ routes })

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(VueRouter)

// Adds a data-app attribute to the body so that we don't get Vuetify complaining about missing data-app attribute
document.body.setAttribute('data-app', true)

const factory = (values = {}) => {
  return mount(LogIn, {
    localVue,
    vuetify: new Vuetify(),
    mocks: {
      $store: {
        state: {
          modal: 'log-in'
        }
      }
    }
  })
}

describe('LogIn.vue', () => {
  it('displays username errors correctly', async () => {
    const wrapper = factory()

    // should not allow for 'username' less than 3 characters
    wrapper.setData({ username: 'a' })
    await Vue.nextTick()
    expect(wrapper.find('.input-username .v-messages.error--text').exists()).toBe(true)

    // assert the error has gone away
    wrapper.setData({ username: 'aaa' })
    await Vue.nextTick()
    expect(wrapper.find('.input-username .v-messages.error--text').exists()).toBe(false)
  })

  it('displays password errors correctly', async () => {
    const wrapper = factory()

    // should not allow for 'password' less than 6 characters
    wrapper.setData({ password: 'a' })
    await Vue.nextTick()
    expect(wrapper.find('.input-password .v-messages.error--text').exists()).toBe(true)

    // assert the error has gone away
    wrapper.setData({ password: 'aaaaaa' })
    await Vue.nextTick()
    expect(wrapper.find('.input-password .v-messages.error--text').exists()).toBe(false)
  })
})

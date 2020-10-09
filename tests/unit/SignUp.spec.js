import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import { mount, createLocalVue } from '@vue/test-utils'

import SignUp from '@/components/Modals/SignUp.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(VueRouter)

// Adds a data-app attribute to the body so that we don't get Vuetify complaining about missing data-app attribute
document.body.setAttribute('data-app', true)

const factory = (values = {}) => {
  return mount(SignUp, {
    localVue,
    vuetify: new Vuetify(),
    mocks: {
      $store: {
        state: {
          modal: 'sign-up'
        }
      }
    }
  })
}

describe('SignUp.vue', () => {
  it('displays email errors correctly', async () => {
    const wrapper = factory()

    // should not allow greater than 254 characters
    await wrapper.setData({ email: `${'a'.repeat(255)}` })
    await Vue.nextTick()
    expect(wrapper.find('.signup-email .v-messages.error--text').exists()).toBe(true)

    // should not allow invalid emails
    await wrapper.setData({ email: 'a@gmailcom' })
    await Vue.nextTick()
    expect(wrapper.find('.signup-email .v-messages.error--text').exists()).toBe(true)

    // assert the error has gone away
    await wrapper.setData({ email: 'a@gmail.com' })
    await Vue.nextTick()
    expect(wrapper.find('.signup-email .v-messages.error--text').exists()).toBe(false)
  })

  it('displays username errors correctly', async () => {
    const wrapper = factory()

    // should not allow less than 3 characters
    await wrapper.setData({ username: 'a' })
    await Vue.nextTick()
    expect(wrapper.find('.signup-username .v-messages.error--text').exists()).toBe(true)

    // assert the error has gone away
    await wrapper.setData({ username: 'aaa' })
    await Vue.nextTick()
    expect(wrapper.find('.signup-username .v-messages.error--text').exists()).toBe(false)
  })

  it('displays password errors correctly', async () => {
    const wrapper = factory()

    // should not allow less than 6 characters
    await wrapper.setData({ password: 'a' })
    await Vue.nextTick()
    expect(wrapper.find('.signup-password .v-messages.error--text').exists()).toBe(true)

    // assert the error has gone away
    await wrapper.setData({ password: 'aaaaaa' })
    await Vue.nextTick()
    expect(wrapper.find('.signup-password .v-messages.error--text').exists()).toBe(false)
  })
})

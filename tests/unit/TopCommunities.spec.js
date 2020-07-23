import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import { mount, createLocalVue } from '@vue/test-utils'

import communities from '@/assets/json/communities.json'
import Top from '@/components/Communities/Top.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)

const router = new VueRouter()

describe('Top.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders correct communities', async () => {
    const wrapper = mount(Top, {
      localVue,
      vuetify,
      router,
      propsData: {
        communities,
        category: 'Science'
      }
    })

    const list = wrapper.findAll('.v-list>a')

    expect(list.length).toEqual(communities.filter(e => e.category === 'Science').length)
  })
})

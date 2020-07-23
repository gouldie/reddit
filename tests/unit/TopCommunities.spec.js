import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

import { mount, createLocalVue } from '@vue/test-utils'

import communities from '@/assets/json/communities.json'
import Top from '@/components/Communities/Top.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)

const router = new VueRouter({ routes })

describe('Top.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders all communities given a category', async () => {
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

  it('renders all communities in alt view', async () => {
    const wrapper = mount(Top, {
      localVue,
      vuetify,
      router,
      propsData: {
        alt: true,
        communities
      }
    })

    const list = wrapper.findAll('.v-list>a')

    expect(list.length).toEqual(communities.length)
  })

  it('navigates to communities route when view all is clicked', async () => {
    const wrapper = mount(Top, {
      localVue,
      vuetify,
      router,
      propsData: {
        communities
      }
    })

    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(router.history.current.path).toEqual('/communities')
  })

  it('navigates to community route when a community is clicked', async () => {
    const wrapper = mount(Top, {
      localVue,
      vuetify,
      router,
      propsData: {
        category: 'Science',
        communities
      }
    })

    const button = wrapper.find('a')
    button.trigger('click')

    await wrapper.vm.$nextTick()

    expect(router.history.current.path).toEqual('/' + button.text().split(' ')[2])
  })
})

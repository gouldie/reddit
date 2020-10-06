import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import { mount, createLocalVue } from '@vue/test-utils'

import routes from '@/router/routes'
import communities from '@/assets/json/communities.json'
import Top from '@/components/Communities/Top.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(VueRouter)

const router = new VueRouter({ routes })

const factory = (values = {}) => {
  return mount(Top, {
    localVue,
    vuetify: new Vuetify(),
    router,
    propsData: {
      communities
    },
    ...values
  })
}

describe('Top.vue', () => {
  it('renders all communities given a category', async () => {
    const wrapper = factory({
      propsData: {
        communities,
        category: 'Science'
      }
    })

    const list = wrapper.findAll('.v-list>a')

    expect(list.length).toEqual(communities.filter(e => e.category === 'Science').length)
  })

  it('renders all communities in alt view', async () => {
    const wrapper = factory({
      propsData: {
        alt: true,
        communities
      }
    })

    const list = wrapper.findAll('.v-list>a')

    expect(list.length).toEqual(communities.length)
  })

  it('navigates to communities route when view all is clicked', async () => {
    const wrapper = factory()

    wrapper.find('button').trigger('click')

    expect(router.history.pending.name).toEqual('Communities')
  })

  it('navigates to community route when a community is clicked', async () => {
    const wrapper = factory({
      propsData: {
        category: 'Science',
        communities
      }
    })

    const button = wrapper.find('a')
    button.trigger('click')

    expect(router.history.pending.path).toEqual('/' + button.text().split(' ')[2])
  })
})

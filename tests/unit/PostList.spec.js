import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import { mount, createLocalVue } from '@vue/test-utils'

import routes from '@/router/routes'
import PostList from '@/components/Posts/PostList.vue'
import PostPreview from '@/components/Posts/PostPreview.vue'
import posts from './fixtures/posts.json'

const router = new VueRouter({ routes })

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(VueRouter)

const factory = (values = {}) => {
  return mount(PostList, {
    localVue,
    router,
    propsData: {
      posts
    },
    mocks: {
      $vuetify: {
        breakpoint: {}
      }
    },
    stubs: [
      'router-view'
    ]
  })
}

describe('PostList.vue', () => {
  it('renders all posts', () => {
    const wrapper = factory()

    expect(wrapper.findAllComponents(PostPreview).length).toEqual(3)
  })

  it('navigates to post', () => {
    const wrapper = factory()

    wrapper.find('a').trigger('click')

    expect(router.history.pending.path).toEqual(`/r/space/${posts[0]._id}`)
  })
})

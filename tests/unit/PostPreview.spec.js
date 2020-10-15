import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import { mount, createLocalVue } from '@vue/test-utils'

import routes from '@/router/routes'
import PostPreview from '@/components/Posts/PostPreview.vue'
import posts from './fixtures/posts.json'

const router = new VueRouter({ routes })

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(VueRouter)

const factory = (values = {}) => {
  return mount(PostPreview, {
    localVue,
    vuetify: new Vuetify(),
    router,
    propsData: {
      showCommunity: true,
      post
    },
    ...values
  })
}

const post = posts[0]

describe('PostPreview.vue', () => {
  it('renders community name', () => {
    const wrapper = factory({
      stubs: [
        'router-link',
        'TimeAgo'
      ]
    })

    const community = wrapper.find('.post-community')

    expect(community.text()).toBe(`r/${post.communityName}`)
  })

  it('navigates to community page on click of community name', () => {
    const wrapper = factory({
      stubs: [
        'TimeAgo'
      ]
    })

    wrapper.find('.post-community').trigger('click')

    expect(router.history.pending.path).toEqual('/r/cats')
  })
})

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'

import PostPreview from '@/components/Posts/PostPreview.vue'

const router = new VueRouter({ routes })

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)

describe('PostPreview.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const post = {
    communityName: 'cats',
    user: {
      username: 'matt'
    },
    createdAt: Date.now(),
    title: 'test title',
    text: 'test text'
  }

  it('renders community name', () => {
    const wrapper = shallowMount(PostPreview, {
      localVue,
      vuetify,
      propsData: {
        post,
        showCommunity: true
      },
      mocks: {
        $vuetify: {
          breakpoint: {}
        }
      },
      stubs: [
        'router-link'
      ]
    })

    const community = wrapper.find('.post-community')

    expect(community.text()).toBe(`r/${post.communityName}`)
  })

  it('navigates to community page on click of community name', () => {
    const post = {
      communityName: 'cats',
      communityId: '1',
      user: {
        username: 'matt'
      },
      createdAt: Date.now(),
      title: 'test title',
      text: 'test text'
    }

    const wrapper = mount(PostPreview, {
      localVue,
      vuetify,
      router,
      propsData: {
        showCommunity: true,
        post
      }
    })

    wrapper.find('.post-community').trigger('click')

    expect(router.history.pending.path).toEqual('/r/cats')
  })
})

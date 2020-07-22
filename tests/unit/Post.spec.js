import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'

import Post from '@/components/Posts/Post.vue'
import PostView from '@/views/Post.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('Post.vue', () => {
  let vuetify
  let mutations
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    mutations = {
      setModal: jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
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

  it('renders all post props when passed', () => {
    const wrapper = shallowMount(Post, {
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
      }
    })

    const community = wrapper.find('.post-community')

    expect(community.text()).toBe(`r/${post.communityName}`)
  })

  it('opens log in modal when unauthenticated user attempts to upvote or downvote', async () => {
    const wrapper = mount(PostView, {
      localVue,
      vuetify,
      store,
      propsData: {
        post: {
          user: {}
        }
      },
      mocks: {
        $vuetify: {
          breakpoint: {}
        }
      }
    })
    const icon = wrapper.find('.vote-panel button:nth-of-type(1)')
    console.log('ico', icon)
    await wrapper.vm.$nextTick()

    expect(mutations.setModal).toHaveBeenCalled()
  })
})

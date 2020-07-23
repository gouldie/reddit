import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import flushPromises from 'flush-promises'

import { createLocalVue, mount } from '@vue/test-utils'

import Post from '@/views/Post.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const mock = new MockAdapter(axios)

mock.onGet('/api/posts/1').reply(200, {
  success: true,
  post: {
    communityId: '1',
    user: {
      username: 'matt'
    },
    createdAt: Date.now(),
    title: 'test title',
    text: 'test text'
  }
})

mock.onGet('/api/comments/1').reply(200, {
  success: true,
  comments: [{
    text: 'text',
    postId: '1',
    user: {
      username: 'username'
    },
    createdAt: Date.now(),
    count: 1,
    userVote: 0
  }]
})

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

  it('opens log in modal when unauthenticated user attempts to upvote or downvote', async () => {
    const wrapper = mount(Post, {
      localVue,
      vuetify,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {}
        },
        $route: {
          params: {
            id: 1
          }
        }
      }
    })

    await flushPromises()

    wrapper.find('.vote-panel button:nth-of-type(1)').trigger('click')

    expect(mutations.setModal).toBeCalled()
  })
})

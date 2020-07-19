import Vue from 'vue'
import Vuetify from 'vuetify'

import { shallowMount, createLocalVue } from '@vue/test-utils'

import Post from '@/components/Posts/Post.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Post.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders all post props when passed', () => {
    const post = {
      communityName: 'cats',
      user: {
        username: 'matt'
      },
      createdAt: Date.now(),
      title: 'test title',
      text: 'test text'
    }

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
})

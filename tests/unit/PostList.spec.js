import Vue from 'vue'
import Vuetify from 'vuetify'

import { mount, createLocalVue } from '@vue/test-utils'

import PostList from '@/components/Posts/PostList.vue'
import Post from '@/components/Posts/Post.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('PostList.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders all posts', () => {
    const post = {
      communityName: 'cats',
      user: {
        username: 'matt'
      },
      createdAt: Date.now(),
      title: 'test title',
      text: 'test text'
    }
    const posts = [
      post, post, post
    ]

    const wrapper = mount(PostList, {
      localVue,
      vuetify,
      propsData: {
        posts
      },
      mocks: {
        $vuetify: {
          breakpoint: {}
        }
      }
    })

    expect(wrapper.findAllComponents(Post).length).toEqual(3)
  })
})

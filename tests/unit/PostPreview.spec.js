import Vue from 'vue'
import Vuetify from 'vuetify'

import { shallowMount, createLocalVue } from '@vue/test-utils'

import PostPreview from '@/components/Posts/PostPreview.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)

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

  it('renders all post props when passed', () => {
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
      }
    })

    const community = wrapper.find('.post-community')

    expect(community.text()).toBe(`r/${post.communityName}`)
  })
})

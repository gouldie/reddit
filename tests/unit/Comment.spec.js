import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { createLocalVue, mount } from '@vue/test-utils'

import Comment from '@/components/Comments/Comment.vue'
import comment from './fixtures/comment.json'

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (values = {}) => {
  return mount(Comment, {
    localVue,
    propsData: {
      comment
    },
    stubs: [
      'TimeAgo'
    ]
  })
}

describe('VotePanel.vue', () => {
  it('renders the correct number of comments/replies', async () => {
    const wrapper = factory()

    expect(wrapper.findAllComponents(Comment)).toHaveLength(3)
  })
})

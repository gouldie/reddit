import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { createLocalVue, mount } from '@vue/test-utils'

import VotePanel from '@/components/Posts/VotePanel.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(Vuex)

const mutations = {
  setModal: jest.fn()
}

const factory = (values = {}) => {
  return mount(VotePanel, {
    localVue,
    store: new Vuex.Store({
      mutations
    }),
    propsData: {
      post: {
        _id: '1',
        count: 3,
        userVote: 0
      }
    }
  })
}

describe('VotePanel.vue', () => {
  it('calls setModal mutation when unauthenticated user attempts to upvote or downvote', async () => {
    const wrapper = factory()

    wrapper.find('.vote-panel button:nth-of-type(1)').trigger('click')

    expect(mutations.setModal).toBeCalled()
  })
})

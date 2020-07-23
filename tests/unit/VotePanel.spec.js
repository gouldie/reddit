import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

import { createLocalVue, mount } from '@vue/test-utils'

import VotePanel from '@/components/Posts/VotePanel.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('VotePanel.vue', () => {
  let mutations
  let store

  beforeEach(() => {
    mutations = {
      setModal: jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
  })

  it('opens log in modal when unauthenticated user attempts to upvote or downvote', async () => {
    const wrapper = mount(VotePanel, {
      localVue,
      store,
      propsData: {
        post: {
          _id: '1',
          count: 3,
          userVote: 0
        }
      }
    })

    await flushPromises()

    wrapper.find('.vote-panel button:nth-of-type(1)').trigger('click')

    expect(mutations.setModal).toBeCalled()
  })
})

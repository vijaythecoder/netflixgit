import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SearchBox from '../../src/components/Searchbox.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('SearchBox.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      searchOrganization: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('dispatches "searchOrganization" when input search button is clicked', () => {
    const wrapper = shallowMount(SearchBox, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'netflix'
    input.trigger('input')

    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.searchOrganization).toHaveBeenCalled()
  })
})
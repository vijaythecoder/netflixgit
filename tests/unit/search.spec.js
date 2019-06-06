import { mount, shallowMount } from '@vue/test-utils'
import SearchBox from '@/components/SearchBox.vue'

describe('SearchBox.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SearchBox)
  })
  // console.log(wrapper.html())
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain(`<input type="text" placeholder="Type organization username and hit enter @eg: netflix" aria-label="Organization's username" aria-describedby="button-addon2" class="form-control input-search">`)
  })

  // check if there is a button to submit
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('Input can be typed', () => {
    expect(wrapper.vm.username).toBe('')
    const input = wrapper.find('input[type="text"]')
    input.setValue('netflix')
    expect(wrapper.vm.username).toBe('netflix')
  })

  it('Input can be typed', () => {
    expect(wrapper.vm.username).toBe('')
    const input = wrapper.find('input[type="text"]')
    input.setValue('netflix')
    expect(wrapper.vm.username).toBe('netflix')
  })

})

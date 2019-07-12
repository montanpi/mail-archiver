import { shallowMount } from '@vue/test-utils'
import SearchResult from '@/components/SearchResult.vue'

describe('SearchResult.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SearchResult, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

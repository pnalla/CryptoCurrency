import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Currency from '@/components/Currency.vue'

describe('Currency.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Currency, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})

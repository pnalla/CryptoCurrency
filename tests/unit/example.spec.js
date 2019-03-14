jest.mock('axios', () => ({
  get: jest.fn()
}))
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


describe('Currecy data methods', () => {
  it('Get Currency data method', async () => {
    let cmp = mount(Currency, {})
    const result = await cmp.vm.getCurrencyData()
    expect(result.length).toEqual(3)
  })
})
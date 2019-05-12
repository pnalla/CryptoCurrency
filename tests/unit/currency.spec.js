import Currency from '@/components/Currency.vue'
import { shallowMount } from '@vue/test-utils'

beforeEach(() => {
  const wrapper = shallowMount(Currency)
  // calling mounted method to check the data is filled in
  wrapper.vm.getCurrencyData()
})

describe('Currency.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Crypto Currency Report'
    const wrapper = shallowMount(Currency, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('display the list of currency data in tables', () => {
  const wrapper = shallowMount(Currency)
  
  // check the element is present or not
  expect(wrapper.find('[name="profit_table20180507"]').exists()).toBe(true)

  // expect the profit value of BTC is 2.030
  expect(wrapper.find('[name="profit_table_profitBTC"]').text()).toEqual('2.030')

  // expect the profit value of ETC is 0.700
  expect(wrapper.find('[name="profit_table_profitETC"]').text()).toEqual('0.700')
})

describe('Validate tables based on select dropdown value', () => {
  const wrapper = shallowMount(Currency)
  
  // select LTC from the the dropdown
  wrapper.find('#select-currency').simulate("change", {
    target: { value: "LTC", selectedIndex: 3 }
  })
  
  // expect the profit value of LTC is 0.710
  expect(wrapper.find('[name="profit_table_profitLTC"]').text()).toEqual('0.710')
})


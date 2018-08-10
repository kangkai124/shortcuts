import { shallowMount } from '@vue/test-utils'
import List from '@/components/List.vue'

describe('List.vue', () => {
  it('渲染出每一个 li', () => {
    const items = ['1', '2']
    const wrapper = shallowMount(List, {
      propsData: { items }
    })
    expect(wrapper.findAll('li')).toHaveLength(items.length)
  })

  it('snapshot 匹配', () => {
    const items = ['item 1', 'item 2']
    const wrapper = shallowMount(List, {
      propsData: { items }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

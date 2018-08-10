/* eslint-disable */
import { shallowMount } from '@vue/test-utils'
import Item from '@/components/Item.vue'

describe('Item.vue', () => {
  const item = {
    scKey: 'Ctrl+shift+f1',
    content: '测试t,还有个t'
  }
  const query = 't t'
  it('搜索结果高亮', () => {
    const wrapper = shallowMount(Item, {
      propsData: { item, query }
    })
    const h2 = wrapper.find('h2')
    expect(h2.is('h2')).toBe(true)
  })

  it('snapshot 匹配', () => {
    const item = {
      scKey: 'Ctrl+shift+f1',
      content: '测试t,还有个t'
    }
    const query = 't t'
    const wrapper = shallowMount(Item, {
      propsData: { item, query }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

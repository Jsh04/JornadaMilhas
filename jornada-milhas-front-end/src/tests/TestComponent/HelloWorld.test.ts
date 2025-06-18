// src/components/HelloWorld.test.ts
import { mount } from '@vue/test-utils'
import HelloWorld from '../../components/HelloWorld.vue'


describe('HelloWorld.vue', () => {
  it('renderiza corretamente', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Olá Vue!' }
    })
    expect(wrapper.text()).toContain('Olá Vue!')
  })
})

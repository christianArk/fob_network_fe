import { shallowMount } from '@vue/test-utils'
import Login from '@/pages/login.vue'

// const wrapper = mount(Login)
// expect(wrapper.html()).toBe('<div><p>Foo</p></div>')
describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      methods: {},
      stubs: {
        NuxtLink: true
      }
    })
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('sum should sum two numbers', () => {
    expect(wrapper.vm.sum(2, 3)).toBe(5)
  })

  it('should contain Enter your email address and password to access admin panel.', () => {
    expect(wrapper.find('p.info').text()).toBe('Enter your email address and password to access admin panel.')
  })

  it('button should be disabled if email and password is empty', () => {
    let email = wrapper.find('input[type="email"]')
    let password = wrapper.find('input[type="password"]')
    email.value = "chris"
    password.value = "chris123"
    if (email.value.length === 0 || password.value.length === 0) {
      expect(wrapper.find('button').attributes('disabled')).toBe("disabled")
    } else {
      expect(wrapper.find('button').attributes('disabled')).toBe(undefined)
    }
  })
})
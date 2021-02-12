import { shallowMount, createLocalVue } from "@vue/test-utils";
import header from "@/components/header.vue";
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import flushPromises from 'flush-promises'

// const mock = new MockAdapter(axios)
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()

jest.mock('axios', () => ({
   get: jest.fn(() => {}),
   post: jest.fn(() => Promise.resolve({})),
}))

describe("Header", () => {
  let wrapper;

  beforeEach(() => {
    let actions
    let store
    
    actions = {
      logout: jest.fn(),
    }
    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount(header, {
      store,
      localVue,
      router,
      methods: {},
      mocks: {
        $axios: axios,
      },
      stubs: {
        NuxtLink: true,
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("Logout should redirect to the login page", async () => {
    let logoutLink = wrapper.find('#logout-btn');

    await logoutLink.trigger('click')
    
    expect(actions.logout).toHaveBeenCalled()
    //expect(wrapper.vm.$router.currentRoute.path).toBe('/login')
    await flushPromises()

  });

});

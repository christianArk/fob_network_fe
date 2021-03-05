import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Login from "@/pages/login.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import axios from "axios";
import flushPromises from "flush-promises";
// import { actions, mutations } from '../store'

// const _getters = getters

const userModel = {
  id: 1,
  username: 'Chris',
  email: 'chris@gmail.com'
}

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren;
  },
});

jest.mock("axios", () => ({
  get: jest.fn(() => {}),
  post: (_url, _body) => {
    return new Promise((resolve, reject) => {
      resolve(true);
      reject(
        console.log('error')
      )
    })
  }
}));

describe("Login", () => {
  let wrapper;

  let actions;
  let state;
  let getters;
  let mutations;
  let store;

  state = {
    authenticated: false,
    user: null
  };

  getters = {
    getUser: jest.fn((state) => state.user)
  }

  mutations = {
    SET_AUTH: jest.fn((payload) => {
      state.user = payload
    })
  }

  actions = {
    login: jest.fn(),
  };

  // getters = {
  //   getUser: jest.fn(() => {
  //     return 'Hello'
  //   }),
  // };

  store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
  });

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      // store,
      methods: {},
      localVue,
      router,
      mocks: {
        $axios: axios
      },
      stubs: {
        NuxtLink: true,
        transition: transitionStub(),
        RouterLink: RouterLinkStub
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("should contain Enter your email address and password to access admin panel.", () => {
    expect(wrapper.find("p.info").text()).toBe(
      "Enter your email address and password to access admin panel."
    );
  });

  it("button should be disabled if email and password is empty", async () => {
    let email = wrapper.vm.$data.user.email;
    let password = wrapper.vm.$data.user.password;
    if (email.length === 0 && password.length === 0) {
      expect(wrapper.find("button").attributes("disabled")).toBe("disabled");
    } else {
      expect(wrapper.find("button").attributes("disabled")).toBe(undefined);
    }
  });

  it("button should disabled when submitted, loader should appear and should redirect to dashboard", async () => {
    
    await wrapper.setData({ user: { email: 'chris@gmail.com', password: 'chris123' } })
    let button = wrapper.find("button");

    await button.trigger("click")
    
    expect(wrapper.vm.$data.isLoading).toBe(true);
    expect(wrapper.find("button").attributes("disabled")).toBe("disabled");
    expect(wrapper.find("button i.fas.fa-circle-notch").exists()).toBe(true);
    
    // actions.login
    let commit = jest.fn()
    await expect(actions.login).toHaveBeenCalled()
    // console.log(getters.getUser(state))
    expect(commit).toHaveBeenCalledWith("SET_AUTH")
    await flushPromises();

    // expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/");
  });
});

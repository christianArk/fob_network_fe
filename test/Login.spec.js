import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "@/pages/login.vue";
import VueRouter from "vue-router";
import axios from "axios";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren;
  },
});

jest.mock("axios", () => ({
  get: jest.fn(() => {}),
  post: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve("ok");
    }).catch();
  }),
}));

describe("Login", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      methods: {},
      localVue,
      router,
      mocks: {
        $axios: axios,
      },
      stubs: {
        NuxtLink: true,
        transition: transitionStub(),
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

  it("button should be disabled if email and password is empty", () => {
    let email = wrapper.vm.$data.user.email;
    let password = wrapper.vm.$data.user.password;
    if (email.length === 0 && password.length === 0) {
      expect(wrapper.find("button").attributes("disabled")).toBe("disabled");
    } else {
      expect(wrapper.find("button").attributes("disabled")).toBe(undefined);
    }
  });

  it("button should disabled when submitted, loader should appear and should redirect to dashboard", async () => {
    wrapper.vm.$data.user.email = "chris@gmail.com";
    wrapper.vm.$data.user.password = "chris123";
    let button = wrapper.find("button");
    console.log(
      wrapper.vm.emailAndPasswordSet,
      wrapper.find("button").attributes("disabled")
    );
    button.trigger("click").then(() => {
      expect(wrapper.vm.$data.isLoading).toBe(true);
      expect(wrapper.find("button").attributes("disabled")).toBe("disabled");
      expect(wrapper.find("button").text()).toBe(
        '<i class="fas fa-circle-notch fa-spin"></i>'
      );
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("login");
    });

    await flushPromises();

    expect(wrapper.vm.$router.currentRoute.path).toBe("/");
  });
});

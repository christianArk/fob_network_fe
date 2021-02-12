<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-lg-5">
      <div class="card card-pages shadow-none mt-4">
        <div class="card-body">
          <div class="text-center mt-0 mb-3">
            <nuxt-link to="/" class="logo logo-admin">
              <img
                src="~/~/assets/images/logo.png"
                class="mt-3"
                alt=""
                height="26"
              />
            </nuxt-link>
            <p class="text-muted w-75 mx-auto mb-4 mt-4 info">
              Enter your email address and password to access admin panel.
            </p>
          </div>

          <form class="form-horizontal mt-4" autocomplete="off">
            <div class="form-group">
              <div class="col-12">
                <label for="username">Email</label>
                <input
                  v-model="user.email"
                  class="form-control"
                  type="email"
                  required=""
                  id="email"
                  placeholder="Email"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-12">
                <label for="password">Password</label>
                <input
                  v-model="user.password"
                  class="form-control"
                  type="password"
                  required=""
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-12">
                <div class="checkbox checkbox-primary">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Remember me</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group text-center mt-3">
              <div class="col-12">
                <button
                  v-if="!isLoading"
                  class="btn btn-black btn-block waves-effect waves-light"
                  type="submit"
                  @click.prevent="login()"
                  :disabled="!emailAndPasswordSet"
                >
                  Log In
                </button>
                <button
                  v-else
                  class="btn btn-black btn-block waves-effect waves-light"
                  disabled
                >
                  <i class="fas fa-circle-notch fa-spin"></i>
                </button>
              </div>
            </div>

            <div class="form-group text-center mt-4">
              <div class="col-12">
                <div class="float-left">
                  <nuxt-link to="/forgot-password" class="text-muted">
                    <i class="fa fa-lock mr-1"></i> Forgot your
                    password?</nuxt-link
                  >
                </div>
                <!-- <div class="text-right">
                  <nuxt-link to="/sign-up" class="text-muted">
                    Create an account</nuxt-link
                  >
                </div> -->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end row -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      isLoading: false as boolean,
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    emailAndPasswordSet(): boolean {
      return this.user.email !== '' && this.user.password !== '';
    },
  },
  mounted() {},
  methods: {
    async login() {
      this.isLoading = true;
      await this.$store
        .dispatch('login', this.user)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err: any) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
});
</script>

<style scoped>
.btn-black {
  background: #000000;
  color: #ffffff;
}
</style>

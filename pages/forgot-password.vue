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
              Enter your email address.
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

            <div class="form-group text-center mt-3">
              <div class="col-12">
                <button
                  v-if="!isLoading"
                  class="btn btn-black btn-block waves-effect waves-light"
                  type="submit"
                  @click.prevent="sendResetEmail()"
                  :disabled="!emailSet"
                >
                  Send Reset Email
                </button>
                <button
                  v-if="isLoading"
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
                  <nuxt-link to="/login" class="text-muted">
                    <i class="fa fa-lock mr-1"></i> Remember now?</nuxt-link
                  >
                </div>
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
      },
    };
  },
  computed: {
    emailSet(): boolean {
      return this.user.email !== '';
    },
  },
  mounted() {},
  methods: {
    async sendResetEmail() {
      this.isLoading = true;
      await this.$store
        .dispatch('forgotPassword', this.user)
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

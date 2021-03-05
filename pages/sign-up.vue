<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-lg-5">
      <div class="card card-pages shadow-lg mt-4">
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
              Create an account with us.
            </p>
          </div>

          <form class="form-horizontal mt-4" autocomplete="off">

            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <label for="firstname">Firstname</label>
                  <input
                    v-model="user.firstName"
                    class="form-control"
                    type="text"
                    required=""
                    id="firstname"
                    placeholder="Firstname"
                  />
                </div>
                <div class="col-md-6">
                  <label for="lastname">Lastname</label>
                  <input
                    v-model="user.lastName"
                    class="form-control"
                    type="text"
                    required=""
                    id="lastname"
                    placeholder="Lastname"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
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
                <div class="col-md-6">
                  <label for="confirm_password">Re-Password</label>
                  <input
                    v-model="user.confirm_password"
                    class="form-control"
                    type="password"
                    required=""
                    id="confirm_password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <label for="phonenumber">Gender</label>
                  <select v-model="user.gender" class="form-control">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="phonenumber">Phone Number</label>
                  <input
                    v-model="user.phoneNumber"
                    class="form-control"
                    type="text"
                    required=""
                    id="phonenumber"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-12">
                  <label for="country">Country</label>
                  <select v-model="user.country" class="form-control" id="country">
                    <option value="Nigeria">Nigeria</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
              <div class="col-md-6">
                  <label for="state">State</label>
                  <select v-model="user.state" class="form-control" id="state">
                    <option value="Ibadan">Ibadan</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="city">City</label>
                  <select v-model="user.city" class="form-control" id="city">
                    <option value="Oluyole">Oluyole</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-12">
                  <label for="address">Address</label>
                  <input
                    v-model="user.address"
                    class="form-control"
                    type="text"
                    required=""
                    id="address"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <div class="form-group text-center mt-3">
              <div class="row">
                <div class="col-12">
                  <button
                    v-if="!isLoading"
                    class="btn btn-black btn-block waves-effect waves-light"
                    type="submit"
                    @click.prevent="register()"
                    :disabled="!formIsValid"
                  >
                    Sign Up
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
            </div>

            <div class="form-group text-center mt-4">
              <div class="row">
                <div class="col-md-12">
                  <div class="float-left">
                    <nuxt-link to="/login" class="text-muted">
                      <i class="fa fa-lock mr-1"></i> Already have an account?</nuxt-link
                    >
                  </div>
                  <!-- <div class="text-right">
                    <nuxt-link to="/sign-up" class="text-muted">
                      Create an account</nuxt-link
                    >
                  </div> -->
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
        password: '',
      },
    };
  },
  computed: {
    formIsValid(): boolean {
      return this.user.email !== '' && this.user.password !== '';
    },
  },
  mounted() {
  },
  methods: {
    async register() {
      this.isLoading = true;
      await this.$store
        .dispatch('register', this.user)
        .then(() => {
          // console.log('came here');
          // this.$router.push('/');
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

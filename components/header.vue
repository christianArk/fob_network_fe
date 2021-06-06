<template>
  <!-- Top Bar Start -->
  <div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
      <a href="#" class="logo">
        <img
          src="~/~/assets/images/logo_main.png"
          class="logo-lg"
          alt=""
          height="22"
        />
        <img
          src="~/~/assets/images/logo_main.png"
          class="logo-sm"
          alt=""
          height="24"
        />
      </a>
    </div>

    <!-- Search input -->
    <div id="search-wrap" class="search-wrap">
      <div class="search-bar">
        <input class="search-input" type="search" placeholder="Search" />
        <a
          href="#"
          class="close-search toggle-search"
          data-target="#search-wrap"
        >
          <i class="mdi mdi-close-circle"></i>
        </a>
      </div>
    </div>

    <nav class="navbar-custom">
      <ul class="navbar-right list-inline float-right mb-0">

        <li class="dropdown notification-list list-inline-item">
          <div class="dropdown notification-list nav-pro-img">
            <a
              class="dropdown-toggle nav-link arrow-none waves-effect nav-user"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <img
                src="~/assets/images/users/user-1.jpg"
                alt="user"
                class="rounded-circle"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown"
            >
              <!-- item-->
              <a class="dropdown-item" href="#"
                ><i class="mdi mdi-account-circle"></i> Profile</a
              >
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item text-danger"
                id="logout-btn"
                href="#"
                @click.prevent="logout"
                ><i class="mdi mdi-power text-danger"></i> Logout</a
              >
            </div>
          </div>
        </li>
      </ul>

      <ul class="list-inline menu-left mb-0">
        <li class="float-left">
          <button class="button-menu-mobile open-left waves-effect">
            <i class="mdi mdi-menu"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
  <!-- Top Bar End -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',

  data() {
    return {
      title: 'My Header File',
      isLoggedOut: false as boolean,
    };
  },

  computed: {},

  methods: {
    async logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.isLoggedOut = true;
          // @ts-ignore
          this.$laravel.setPermissions([]);
          this.$store.commit('LOGOUT');
          this.$router.push('/login');
        })
        .catch((err) => { this.$router.push('/login'); });
    },
  },
});
</script>

<style scoped></style>

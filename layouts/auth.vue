<template>
  <div>
    <div class="accountbg"></div>

    <!-- Begin page -->
    <div class="home-btn d-none d-sm-block">
      <nuxt-link to="/dashboard" class="text-black"
        ><i class="mdi mdi-home h1"></i
      ></nuxt-link>
    </div>

    <div class="wrapper-page">
      <div class="container">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    year(): number {
      return new Date().getFullYear();
    },
  },
  mounted() {},
  updated() {},
});
</script>
<style scoped>
.nuxt-link-active {
  color: #000000 !important;
}

.text-black {
  color: #000000 !important;
}
.nuxt-link-active {
  color: #ffffff !important;
}
.accountbg {
  background: #ffffff !important;
  /* background: #eb9532 !important; */
}
</style>

<template>
  <!-- Begin page -->
  <div id="wrapper">
    <Header />

    <Sidebar />

    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
      <!-- Start content -->

      <Nuxt />

      <footer class="footer">&copy; {{ year }} Mevron</footer>
    </div>
    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/header.vue';
import Sidebar from '../components/sidebar.vue';

declare let $: any;

export default Vue.extend({
  components: {
    Header,
    Sidebar,
  },
  computed: {
    year(): number {
      return new Date().getFullYear();
    },
  },
  mounted() {
    $('#side-menu').metisMenu();
  },
  updated() {},
});
</script>
<style>
.nuxt-link-active {
  color: #ffffff !important;
}
</style>

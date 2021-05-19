<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu">
          <li class="menu-title">Menu</li>
          <li>
            <nuxt-link to="/"
              ><i class="dripicons-meter"></i> Dashboard</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/users"
              ><i class="dripicons-user"></i> Users</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/roles"
              ><i class="dripicons-gear"></i> Roles</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/record"
              ><i class="dripicons-document"></i> Network Status</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/activity-log"
              ><i class="dripicons-graph-bar"></i> Activity Log</nuxt-link
            >
          </li>

        </ul>
      </div>
      <!-- Sidebar -->
      <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  updated() {
  },
});
</script>

<style scoped></style>

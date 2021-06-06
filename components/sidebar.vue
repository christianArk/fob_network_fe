/* eslint-disable max-len */
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
            <nuxt-link to="/dashboard"
              ><i class="dripicons-meter"></i> Dashboard</nuxt-link
            >
          </li>
          <li v-permission:any="'Can View Users|Can Update Users|Can Delete Users|Can Create Users'">
            <nuxt-link to="/users"
              ><i class="dripicons-user"></i> Users</nuxt-link
            >
          </li>
          <li v-permission:any="'Can Manage Roles'">
            <nuxt-link to="/roles"
              ><i class="dripicons-gear"></i> Roles</nuxt-link
            >
          </li>
          <li v-permission:any="'Can Create Network Log|Can View Network Log|Can Edit Network Log|Can Delete Network Log'">
            <nuxt-link to="/network-information"
              ><i class="dripicons-document"></i> Network Information</nuxt-link
            >
          </li>
          <li v-permission:any="'Can Create Network Log|Can View Network Log|Can Edit Network Log|Can Delete Network Log'">
            <nuxt-link to="/locations"
              ><i class="dripicons-location"></i> Locations</nuxt-link
            >
          </li>
          <li v-permission:any="'Can View Activity Logs'">
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

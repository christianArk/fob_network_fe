<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Reports</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">Reports</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h6>Company</h6>
              <ul>
                <li><a href="#">Billing</a></li>
                <li><a href="#">Activities</a></li>
                <li><a href="#">Login Information</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h6>Users</h6>
              <ul>
                <li><a href="#">Users</a></li>
                <li><a href="#">Drivers</a></li>
                <li><a href="#">Operators</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h6>Analytics</h6>
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  mounted() {},
  data() {
    return {
    };
  },
  methods: {
    selectionChanged() {

    },
  },
});
</script>

<style scoped></style>

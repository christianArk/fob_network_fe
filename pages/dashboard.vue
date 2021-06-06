<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Dashboard</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">
                  Welcome to FOB Portal Dashboard
                </li>
              </ol>
            </div>
          </div>

          <div class="col-md-4">
            <!-- <div class="float-right d-none d-md-block app-datepicker">
                  <input type="text" class="form-control"
                  data-date-format="MM dd, yyyy" readonly="readonly" id="datepicker">
                  <i class="mdi mdi-chevron-down mdi-drop"></i>
                  </div> -->
          </div>
        </div>
      </div>
      <!-- end page-title -->

      <!-- start top-Contant -->
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title font-16 mt-0">Statistics</h4>
              <!-- <h6 class="card-subtitle font-14 text-muted">
                Drivers Statistics
              </h6> -->
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-xl-4">
                  <div class="card text-white bg-primary">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">All Logs</h4>
                            <h3>10</h3>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="icon">
                            <i class="dripicons-user"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4">
                  <div class="card text-white bg-success">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">Active Users</h4>
                            <h3>5</h3>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="icon">
                            <i class="dripicons-user"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4">
                  <div class="card text-white bg-danger">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">Inactive Users</h4>
                            <h3>3</h3>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="icon">
                            <i class="dripicons-user"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- end row -->
    </div>
    <!-- container-fluid -->
  </div>
  <!-- content -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
});
</script>

<style>
div.icon {
  color: hsla(0, 0%, 100%, 0.8);
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  padding: 10px;
  text-align: center;
  line-height: 94px;
}
div.icon i {
  font-size: 24px;
  text-align: center;
}
.my-card {
  padding: 0px !important;
}
</style>

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
              <h4 class="card-title font-16 mt-0">Drivers</h4>
              <h6 class="card-subtitle font-14 text-muted">
                Drivers Statistics
              </h6>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-xl-3">
                  <div class="card text-white bg-success">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">Active</h4>
                            <h3>200</h3>
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

                <div class="col-xl-3">
                  <div class="card text-white bg-primary">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">Invited</h4>
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

                <div class="col-xl-3">
                  <div class="card text-white bg-warning">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">
                              Incomplete Reg.
                            </h4>
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

                <div class="col-xl-3">
                  <div class="card text-white bg-danger">
                    <div class="card-body my-card" style="padding: 0px">
                      <div class="row">
                        <div class="col-md-8">
                          <div style="float: left; padding: 20px">
                            <h4 class="card-title font-16 mt-0">Suspended</h4>
                            <h3>46</h3>
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

      <div class="row mb-3">
        <div class="col-lg-12">
          <h4 class="card-title font-16 mt-0">Operators</h4>
          <h6 class="card-subtitle font-14 text-muted">Operators Statistics</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center p-1">
                <div class="col-lg-12">
                  <h5 class="font-16">Active</h5>
                  <h4 class="text-info pt-1 mb-0">200</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center p-1">
                <div class="col-lg-12">
                  <h5 class="font-16">Inactive</h5>
                  <h4 class="text-warning pt-1 mb-0">200</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center p-1">
                <div class="col-lg-12">
                  <h5 class="font-16">Suspended</h5>
                  <h4 class="text-danger pt-1 mb-0">12</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end top-Contant -->

      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <h4 class="mt-0 header-title mb-4">Operational Area</h4>
              <div></div>
            </div>
          </div>
        </div>

        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">
              <h4 class="mt-0 header-title mb-4">Rides</h4>
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

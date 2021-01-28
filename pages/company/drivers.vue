<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Drivers</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:void(0);">Company</a>
                </li>
                <li class="breadcrumb-item active">Drivers</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
            <div class="float-right">
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light"
              >
                <i class="dripicons-plus"></i> Add Driver
              </button>
              <button type="button" class="btn btn-secondary waves-effect">
                <i class="dripicons-download"></i> Import
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <table
                id="datatable"
                class="table table-bordered table-responsive nowrap"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  width: 100%;
                "
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Custom Driver Key</th>
                    <th>Email</th>
                    <th>Vehicle Model</th>
                    <th>Vehicle Type</th>
                    <th>Production Year</th>
                    <th>Creation Date</th>
                    <th>Board Number</th>
                    <th>Plate Number</th>
                    <th>Subscription Plan</th>
                    <th>Balance</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                    <td>Edinburgh</td>
                    <td>Edinburgh</td>
                    <td>Edinburgh</td>
                    <td>Edinburgh</td>
                    <td>Edinburgh</td>
                    <td>$320,800</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </table>
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
import Vue from "vue";

export default Vue.extend({
  mounted() {},
});
</script>

<style scoped></style>

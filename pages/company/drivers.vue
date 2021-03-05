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
              <b-button variant="primary" class="waves-effect waves-light" v-b-toggle.sidebar-right>
                <i class="dripicons-plus"></i> Add Driver
              </b-button>
              <b-button variant="secondary"
              class="waves-effect waves-light" v-b-toggle.import-users>
                <i class="dripicons-download"></i> Import
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <vue-good-table
              :columns="columns"
              @on-selected-rows-change="selectionChanged"
              :select-options="{ enabled: true, selectOnCheckboxOnly: true, }"
              compactMode
              :rows="rows">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'status'">
                  <span v-if="props.row.status == 'active'" class="badge badge-success">
                    Active
                  </span>
                  <span v-else class="badge badge-danger">Inactive</span>
                </span>
                <span v-else-if="props.column.field == 'actions'">
                  <button class="btn btn-light btn-sm dropdown-toggle"
                  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="dripicons-gear"></i>
                  </button>
                  <div class="dropdown-menu" x-placement="bottom-start"
                  style="position: absolute; transform: translate3d(0px, 35px, 0px); top: 0px;
                   left: 0px; will-change: transform;">
                      <a class="dropdown-item" href="#">View</a>
                      <a class="dropdown-item" href="#">Edit</a>
                      <div class="dropdown-divider"></div>
                      <a v-if="props.row.status == 'active'" class="dropdown-item" href="#">
                        Disable
                      </a>
                      <a v-else class="dropdown-item" href="#">
                        Enable
                      </a>
                  </div>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
              </vue-good-table>
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>

    <b-sidebar id="sidebar-right" width="500px" title="New Driver" right shadow>
      <div class="px-3 py-2">
        <b-form>
          <b-row>
            <b-col>
              <b-form-group
                label="Firstname"
                label-for="firstname"
              >
                <b-form-input
                  id="firstname"
                  v-model="form.firstName"
                  type="text"
                  placeholder="First Name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Lastname"
                label-for="lastname"
              >
                <b-form-input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group
            id="input-group-1"
            label="Email address"
            label-for="email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                label="Phone Number"
                label-for="phone"
              >
                <b-form-input
                  id="phone"
                  v-model="form.PhoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- <b-col>
              <b-form-group
                label="Role"
                label-for="role"
              >
                <b-form-select
                  id="role"
                  v-model="form.role"
                  :options="roles"
                ></b-form-select>
              </b-form-group>
            </b-col> -->
          </b-row>

          <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              v-model="form.checked"
              id="checkboxes-4"
              :aria-describedby="ariaDescribedby"
            >
              <b-form-checkbox value="active">Enable</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-sidebar>

    <b-sidebar id="import-users" width="300px" title="Import Drivers" right shadow>
      <div class="px-3 py-2">
        <b-form>
          <b-row class="mb-5 mt-5">
            <b-col cols="12">
              <b-form-group
                label="Choose a file to import"
                label-for="firstname"
              >
                <b-form-file ref="file-input" class="mb-2"></b-form-file>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <p class="text-muted text-center">
                Import a list of drivers into the system with excel
              </p>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary">Upload</b-button>
          <button class="btn btn-secondary">
            <i class="dripicons-document"></i> Downoad Sample
          </button>
        </b-form>
      </div>
    </b-sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  mounted() {},
  data() {
    return {
      form: {},
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Phone Number',
          field: 'phone',
        },
        {
          label: 'Custom Driver Key',
          field: 'customDriverKey',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Vehicle Model',
          field: 'vehicleModel',
        },
        {
          label: 'Production Year',
          field: 'productionYear',
          type: 'number',
        },
        {
          label: 'Creation Date',
          field: 'creationDate',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Board Number',
          field: 'boardNumber',
        },
        {
          label: 'Plate Number',
          field: 'plateNumber',
        },
        {
          label: 'Subscription Plan',
          field: 'subPlan',
        },
        {
          label: 'Balance',
          field: 'balance',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: '',
          field: 'actions',
          sortable: false,
          width: '50px',
        },
      ],
      rows: [
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
        {
          name: 'Olawale lasisi',
          phone: '+1483383838383',
          customDriverKey: '',
          email: 'olawale@mevron.com',
          vehicleModel: 'Mercedes Benz',
          productionYear: '2020',
          creationDate: '10/23/2020',
          boardNumber: 1,
          plateNumber: 'ABC123',
          subPlan: '',
          balance: 0,
          status: 'active',
        },
      ],
    };
  },
  methods: {
    selectionChanged() {

    },
  },
});
</script>

<style scoped></style>

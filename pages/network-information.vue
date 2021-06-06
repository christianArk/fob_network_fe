<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Network Information</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">All Network Logs</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
            <div class="float-right">
              <b-button variant="primary"
              v-permission="'Can Create Network Log'"
              class="waves-effect waves-light" v-b-toggle.new-log>
                <i class="dripicons-plus"></i> New Log
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12" v-if="!this.$laravel.hasPermission('Can View Network Log')">
          <div class="alert alert-danger">You are not authorized to view this information</div>
        </div>
        <div v-else class="col-12">
          <div class="card">
            <div class="card-body">

              <vue-good-table
              :columns="columns"
              @on-selected-rows-change="selectionChanged()"
              :select-options="{ enabled: false, selectOnCheckboxOnly: true, }"
              compactMode
              :rows="rows"
              :pagination-options="{
                enabled: true
              }"
              >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'status'">
                  <span v-if="props.row.status == 'Resolved'" class="badge badge-success">
                    {{  props.row.status  }}
                  </span>
                  <span v-else-if="props.row.status == 'Outage'" class="badge badge-danger">
                    {{  props.row.status  }}
                  </span>
                  <span v-else class="badge badge-warning">{{  props.row.status  }}</span>
                </span>
                <span v-else-if="props.column.field == 'actions'">
                  <button class="btn btn-light btn-sm dropdown-toggle"
                  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="dripicons-gear"></i>
                  </button>
                  <div class="dropdown-menu" x-placement="bottom-start"
                  style="position: absolute; transform: translate3d(0px, 35px, 0px); top: 0px;
                   left: 0px; will-change: transform;">
                      <a class="dropdown-item" href="#"
                      @click.prevent="editLog(props.row.id)">Edit</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#"
                      @click.prevent="confirmLog(props.row.id)">Delete</a>
                      <!-- <a v-if="props.row.status == 'active'" class="dropdown-item" href="#">
                        Disable
                      </a>
                      <a v-else class="dropdown-item" href="#">
                        Enable
                      </a> -->
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

    <b-sidebar v-model="showAddLog" id="new-log" width="500px" title="Add New Log" right shadow>
      <div class="px-3 py-2">
        <b-form ref="createLogForm" autocomplete="off">
          <b-row>
            <!-- <b-col>
              <b-form-group
                label="Area"
                label-for="area"
              >
                <b-form-select
                  id="area"
                  v-model="form.area"
                  :options="area"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.form.area.required">
                  Area is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col> -->
            <b-col>
              <b-form-group
                label="Location"
                label-for="location"
              >
                <b-form-select
                  id="role"
                  v-model="form.location"
                  multiple
                  :options="locations"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.form.location.required">
                  Location is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                label="Status"
                label-for="status"
              >
                <b-form-select
                  id="role"
                  v-model="form.status"
                  :options="statuses"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.form.status.required">
                  Status is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Services Affected"
                label-for="services_affected"
              >
                <b-form-select
                  id="services_affected"
                  multiple
                  v-model="form.services_affected"
                  :options="services"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.form.services_affected.required">
                  Services affected is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
                <b-form-group
                  label="Time Of Downtime"
                  label-for="time_of_downtime"
                >
                  <date-picker v-model="$v.form.time_of_downtime.$model"
                  :state="validateState('time_of_downtime')"
                  :format="'DD-MM-YYYY hh:mm a'"
                  placeholder="Time of downtime" type="datetime"></date-picker>
                  <b-form-invalid-feedback v-if="!$v.form.time_of_downtime.required">
                    Time of downtime is required
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col>
              <b-form-group
                id="input-group-1"
                label="Expected Time Of Recovery"
                label-for="recovery_time"
              >
                <date-picker v-model="$v.form.recovery_time.$model"
                    :state="validateState('recovery_time')"
                    :format="'DD-MM-YYYY hh:mm a'" type="datetime"
                    placeholder="Recovery Time"></date-picker>
                <b-form-invalid-feedback v-if="!$v.form.recovery_time.required">
                  Expected Time Of Recovery
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
                <b-form-group
                  label="Time Of Recovery"
                  label-for="time_of_recovery"
                >
                  <date-picker v-model="$v.form.time_of_recovery.$model"
                  :format="'DD-MM-YYYY hh:mm a'"
                  placeholder="Time of recovery" type="datetime"></date-picker>
                </b-form-group>
              </b-col>
          </b-row>

          <b-button v-if="!isLoading" type="submit" variant="primary" :disabled="$v.form.$invalid"
           @click.prevent="submitForm()">Submit</b-button>
          <b-button v-else variant="primary" disabled>
            <i class="fas fa-circle-notch fa-spin"></i>
          </b-button>
          <b-button type="reset" @click.prevent="resetForm()" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-sidebar>

    <b-sidebar v-model="showEditForm"
    id="edit-network" width="500px" title="Edit Network Information" right shadow>
      <div class="px-3 py-2">
        <b-form ref="editLogForm" autocomplete="off">
          <b-row>
            <!-- <b-col>
              <b-form-group
                label="Area"
                label-for="area"
              >
                <b-form-select
                  id="area"
                  v-model="editForm.area"
                  :options="area"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.editForm.area.required">
                  Area is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col> -->
            <b-col>
              <b-form-group
                label="Location"
                label-for="location"
              >
                <b-form-select
                  id="role"
                  v-model="editForm.location"
                  multiple
                  :options="locations"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.editForm.location.required">
                  Location is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                label="Status"
                label-for="status"
              >
                <b-form-select
                  id="role"
                  v-model="editForm.status"
                  :options="statuses"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.editForm.status.required">
                  Status is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Services Affected"
                label-for="services_affected"
              >
                <b-form-select
                  id="services_affected"
                  multiple
                  v-model="editForm.services"
                  :options="services"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.editForm.services_affected.required">
                  Services affected is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="input-group-1"
                label="Expected Time Of Recovery"
                label-for="recovery_time"
              >
                <date-picker v-model="$v.editForm.recovery_time.$model"
                    :state="validateState('recovery_time')"
                    :format="'DD-MM-YYYY hh:mm a'" type="datetime"
                    placeholder="Recovery Time"></date-picker>
                <b-form-invalid-feedback v-if="!$v.editForm.recovery_time.required">
                  Expected Time Of Recovery
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                  label="Time Of Downtime"
                  label-for="time_of_downtime"
                >
                  <date-picker v-model="$v.editForm.time_of_downtime.$model"
                  :state="validateState('time_of_downtime')"
                  placeholder="Time of downtime"
                  :format="'DD-MM-YYYY hh:mm a'" type="datetime"></date-picker>
                  <b-form-invalid-feedback v-if="!$v.editForm.time_of_downtime.required">
                    Time of downtime is required
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
          </b-row>

          <b-row>
            <b-col>
                <b-form-group
                  label="Time Of Recovery"
                  label-for="time_of_recovery"
                >
                  <date-picker v-model="$v.editForm.time_of_recovery.$model"
                  :format="'DD-MM-YYYY hh:mm a'"
                  placeholder="Time of recovery" type="datetime"></date-picker>
                </b-form-group>
              </b-col>
          </b-row>

          <b-button v-if="!isLoading" type="submit" variant="primary"
          :disabled="$v.editForm.$invalid"
           @click.prevent="updateLog()">Submit</b-button>
          <b-button v-else variant="primary" disabled>
            <i class="fas fa-circle-notch fa-spin"></i>
          </b-button>
          <b-button type="reset" @click.prevent="resetForm()" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-sidebar>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import {
  required,
} from 'vuelidate/lib/validators';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default Vue.extend({
  mixins: [validationMixin],
  components: { DatePicker },
  mounted() {
    this.getLogs();
  },
  data() {
    return {
      showAddLog: false,
      showEditForm: false,
      tableLoading: false,
      isLoading: false,
      filter: {
        performed_by: null,
      },
      form: {
        // area: '',
        location: '',
        time_of_downtime: '',
        recovery_time: '',
        services: null,
        status: '',
        time_of_recovery: '',
      },
      editForm: {
        id: '',
        // area: '',
        location: '',
        time_of_downtime: '',
        recovery_time: '',
        services: null,
        status: '',
        time_of_recovery: '',
      },
      area: [
        { value: '', text: 'Please select an option' },
        { value: '1', text: 'Lagos Island' },
        { value: '2', text: 'Lagos Mainland' },
      ],
      locations: [
        { value: '', text: 'Please select an option' },
        { value: '1', text: 'Agungi' },
        { value: '2', text: 'Obalende' },
        { value: '3', text: 'Gbagada' },
        { value: '4', text: 'Isale-Eko' },
      ],
      statuses: [
        { value: '', text: 'Please select an option' },
        { value: 'Pending', text: 'Pending' },
        { value: 'Outage', text: 'Outage' },
        { value: 'Resolved', text: 'Resolved' },
      ],
      services: [
        { value: '', text: 'Please select an option' },
        { value: 'MPLS', text: 'MPLS' },
        { value: 'Internet', text: 'Internet' },
        { value: 'VPN', text: 'VPN' },
        { value: 'DNS', text: 'DNS' },
        { value: 'Email', text: 'Email' },
        { value: 'E-Service', text: 'E-Service' },
        { value: 'MyFOB Mobile App', text: 'MyFOB Mobile App' },
      ],
      columns: [
        {
          label: 'Actions',
          field: 'actions',
          width: '5%',
        },
        {
          label: 'Area',
          field: 'area',
        },
        {
          label: 'Location Of Downtime',
          field: 'location',
        },
        {
          label: 'Services Affected',
          field: 'services_affected',
        },
        {
          label: 'Time Of Downtime',
          field: 'time',
          width: '20%',
        },
        {
          label: 'Expected Recovery Time',
          field: 'recovery_time',
        },
        {
          label: 'Timed Recovered',
          field: 'time_recovered',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Posted By',
          field: 'posted_by',
        },
        {
          label: 'Date Added',
          field: 'created_at',
          width: '15%',
        },
      ],
      rows: [],
    };
  },
  validations: {
    form: {
      location: {
        required,
      },
      time_of_downtime: {
        required,
      },
      recovery_time: {
        required,
      },
      services_affected: {
        required,
      },
      status: {
        required,
      },
      time_of_recovery: {},
      // area: {
      //   required,
      // },
    },
    editForm: {
      location: {
        required,
      },
      time_of_downtime: {
        required,
      },
      recovery_time: {
        required,
      },
      services_affected: {
        required,
      },
      status: {
        required,
      },
      time_of_recovery: {},
      // area: {
      //   required,
      // },
    },
  },
  computed: {
  },
  methods: {
    resetForm() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = '';
      });
      this.$v.form.$reset();
    },
    async editLog(id) {
      await this.getLog(id);
      this.showEditForm = true;
    },
    async getLog(id) {
      await this.$store
        .dispatch('getLog', id)
        .then((res) => {
          this.editForm = res.data;
          this.editForm.location = res.data.location.split(',');
          this.editForm.services = res.data.services_affected.split(',');
          this.editForm.time_of_downtime = new Date(res.data.time_of_downtime);
          this.editForm.recovery_time = new Date(res.data.expected_time_of_recovery);
          this.editForm.time_of_recovery = new Date(res.data.time_recovered);
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving logs!', 'error');
        });
    },
    async getLogs() {
      this.rows = [];
      this.tableLoading = true;
      await this.$store
        .dispatch('getLogs')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              area: el.area_name,
              location: el.location_names,
              time_recovered: (el.time_recovered) ? this.$moment(el.time_recovered).format('MMMM Do YYYY h:mm a') : 'N.A',
              time: this.$moment(el.time_of_downtime).format('MMMM Do YYYY h:mm a'),
              recovery_time: this.$moment(el.expected_time_of_recovery).format('MMMM Do YYYY h:mm a'),
              posted_by: `${el.user.firstname} ${el.user.lastname}`,
              created_at: this.$moment(el.created_at).format('MMMM Do YYYY'),
              status: el.status,
              services_affected: el.services_affected,
              id: el.id,
            };
            this.rows.push(obj);
          });
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
          this.$swal('Error', 'An error occured while retreiving log!', 'error');
        });
    },
    async submitForm() {
      const app = this;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.isLoading = true;
      await this.$store
        .dispatch('createNetworkLog', this.form)
        .then(() => {
          this.isLoading = false;
          Object.keys(this.form).forEach((key) => {
            this.form[key] = '';
          });
          this.$v.form.$reset(); // = false;
          this.showAddLog = false;
          app.getLogs();
          this.$swal('Success', 'Network entry was successfully added!', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal('Error', 'An error occured!', 'error');
          this.isLoading = false;
        });
    },
    async updateLog() {
      const app = this;
      this.$v.editForm.$touch();
      if (this.$v.editForm.$anyError) {
        return;
      }
      this.isLoading = true;
      delete this.editForm.user;
      delete this.editForm.updated_at;
      delete this.editForm.expected_time_of_recovery;
      delete this.editForm.user_id;
      await this.$store
        .dispatch('updateLog', { id: this.editForm.id, payload: this.editForm })
        .then(() => {
          this.isLoading = false;
          Object.keys(this.editForm).forEach((key) => {
            this.editForm[key] = '';
          });
          this.$v.editForm.$reset(); // = false;
          this.showEditForm = false;
          app.getLogs();
          this.$swal('Success', 'Network entry was successfully updated!', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal('Error', 'An error occured!', 'error');
          this.isLoading = false;
        });
    },
    async confirmLog(id) {
      const app = this;
      this.$swal({
        title: 'Are you sure?',
        text: 'This cannot be undone.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel please!',
      }).then((res) => {
        if (res.isConfirmed) {
          app.deleteLog(id);
        } else {
          app.$swal('Cancelled', 'Your log is safe :)', 'error');
        }
      });
    },
    async deleteLog(id) {
      await this.$store
        .dispatch('deleteLog', id)
        .then(() => {
          this.$swal('Success', 'Network log was successfully deleted!', 'success');
          this.getLogs();
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while deleting role!', 'error');
        });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    validateEditState(name) {
      const { $dirty, $error } = this.$v.editForm[name];
      return $dirty ? !$error : null;
    },
    selectionChanged() {},
  },
});
</script>

<style scoped></style>

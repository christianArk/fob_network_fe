<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Users</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:void(0);">Company</a>
                </li>
                <li class="breadcrumb-item active">Users</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
            <div class="float-right">
              <b-button variant="primary" class="waves-effect waves-light" v-b-toggle.sidebar-right>
                <i class="dripicons-plus"></i> Add User
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
              @on-selected-rows-change="selectionChanged()"
              :select-options="{ enabled: true, selectOnCheckboxOnly: true, }"
              compactMode
              :rows="rows"
              :pagination-options="{
                enabled: true
              }"
              >
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

    <b-sidebar id="sidebar-right" width="500px" title="New User" right shadow>
      <div class="px-3 py-2">
        <b-form ref="createUserForm" autocomplete="off">
          <b-row>
            <b-col>
              <b-form-group
                label="Firstname"
                label-for="firstname"
              >
                <b-form-input
                  id="firstname"
                  v-model="$v.form.firstName.$model"
                  type="text"
                  placeholder="First Name"
                  aria-describedby="firstname-feedback"
                  :state="validateState('firstName')"
                   autocomplete="off"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.firstName.required">
                  Firstname is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.firstName.minLength">
                  Firstname must have at least {{$v.form.firstName.$params.minLength.min}} letters.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Lastname"
                label-for="lastname"
              >
                <b-form-input
                  v-model="$v.form.lastName.$model"
                  type="text"
                  placeholder="Last Name"
                  :state="validateState('lastName')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.lastName.required">
                  Lastname is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.lastName.minLength">
                  Lastname must have at least {{$v.form.lastName.$params.minLength.min}} letters.
                </b-form-invalid-feedback>
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
              v-model="$v.form.email.$model"
              type="email"
              placeholder="Enter email"
              :state="validateState('email')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.email.required">
              Email is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.email.email">
              Email is invalid
            </b-form-invalid-feedback>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                label="Phone Number"
                label-for="phone"
              >
                <b-form-input
                  id="phone"
                  v-model="$v.form.phoneNumber.$model"
                  type="text"
                  placeholder="Phone Number"
                  :state="validateState('phoneNumber')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.phoneNumber.required">
                  Phone number is required
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
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
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  v-model="$v.form.password.$model"
                  type="password"
                  placeholder="Password"
                  :state="validateState('password')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.password.required">
                  Password is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.password.minLength">
                  Password must have at least {{$v.form.password.$params.minLength.min}} characters
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
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

          <b-card no-body class="mb-5">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="outline-secondary">
                Setup Extra Permissions
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>

                  <b-row v-for="(permission, i) in permissions" :key="i">
                    <b-col cols="12">
                      <h6 class="text-muted">
                        {{ permission.title }}
                      </h6>
                      <h6 class="small">{{ permission.desc }}</h6>
                    </b-col>
                    <b-col v-for="(action, i) in permission.actions" :key="i" cols="6">
                      <b-form-checkbox value="active">{{ action }}</b-form-checkbox>
                    </b-col>
                  </b-row>

                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-button v-if="!isLoading" type="submit" variant="primary" :disabled="$v.form.$invalid"
           @click.prevent="submitForm()">Submit</b-button>
          <b-button v-else variant="primary" disabled>
            <i class="fas fa-circle-notch fa-spin"></i>
          </b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-sidebar>

    <b-sidebar id="import-users" width="300px" title="Import Users" right shadow>
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
                Import a list of users into the system with excel
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
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default Vue.extend({
  mixins: [validationMixin],
  mounted() {
  },
  data() {
    return {
      isLoading: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
      },
      foods: [],
      roles: [
        { value: '', text: 'Please select an option' },
        { value: 'a', text: 'Admin' },
        { value: 'b', text: 'Accountant' },
        { value: 'c', text: 'Cashier' },
      ],
      permissions: [
        {
          title: 'Users',
          desc: 'Manage access to all company users',
          actions: [
            'Create',
            'View',
            'Delete',
            'Update',
          ],
        },
        {
          title: 'Marketing',
          desc: 'Company Analytics, service types management and referral programs',
          actions: [
            'Analytics',
            'Referal Programs',
            'View Orders & Revenue analytics',
          ],
        },
        {
          title: 'Finance and Accounting',
          desc: 'Access to company financial information - driver plan management, reports and billing',
          actions: [
            'Company Billing',
            'Reports',
            'Driver Plans Management',
            'Active Services Management',
          ],
        },
      ],
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: '20%',
        },
        {
          label: 'Phone Number',
          field: 'phone',
        },
        {
          label: 'Email',
          field: 'email',
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
          name: 'John Ayobami',
          phone: '080123456789',
          email: 'onyenekechristian@gmail.com',
          status: 'active',
        },
        {
          name: 'John Ayobami',
          phone: '080123456789',
          email: 'onyenekechristian@gmail.com',
          status: 'active',
        },
      ],
    };
  },
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(4),
      },
      lastName: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      phoneNumber: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    async submitForm() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.isLoading = true;
      await this.$store
        .dispatch('register', this.form)
        .then(() => {
          this.isLoading = false;
          Object.keys(this.form).forEach((key) => {
            this.form[key] = '';
          });
          this.$v.form.$reset(); // = false;
          this.$swal('Success', 'User was successfully added!', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal('Error', 'An error occured!', 'error');
          this.isLoading = false;
        });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    selectionChanged() {},
  },
});
</script>

<style scoped></style>

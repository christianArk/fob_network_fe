<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Users</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">All Users</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
            <div class="float-right">
              <b-button v-permission="'Can Create Users'"
              variant="primary" class="waves-effect waves-light" v-b-toggle.new-user>
                <i class="dripicons-plus"></i> New User
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12" v-if="!this.$laravel.hasPermission('Can View Users')">
          <div class="alert alert-danger">You are not authorized to view this information</div>
        </div>
        <div  v-else class="col-12">
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
                      <a class="dropdown-item" v-permission="'Can Update Users'" href="#"
                      @click.prevent="editUser(props.row.id)">Edit</a>
                      <!-- <div class="dropdown-divider"></div> -->
                      <!-- <a class="dropdown-item" href="#"
                      @click.prevent="editUser(props.row.id)">Change Password</a> -->
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

    <b-sidebar id="new-user" width="400px" title="Add New User" right shadow>
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
                  v-model="$v.form.firstname.$model"
                  type="text"
                  placeholder="First Name"
                  aria-describedby="firstname-feedback"
                  :state="validateState('firstname')"
                   autocomplete="off"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.firstname.required">
                  Firstname is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.firstname.minLength">
                  Firstname must have at least {{$v.form.firstname.$params.minLength.min}} letters.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Lastname"
                label-for="lastname"
              >
                <b-form-input
                  v-model="$v.form.lastname.$model"
                  type="text"
                  placeholder="Last Name"
                  :state="validateState('lastname')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.lastname.required">
                  Lastname is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.lastname.minLength">
                  Lastname must have at least {{$v.form.lastname.$params.minLength.min}} letters.
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

          <b-form-group
            id="input-group-1"
            label="Username"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="$v.form.name.$model"
              type="email"
              placeholder="Enter username"
              :state="validateState('name')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.name.required">
              Username is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.name.minLength">
                  Username must have at least {{$v.form.name.$params.minLength.min}} letters.
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
                  v-model="$v.form.phone.$model"
                  type="text"
                  placeholder="Phone Number"
                  :state="validateState('phone')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.phone.required">
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
                  multiple
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

          <b-form-group id="input-group-4">
              <b-form-checkbox v-model="form.status" value="active"
              unchecked-value="inactive">Enable</b-form-checkbox>
          </b-form-group>

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
    id="edit-user" width="400px" title="Edit User" right shadow>
      <div class="px-3 py-2">
        <b-form ref="editUserForm" autocomplete="off">
          <b-row>
            <b-col>
              <b-form-group
                label="Firstname"
                label-for="firstname"
              >
                <b-form-input
                  id="firstname"
                  v-model="$v.editForm.firstname.$model"
                  type="text"
                  placeholder="First Name"
                  aria-describedby="firstname-feedback"
                  :state="validateState('firstname')"
                   autocomplete="off"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.editForm.firstname.required">
                  Firstname is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.editForm.firstname.minLength">
                  Firstname must have at least
                  {{$v.editForm.firstname.$params.minLength.min}} letters.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Lastname"
                label-for="lastname"
              >
                <b-form-input
                  v-model="$v.editForm.lastname.$model"
                  type="text"
                  placeholder="Last Name"
                  :state="validateState('lastname')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.editForm.lastname.required">
                  Lastname is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.editForm.lastname.minLength">
                  Lastname must have at least
                  {{$v.editForm.lastname.$params.minLength.min}} letters.
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
              v-model="$v.editForm.email.$model"
              type="email"
              placeholder="Enter email"
              :state="validateState('email')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.editForm.email.required">
              Email is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.editForm.email.email">
              Email is invalid
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Username"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="$v.editForm.name.$model"
              type="email"
              placeholder="Enter username"
              :state="validateState('name')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.editForm.name.required">
              Username is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.editForm.name.minLength">
                  Username must have at least {{$v.editForm.name.$params.minLength.min}} letters.
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
                  v-model="$v.editForm.phone.$model"
                  type="text"
                  placeholder="Phone Number"
                  :state="validateState('phone')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.editForm.phone.required">
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
                  v-model="editForm.role"
                  multiple
                  :options="roles"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group id="input-group-4">
              <b-form-checkbox v-model="editForm.status" value="active"
              unchecked-value="inactive">Enable</b-form-checkbox>
          </b-form-group>

          <b-button v-if="!isLoading" type="submit" variant="primary"
          :disabled="$v.editForm.$invalid"
           @click.prevent="updateUser()">Submit</b-button>
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
  required, minLength, email,
} from 'vuelidate/lib/validators';

export default Vue.extend({
  mixins: [validationMixin],
  mounted() {
    this.getUsers();
    this.getRoles();
  },
  data() {
    return {
      showEditForm: false,
      tableLoading: false,
      isLoading: false,
      filter: {
        performed_by: null,
      },
      form: {
        firstname: '',
        lastname: '',
        email: '',
        name: '',
        phone: '',
        password: '',
        role: [],
        status: 'active',
      },
      editForm: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        name: '',
        phone: '',
        role: [],
        status: '',
      },
      roles: [
        { value: '', text: 'Please select an option' },
      ],
      columns: [
        {
          label: 'Fullname',
          field: 'name',
          width: '20%',
        },
        {
          label: 'Phone',
          field: 'phone',
          width: '20%',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Roles',
          field: 'roles',
        },
        {
          label: 'Status',
          field: 'status',
          width: '10%',
        },
        {
          label: 'Date Added',
          field: 'date',
          width: '20%',
        },
        {
          label: 'Actions',
          field: 'actions',
          width: '5%',
        },
      ],
      rows: [],
    };
  },
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(4),
      },
      lastname: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      name: {
        required,
        minLength: minLength(4),
      },
      phone: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
    editForm: {
      firstname: {
        required,
        minLength: minLength(4),
      },
      lastname: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      name: {
        required,
        minLength: minLength(4),
      },
      phone: {
        required,
      },
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
    async editUser(id) {
      await this.getUser(id);
      delete this.form.password;
      this.showEditForm = true;
    },
    async getUser(id) {
      await this.$store
        .dispatch('getUser', id)
        .then((res) => {
          const roles = [];
          this.editForm = res.data;
          res.data.roles.forEach((el) => {
            roles.push(el.id);
          });
          this.editForm.role = roles;
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving user!', 'error');
        });
    },
    async getUsers() {
      this.rows = [];
      this.tableLoading = true;
      await this.$store
        .dispatch('getUsers')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              name: `${el.firstname} ${el.lastname}`,
              phone: el.phone,
              email: el.email,
              status: el.status,
              roles: el.role_names.join(','),
              date: this.$moment(el.created_at).format('MMMM Do YYYY'),
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
    async getRoles() {
      await this.$store
        .dispatch('getRoles')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              text: `${el.name}`,
              value: el.id,
            };
            this.roles.push(obj);
          });
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving roles!', 'error');
        });
    },
    async submitForm() {
      const app = this;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.isLoading = true;
      this.form.password_confirmation = this.form.password;
      await this.$store
        .dispatch('createUser', this.form)
        .then(() => {
          this.isLoading = false;
          Object.keys(this.form).forEach((key) => {
            this.form[key] = '';
          });
          this.$v.form.$reset(); // = false;
          app.getUsers();
          this.$swal('Success', 'User was successfully added!', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal('Error', 'An error occured!', 'error');
          this.isLoading = false;
        });
    },
    async updateUser() {
      const app = this;
      this.$v.editForm.$touch();
      if (this.$v.editForm.$anyError) {
        return;
      }
      this.isLoading = true;
      await this.$store
        .dispatch('updateUser', { id: this.editForm.id, payload: this.editForm })
        .then(() => {
          this.isLoading = false;
          Object.keys(this.editForm).forEach((key) => {
            this.editForm[key] = '';
          });
          this.$v.editForm.$reset(); // = false;
          this.showEditForm = false;
          app.getUsers();
          this.$swal('Success', 'User was successfully updated!', 'success');
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
    validateEditState(name) {
      const { $dirty, $error } = this.$v.editForm[name];
      return $dirty ? !$error : null;
    },
    selectionChanged() {},
  },
});
</script>

<style scoped></style>

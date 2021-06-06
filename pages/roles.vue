<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Roles</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">All Roles</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
            <div class="float-right">
              <b-button variant="primary"
              v-permission="'Can Manage Roles'"
              class="waves-effect waves-light" v-b-toggle.new-role>
                <i class="dripicons-plus"></i> New Role
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12" v-if="!this.$laravel.hasPermission('Can Manage Roles')">
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
                <span v-if="props.column.field == 'actions'">
                  <button class="btn btn-light btn-sm dropdown-toggle"
                  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="dripicons-gear"></i>
                  </button>
                  <div class="dropdown-menu" x-placement="bottom-start"
                  style="position: absolute; transform: translate3d(0px, 35px, 0px); top: 0px;
                   left: 0px; will-change: transform;">
                      <a class="dropdown-item" href="#"
                      @click.prevent="editRole(props.row.id)">Edit</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#"
                      @click.prevent="confirmRole(props.row.id)">Delete</a>
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

    <b-sidebar id="new-role" width="500px" title="Add New Role" right shadow>
      <div class="px-3 py-2">
        <b-form ref="createRoleForm" autocomplete="off">
          <b-row>
            <b-col>
              <b-form-group
                label="Role Name"
                label-for="role"
              >
                <b-form-input
                  id="role"
                  v-model="$v.form.role_name.$model"
                  type="text"
                  placeholder="Role Name"
                  aria-describedby="role-feedback"
                  :state="validateState('role_name')"
                   autocomplete="off"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.role_name.required">
                  Role Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.role_name.minLength">
                  Role Name must have at least {{$v.form.role_name.$params.minLength.min}} letters.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-card no-body class="mb-5">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="outline-secondary">
                    Sync Permissions To Role
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-card-text>

                      <b-row>
                        <b-col cols="12">
                          <b-form-checkbox-group
                            v-model="form.permissions"
                            :options="permissions"
                            switches
                          ></b-form-checkbox-group>
                        </b-col>
                      </b-row>

                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>
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

    <b-sidebar id="edit-role" width="500px" title="Edit Role" v-model="showEditForm"
    @hidden="resetForm()" right shadow>
      <div class="px-3 py-2">
        <b-form ref="editRoleForm" autocomplete="off">
          <b-row>
            <b-col>
              <b-form-group
                label="Role Name"
                label-for="role"
              >
                <b-form-input
                  id="role"
                  v-model="$v.form.role_name.$model"
                  type="text"
                  placeholder="Role Name"
                  aria-describedby="role-feedback"
                  :state="validateState('role_name')"
                   autocomplete="off"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.role_name.required">
                  Role Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.role_name.minLength">
                  Role Name must have at least {{$v.form.role_name.$params.minLength.min}} letters.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-card no-body class="mb-5">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="outline-secondary">
                    Sync Permissions To Role
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-card-text>

                      <b-row>
                        <b-col cols="12">
                          <b-form-checkbox-group
                            v-model="form.permissions"
                            :options="permissions"
                            switches
                          ></b-form-checkbox-group>
                        </b-col>
                      </b-row>

                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </b-col>
          </b-row>

          <b-button v-if="!isLoading" type="submit" variant="primary" :disabled="$v.form.$invalid"
           @click.prevent="updateRole()">Submit</b-button>
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
import { required, minLength } from 'vuelidate/lib/validators';

export default Vue.extend({
  mixins: [validationMixin],
  mounted() {
    this.getRoles();
    this.getPermissions();
  },
  data() {
    return {
      tableLoading: false,
      isLoading: false,
      filter: {
        performed_by: null,
      },
      role: {},
      showEditForm: false,
      form: {
        role_name: '',
        permissions: [],
      },
      permissions: [],
      columns: [
        {
          label: 'Role',
          field: 'role',
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
      role_name: {
        required,
        minLength: minLength(4),
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
    async editRole(id) {
      await this.getRole(id);
      this.showEditForm = true;
    },
    async getRole(id) {
      this.form.permissions = [];
      await this.$store
        .dispatch('getRole', id)
        .then((res) => {
          this.role = res.data;
          this.form.role_name = this.role.name;
          this.role.permissions.forEach((perm) => {
            this.form.permissions.push(perm.id);
          });
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving roles!', 'error');
        });
    },
    async getRoles() {
      this.rows = [];
      await this.$store
        .dispatch('getRoles')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              role: `${el.name}`,
              date: this.$moment(el.created_at).format('MMMM Do YYYY'),
              id: el.id,
            };
            this.rows.push(obj);
          });
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving roles!', 'error');
        });
    },
    async getPermissions() {
      await this.$store
        .dispatch('getPermissions')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              text: `${el.name}`,
              value: el.id,
            };
            this.permissions.push(obj);
          });
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving permissions!', 'error');
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
        .dispatch('createRole', this.form)
        .then(() => {
          this.isLoading = false;
          Object.keys(this.form).forEach((key) => {
            this.form[key] = '';
          });
          this.$v.form.$reset(); // = false;
          app.getRoles();
          this.$swal('Success', 'Role was successfully added!', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal('Error', 'An error occured!', 'error');
          this.isLoading = false;
        });
    },
    async updateRole() {
      const app = this;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.isLoading = true;
      await this.$store
        .dispatch('updateRole', { id: this.role.id, payload: this.form })
        .then(() => {
          this.isLoading = false;
          this.showEditForm = false;
          Object.keys(this.form).forEach((key) => {
            this.form[key] = '';
          });
          this.$v.form.$reset(); // = false;
          app.getRoles();
          this.$swal('Success', 'Role was successfully updated!', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal('Error', 'An error occured!', 'error');
          this.isLoading = false;
        });
    },
    async confirmRole(id) {
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
          app.deleteRole(id);
        } else {
          app.$swal('Cancelled', 'Your role is safe :)', 'error');
        }
      });
    },
    async deleteRole(id) {
      await this.$store
        .dispatch('deleteRole', id)
        .then(() => {
          this.$swal('Success', 'Role was successfully deleted!', 'success');
          this.getRoles();
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while deleting role!', 'error');
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

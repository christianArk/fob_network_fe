<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="page-title-box">
              <h4 class="page-title">Locations</h4>
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">Locatons</li>
              </ol>
            </div>
          </div>
          <div class="col-md-4">
            <div class="float-right">
              <b-button variant="primary" class="waves-effect waves-light" v-b-toggle.filter-log>
                <i class="dripicons-plus"></i> Add new
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="alert alert-info">This page is in progress</div>
        </div>
      </div>
      <!-- end row -->
    </div>

    <b-sidebar id="filter-log" width="300px" title="Filter Log" right shadow>
      <div class="px-3 py-2">
        <b-form>
          <b-row class="mb-5 mt-5">
            <b-col cols="12">
              <b-form-select v-model="filter.performed_by" :options="users"></b-form-select>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary">Search</b-button>
        </b-form>
      </div>
    </b-sidebar>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';

export default Vue.extend({
  mixins: [validationMixin],
  mounted() {
    this.getActivities();
    this.getUsers();
  },
  data() {
    return {
      isLoading: false,
      filter: {
        performed_by: null,
      },
      users: [
        {
          value: null,
          text: 'Filter By',
        },
      ],
      columns: [
        {
          label: 'Performed By',
          field: 'name',
          width: '20%',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Created At',
          field: 'date',
        },
      ],
      activities: [],
    };
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
    async getActivities() {
      await this.$store
        .dispatch('getActivities')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              name: `${el.causer.firstname} ${el.causer.lastname}`,
              description: el.description,
              date: this.$moment(el.created_at).format('MMMM Do YYYY, h:mm:ss a'),
            };
            this.activities.push(obj);
          });
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving log!', 'error');
        });
    },
    async getUsers() {
      await this.$store
        .dispatch('getUsers')
        .then((res) => {
          res.data.forEach((el) => {
            const obj = {
              value: el.id,
              text: `${el.firstname} ${el.lastname}`,
            };
            this.users = [...this.users, obj];
          });
        })
        .catch(() => {
          this.$swal('Error', 'An error occured while retreiving log!', 'error');
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

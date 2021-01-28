<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu">
          <li class="menu-title">Menu</li>
          <li>
            <nuxt-link to="/"
              ><i class="dripicons-meter"></i> Dashboard</nuxt-link
            >
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect has-arrow"
              ><i class="dripicons-graph-pie"></i><span> Analytics </span></a
            >
            <ul class="submenu">
              <li>
                <nuxt-link to="/analytics/total-revenue"
                  >Total Revenue</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/payment-methods"
                  >Payment Methods</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/order-statuses"
                  >Order Statuses</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/assigned-missed"
                  >Assigned / Missed</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/median-response"
                  >Median Response</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/response-waiting"
                  >Response / Waiting</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/booking-sources"
                  >Booking Sources</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/analytics/referal-coupons"
                  >Referal Coupons</nuxt-link
                >
              </li>
            </ul>
          </li>

          <li>
            <nuxt-link to="/reports"
              ><i class="dripicons-graph-bar"></i
              ><span>Reports</span></nuxt-link
            >
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect has-arrow"
              ><i class="dripicons-home"></i><span>Manage Company</span></a
            >
            <ul class="submenu">
              <li><nuxt-link to="/company/drivers">Drivers</nuxt-link></li>
              <li><nuxt-link to="/company/users">Users</nuxt-link></li>
              <li><nuxt-link to="/company/operators">Operators</nuxt-link></li>
              <li>
                <nuxt-link to="/company/driver-plans">Driver Plans</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/company/service-types">Service Types</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/company/merchant-account"
                  >Merchant Account</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/company/applications-services"
                  >Applications & Services</nuxt-link
                >
              </li>
            </ul>
          </li>

          <li class="menu-title">Components</li>

          <li>
            <a href="javascript:void(0);" class="waves-effect has-arrow"
              ><i class="dripicons-jewel"></i><span> Promotions</span></a
            >
            <ul class="submenu">
              <li><nuxt-link to="/promotions">Promotions</nuxt-link></li>
            </ul>
          </li>

          <li>
            <nuxt-link to="/settings"
              ><i class="dripicons-gear"></i
              ><span> Company Settings </span></nuxt-link
            >
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect has-arrow"
              ><i class="dripicons-document"></i><span> Billing </span></a
            >
            <ul class="submenu">
              <li><a href="email-inbox.html">Plan & Balance</a></li>
              <li><a href="email-read.html">Billing Details</a></li>
              <li><a href="email-compose.html">Billing History</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
      <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>

<template>
  <div>
    {{ title }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '../models/User.ts';

export default Vue.extend({
  name: 'Header',

  data() {
    return {
      title: 'My Header File',
      user: {} as User,
    };
  },

  computed: {
    fullname(): string {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
  },
});
</script>

<style scoped></style>

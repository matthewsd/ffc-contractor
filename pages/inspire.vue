<template>
  <v-layout>
    <pre>{{ users }}</pre>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'inspire',
    computed: mapState(['users']),
    mounted: function () {
      this.$store.dispatch('GET_USERS')
    }
  }
</script>
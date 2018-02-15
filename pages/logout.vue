<template>
    <h1>Logging out...</h1>
</template>

<script>
  export default {
    name: 'logout',
    async mounted () {
      this.$auth.logout()
      // this.$store.dispatch('GET_NAVIGATION')
      this.$store.commit('SET_NAVIGATION', [
        {icon: 'security', title: 'Login', to: '/login'},
        {icon: 'help', title: 'Help', to: '/help'}
      ])
      this.$store.commit('SET_SECTORS_SORTED', {})
      this.$store.dispatch('RESET_EVERYTHING')
    }
  }
</script>

<style scoped>

</style>
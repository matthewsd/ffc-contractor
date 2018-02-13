<template>
    <h1>Logging out...</h1>
</template>

<script>
  export default {
    name: 'logout',
    async mounted () {
      this.$auth.logout()
      this.$store.dispatch('GET_NAVIGATION')
    }
  }
</script>

<style scoped>

</style>
<template>
    <div>Nav</div>
</template>
<script>
  import ProgressIndicator from '~/components/progress-indicator.vue'
  export default {
    components: { ProgressIndicator },
    name: 'navigation',
    props: {
      navItems: {}
    }
  }
</script>

<style scoped>
</style>
<template>
    <div>
        <ul>
            <li v-for="help in helps">
                {{ help.title }}
            </li>
        </ul>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'help',
    computed: mapState(['helps']),
    mounted: function () {
      this.$store.dispatch('GET_HELPS')
    }
  }
</script>

<style scoped>

</style>
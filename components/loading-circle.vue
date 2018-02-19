<template>
    <v-layout
            justify-center
            align-center>
        <div style="text-align:center;">
            <v-progress-circular indeterminate v-bind:size="300" v-bind:width="2" color="orange">Loading...</v-progress-circular>
        </div>
    </v-layout>
</template>

<script>
  export default {
    name: 'loading-circle'
  }
</script>

<style scoped>

</style>
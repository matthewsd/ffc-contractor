<template>
    <v-progress-circular light
                         v-bind:value="(!sector.isApproved) ? sector.progress : 100"
                         v-bind:size="35"
                         v-bind:color="sector.isApproved ? 'light-blue darken-3' : progressColour(sector.progress)">
        <small v-if="sector.progress < 100 && !sector.isApproved">{{ sector.progress }}%</small>
        <v-icon v-if="sector.progress === 100 && !sector.isApproved" color="green darken-3">done</v-icon>
        <v-icon v-if="sector.isApproved" color="light-blue darken-3">done_all</v-icon>
    </v-progress-circular>
</template>

<script>
  export default {
    props: {
      sector: { type: Object }
    },
    methods: {
      progressColour: function (progress) {
        switch (true) {
          case (progress < 1):
            return 'grey darken-2'
          case (progress > 0 && progress <= 10):
            return 'red darken-3'
          case (progress > 10 && progress <= 20):
            return 'deep-orange'
          case (progress > 20 && progress <= 30):
            return 'orange darken-2'
          case (progress > 30 && progress <= 40):
            return 'orange'
          case (progress > 40 && progress <= 50):
            return 'amber'
          case (progress > 50 && progress <= 60):
            return 'yellow darken-1'
          case (progress > 60 && progress <= 70):
            return 'lime'
          case (progress > 70 && progress <= 80):
            return 'light-green'
          case (progress > 80 && progress <= 90):
            return 'green'
          case (progress > 90):
            return 'green darken-4'
        }
      }
    }
  }
</script>
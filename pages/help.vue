<template>
    <v-container grid-list-md>
        <v-layout
                justify-center
                align-center v-if="!loaded">
            <div style="text-align:center;">
                <v-progress-circular indeterminate v-bind:size="300" v-bind:width="2" color="orange">Loading...</v-progress-circular>
            </div>
        </v-layout>
        <v-layout column align-center v-else-if="loaded">
            <v-flex xs12 sm12 md12 style="width:100%;">
                <v-card  xs12 sm12 md10 tile color="deep-orange darken-4">
                    <v-toolbar color="deep-orange darken-4" dark>
                        <v-icon>help</v-icon>
                        <v-toolbar-title>Need a little help?</v-toolbar-title>
                    </v-toolbar>
                    <v-expansion-panel>
                        <v-expansion-panel-content v-for="(help,i) in helps" :key="i">
                            <div slot="header">{{help.title}}</div>
                            <v-card>
                                <v-card-text class="grey lighten-4" >
                                    <div v-html="help.content"></div>
                                    <external-link :to="help.url" :department="help.department">{{ help.message }}</external-link>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import ExternalLink from '~/components/external-link.vue'

  export default {
    name: 'help',
    data: () => {
      return {
        loaded: true
      }
    },
    components: { ExternalLink },
    computed: mapState(['helps']),
    mounted: function () {
      this.$store.dispatch('GET_HELPS')
    }
  }
</script>

<style scoped>

</style>
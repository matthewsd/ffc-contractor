<template>
    <v-container grid-list-md>
        <loading-circle v-if="!loaded"/>
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
  import ExternalLink from '~/components/external-link'
  import LoadingCircle from '~/components/loading-circle'

  export default {
    name: 'help',
    data: () => {
      return {
        loaded: false
      }
    },
    components: { ExternalLink, LoadingCircle },
    computed: mapState(['helps']),
    mounted: async function () {
      await this.$store.dispatch('GET_HELPS')
      this.loaded = true
    }
  }
</script>

<style scoped>

</style>
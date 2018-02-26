<template>
    <loading-circle v-if="!loaded"/>
    <div v-else>
        <v-toolbar dark color="deep-orange darken-4">
            <v-toolbar-title class="white--text">Shared Files</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Files shared with you.</h3>
                    <div><strong>{{ $auth.state.user.client.name }}</strong> has shared the following files with you.
                        These documents generally contain information your client feels will assit you in your tasks.</div>
                </div>
            </v-card-title>
            <v-container
                    fluid
                    style="min-height: 0;"
                    grid-list-lg
            >
                <v-layout row wrap>
                    <v-flex xs12 sm4 md3 lg3 xl2 v-for="file in files" :key="file.id">
                        <v-card color="deep-orange darken-1" class="white--text">
                            <v-card-title primary-title>
                                <div>{{ file.name }}</div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn block dark color="green darken-1"
                                      target="_blank" :href="'https://portal.solutionhost.co.uk/apps/storagefiles/' + $auth.state.user.client.id +'/_shared/' + file.name"
                                >Download Now &nbsp;<v-icon>cloud_download</v-icon></v-btn>


                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import LoadingCircle from '~/components/loading-circle'

  export default {
    middleware: 'auth',
    async asyncData (context) {
      await context.store.dispatch('GET_FILES')
    },
    components: { LoadingCircle },
    computed: mapState(['files']),
    mounted: function () {
      this.loaded = true
    },
    name: 'files',
    data: () => {
      return {
        loaded: false
      }
    }
  }
</script>

<style scoped>

</style>
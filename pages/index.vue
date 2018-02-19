<template>
    <v-container grid-list-md>
        <v-toolbar color="deep-orange darken-4" dark>
            <v-icon>dashboard</v-icon>
            <v-toolbar-title>Dashboard</v-toolbar-title>
        </v-toolbar>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Welcome back {{ this.$auth.state.user.forename }}</h3>
                        <div>Below is a list of your current PQQ questionnaires for
                            {{ this.$auth.state.user.client.name }}, and their
                            completion status.<br>
                            If you need help at any point, please see the help documents for
                            guidance. or contact <strong>{{ this.$auth.state.user.client.name }}</strong> on
                            <strong>{{ this.$auth.state.user.client.email }}</strong>, or via email at
                            <strong>{{ this.$auth.state.user.client.phone }}</strong>
                        </div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
        <!--<h1>Dashboard</h1>-->
        <v-layout row wrap>
            <v-flex xs12 md8>
                <v-card v-if="!sectorsLoading">
                    <v-toolbar color="deep-orange darken-4" dark>
                        <v-icon>format_list_bulleted</v-icon>
                        <v-toolbar-title>Checklist</v-toolbar-title>
                    </v-toolbar>
                    <v-list three-line subheader v-if="sectorsSorted.incomplete.length > 0">
                        <v-subheader>Incomplete tasks and their current progress status</v-subheader>
                        <v-list-tile avatar v-for="sector in sectorsSorted.incomplete" v-bind:key="sector.id"
                                     :to="sector.toUrl" @click="">
                            <v-list-tile-avatar>
                                <ProgressIndicator :sector="sector" :sub=true></ProgressIndicator>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title> {{ sector.workSector ? sector.workSector.name : sector.typeName }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>Task incomplete and your current progress is <strong>{{
                                    sector.progress }}%</strong></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">edit</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <v-list three-line subheader v-if="sectorsSorted.complete.length > 0">
                        <v-subheader>Complete tasks awaiting approval</v-subheader>
                        <v-list-tile avatar v-for="sector in sectorsSorted.complete" v-bind:key="sector.id"
                                     :to="sector.toUrl" @click="">
                            <v-list-tile-avatar>
                                <ProgressIndicator :sector="sector"></ProgressIndicator>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ sector.workSector ? sector.workSector.name : sector.typeName }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <p>Task complete and awaiting approval</p>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">edit</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <v-list three-line subheader v-if="sectorsSorted.approved.length > 0">
                        <v-subheader>Complete and approved tasks</v-subheader>
                        <v-list-tile avatar v-for="sector in sectorsSorted.approved" v-bind:key="sector.id"
                                     :to="sector.toUrl" @click="">
                            <v-list-tile-avatar>
                                <ProgressIndicator :sector="sector"></ProgressIndicator>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ sector.workSector ? sector.workSector.name : sector.typeName }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <p>Task complete and approved by <strong>{{ sector.approvedBy.name }}</strong> {{ 'on ' +  moment(sector.approvedDate).format('MMM Do YYYY') }}</p>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">edit</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <v-footer></v-footer>
                </v-card>
                <v-card v-else>
                    <loading-circle/>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card>
                    <v-toolbar color="deep-orange darken-4" dark>
                        <v-badge right color="red">
                            <span slot="badge">{{ unreadNotes }}</span>
                            <v-icon>chat</v-icon>
                        </v-badge>
                        <v-toolbar-title>&nbsp;&nbsp;Inbox</v-toolbar-title>
                    </v-toolbar>
                    <v-list three-line v-if="notes.loaded">
                        <template v-for="note in notes.data">
                            <v-list-tile
                                    avatar
                                    ripple
                                    @click="setRead(note)"
                                    :key="note.id"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ note.subject }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ note.message }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ moment(note.createdAt).format('MMM Do YYYY') }}
                                    </v-list-tile-action-text>
                                    <v-icon
                                            color="blue darken-2"
                                            v-if="!note.read"
                                    >fiber_new
                                    </v-icon>
                                    <v-icon
                                            color="green darken-2"
                                            v-else
                                    >done
                                    </v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list>
                    <v-card-title v-if="!notes.loaded">
                        <loading-circle/>
                    </v-card-title>
                    <v-footer>
                        <v-card-text class="text-xs-center">
                            <small>(click an item to mark as read)</small>
                        </v-card-text>
                    </v-footer>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
  import {mapState} from 'vuex'
  import moment from 'moment'
  import ProgressIndicator from '~/components/progress-indicator.vue'
  import LoadingCircle from '~/components/loading-circle'

  export default {
    components: {
      ProgressIndicator,
      LoadingCircle
    },
    middleware: 'auth',
    name: 'index',
    computed: mapState(['notes', 'unreadNotes', 'sectorsSorted', 'sectorsLoading']),
    mounted: function () {
      this.$store.dispatch('GET_NOTES')
    },
    methods: {
      setRead (note) {
        if (note.read === false) {
          note.read = true
          this.$store.dispatch('MARK_NOTE_READ', note['@id'])
        }
      },
      moment: function (date) {
        return moment(date)
      }
    }
  }
</script>

<style scoped>

</style>
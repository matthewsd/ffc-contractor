<template>
    <v-container grid-list-md>
        <v-toolbar color="deep-orange darken-4" dark>
            <v-icon>dashboard</v-icon>
            <v-toolbar-title>Dashboard</v-toolbar-title>
        </v-toolbar>
        <v-flex xs12>
            <v-card>
                <v-card-text>
                    <h3>Welcome back
                        <!--{{ this.$store.state.user.forename }},-->
                    </h3>
                    <p>Below is a list of your current PQQ questionnaires for
                        <!--{{ this.$store.state.user.client.name }}-->,
                        and their completion status.
                        If you need help at any point, please see the
                        <nuxt-link to="/help">help documents for guidance.</nuxt-link>
                        or contact
                        <!--<strong>{{ this.$store.state.user.client.name }}</strong> on-->
                        <!--<strong>{{ this.$store.state.user.client.phone }}</strong>, or via email at-->
                        <!--<strong>{{ this.$store.state.user.client.email }}</strong>-->
                    </p>
                </v-card-text>
            </v-card>
        </v-flex>
        <!--<h1>Dashboard</h1>-->
        <v-layout row wrap>
            <v-flex xs12 md8>
                <v-card>
                    <v-toolbar color="deep-orange darken-4" dark>
                        <v-icon>format_list_bulleted</v-icon>
                        <v-toolbar-title>Checklist</v-toolbar-title>
                    </v-toolbar>
                    <!--<v-list three-line subheader v-if="sectorStatuses.incomplete.length > 0">-->
                        <!--<v-subheader>Incomplete tasks and their current progress status</v-subheader>-->
                        <!--<v-list-tile avatar v-for="sector in sectorStatuses.incomplete" v-bind:key="sector.id"-->
                                     <!--:to="sector.toUrl" @click="">-->
                            <!--<v-list-tile-avatar>-->
                                <!--<ProgressIndicator :sector="sector" :sub=true></ProgressIndicator>-->
                            <!--</v-list-tile-avatar>-->
                            <!--<v-list-tile-content>-->
                                <!--<v-list-tile-title> {{ sector.workSector ? sector.workSector.name : sector.typeName }}-->
                                <!--</v-list-tile-title>-->
                                <!--<v-list-tile-sub-title>Task incomplete and your current progress is <strong>{{-->
                                    <!--sector.progress }}%</strong></v-list-tile-sub-title>-->
                            <!--</v-list-tile-content>-->
                            <!--<v-list-tile-action>-->
                                <!--<v-btn icon ripple>-->
                                    <!--<v-icon color="grey lighten-1">edit</v-icon>-->
                                <!--</v-btn>-->
                            <!--</v-list-tile-action>-->
                        <!--</v-list-tile>-->
                    <!--</v-list>-->
                    <!--<v-list three-line subheader v-if="sectorStatuses.complete.length > 0">-->
                        <!--<v-subheader>Complete tasks awaiting approval</v-subheader>-->
                        <!--<v-list-tile avatar v-for="sector in sectorStatuses.complete" v-bind:key="sector.id"-->
                                     <!--:to="sector.toUrl" @click="">-->
                            <!--<v-list-tile-avatar>-->
                                <!--<ProgressIndicator :sector="sector"></ProgressIndicator>-->
                            <!--</v-list-tile-avatar>-->
                            <!--<v-list-tile-content>-->
                                <!--<v-list-tile-title>{{ sector.workSector ? sector.workSector.name : sector.typeName }}-->
                                <!--</v-list-tile-title>-->
                                <!--<v-list-tile-sub-title>-->
                                    <!--<p>Task complete and awaiting approval</p>-->
                                <!--</v-list-tile-sub-title>-->
                            <!--</v-list-tile-content>-->
                            <!--<v-list-tile-action>-->
                                <!--<v-btn icon ripple>-->
                                    <!--<v-icon color="grey lighten-1">edit</v-icon>-->
                                <!--</v-btn>-->
                            <!--</v-list-tile-action>-->
                        <!--</v-list-tile>-->
                    <!--</v-list>-->
                    <!--<v-list three-line subheader v-if="sectorStatuses.approved.length > 0">-->
                        <!--<v-subheader>Complete and approved tasks</v-subheader>-->
                        <!--<v-list-tile avatar v-for="sector in sectorStatuses.approved" v-bind:key="sector.id"-->
                                     <!--:to="sector.toUrl" @click="">-->
                            <!--<v-list-tile-avatar>-->
                                <!--<ProgressIndicator :sector="sector"></ProgressIndicator>-->
                            <!--</v-list-tile-avatar>-->
                            <!--<v-list-tile-content>-->
                                <!--<v-list-tile-title>{{ sector.workSector ? sector.workSector.name : sector.typeName }}-->
                                <!--</v-list-tile-title>-->
                                <!--<v-list-tile-sub-title>-->
                                    <!--<p>Task complete and approved by <strong>{{ sector.approvedBy.name }}</strong> {{-->
                                        <!--(sector.approvedDate) ? 'on ' + formatDateTime(sector.approvedDate):''}}</p>-->
                                <!--</v-list-tile-sub-title>-->
                            <!--</v-list-tile-content>-->
                            <!--<v-list-tile-action>-->
                                <!--<v-btn icon ripple>-->
                                    <!--<v-icon color="grey lighten-1">edit</v-icon>-->
                                <!--</v-btn>-->
                            <!--</v-list-tile-action>-->
                        <!--</v-list-tile>-->
                    <!--</v-list>-->
                    <v-footer></v-footer>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card>
                    <v-toolbar color="deep-orange darken-4" dark>
                        <v-badge right color="red">
                            <span slot="badge">{{ countUnread() }}</span>
                            <v-icon>chat</v-icon>
                        </v-badge>
                        <v-toolbar-title>&nbsp;&nbsp;Inbox</v-toolbar-title>
                    </v-toolbar>
                    <v-list three-line>
                        <!--<template v-for="item in notes">-->
                            <!--<v-list-tile-->
                                    <!--avatar-->
                                    <!--ripple-->
                                    <!--@click="toggle(item)"-->
                                    <!--:key="item.id"-->
                            <!--&gt;-->
                                <!--<v-list-tile-content>-->
                                    <!--<v-list-tile-title>{{ item.subject }}</v-list-tile-title>-->
                                    <!--<v-list-tile-sub-title>{{ item.message }}</v-list-tile-sub-title>-->
                                <!--</v-list-tile-content>-->
                                <!--<v-list-tile-action>-->
                                    <!--<v-list-tile-action-text>{{ formatDateTime(item.createdAt) }}-->
                                    <!--</v-list-tile-action-text>-->
                                    <!--<v-icon-->
                                            <!--color="blue darken-2"-->
                                            <!--v-if="item.read == false"-->
                                    <!--&gt;fiber_new-->
                                    <!--</v-icon>-->

                                    <!--<v-icon-->
                                            <!--color="green darken-2"-->
                                            <!--v-else-->
                                    <!--&gt;done-->
                                    <!--</v-icon>-->
                                <!--</v-list-tile-action>-->
                            <!--</v-list-tile>-->
                        <!--</template>-->
                    </v-list>
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
  export default {
    middleware: 'auth',
    name: 'index',
    methods: {
      countUnread () {
        return 1
      }
    }
  }
</script>

<style scoped>

</style>
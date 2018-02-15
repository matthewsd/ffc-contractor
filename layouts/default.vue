<style>
    .title {
        height: 100%;
        margin-top: -10px;
    }
</style>

<template>
    <v-app>
        <v-navigation-drawer
                :mini-variant.sync="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                fixed
                app
                light
        >
            <v-list>
                <v-list-tile-title class="title orange darken-3 elevation-8">
                    <img src="~/static/FFC-Logo.svg" alt="no image" width="100%">
                </v-list-tile-title>
                <template v-for="item in navigation">
                    <v-list-group v-if="item.children" v-model="item.model" no-action>
                        <v-list-tile slot="item" @click="">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.title }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon>keyboard_arrow_down</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <template v-for="(children, ci) in item.children">
                            <v-list-tile
                                    v-for="(child, i) in children"
                                    :to="child.toUrl"
                                    :key="ci + i"
                                    @click=""
                            >
                                <v-list-tile-action v-if="child.progress >= 0">
                                    <ProgressIndicator :sector="child"></ProgressIndicator>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ child.workSector ? child.workSector.name : child.typeName }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list-group>
                    <v-list-tile v-else :key="item.to" exact :to="item.to" @click="">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.title }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark fixed app :clipped-left="clipped" class="orange darken-2">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant"
            >
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-toolbar-title>{{ this.$auth.state.user ? this.$auth.state.user.client.name : 'First for Contractors' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="this.$auth.state.user" class="d-flex align-center" style="margin-left: auto">
                <v-tooltip left>
                    <v-btn icon :href="'tel:' + this.$auth.state.user.client.phone" slot="activator">
                        <v-icon>phone</v-icon>
                    </v-btn>
                    <span>Contact {{ this.$auth.state.user.client.name }} on <strong>{{ this.$auth.state.user.client.phone }}</strong></span>
                </v-tooltip>
                <v-tooltip left>
                    <v-btn icon :href="'mailto:' + this.$auth.state.user.client.email +'?subject=I need help with FFC'"
                           slot="activator">
                        <v-icon>mail</v-icon>
                    </v-btn>
                    <span>Email {{ this.$auth.state.user.client.name }} on <strong>{{ this.$auth.state.user.client.email }}</strong></span>
                </v-tooltip>
            </div>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer :fixed="fixed" app class="orange darken-1">
            <span dark style="color:white;">Solution Host &copy; {{ moment().format('YYYY') }}</span>
        </v-footer>
        <v-snackbar
                :color="alert.colour"
                v-if="alert.active"
                :timeout="5000"
                top
                v-model="alert.active"
        >
            {{ alert.message }}
            <v-btn color="green" dark @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
  import {mapState} from 'vuex'
  import moment from 'moment'
  import ProgressIndicator from '~/components/progress-indicator.vue'

  export default {
    components: {
      ProgressIndicator
    },
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    computed: mapState(['navigation', 'alert']),
    mounted: function () {
      this.$store.dispatch('GET_NAVIGATION')
      if (this.$auth.state.user) {
        this.$store.dispatch('GET_CONTRACTOR')
        this.$store.dispatch('GET_EMPLOYEE')
      }
    },
    methods: {
      moment: function () {
        return moment()
      }
    }
  }
</script>

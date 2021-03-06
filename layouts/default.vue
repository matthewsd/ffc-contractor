<style>
    .title {
        height: 100%;
        margin-top: -10px;
    }

    .toolbar--fixed {
        z-index: 1000;
    }

    .navigation-drawer {
        z-index: 1001;
    }

    .menuable__content__active {
        z-index: 1000 !important;
    }

    .vue-dropzone {
        max-width: 100%;
    }

    .dz-preview, .dz-image {
        width: 100%;
    }

    .dropzone .dz-preview {
        margin: 0 auto;
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

                    <v-list-group v-if="item.children" v-model="item.model" :prepend-icon="item.icon"
                                  append-icon="keyboard_arrow_down">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.title }}
                                </v-list-tile-title>
                            </v-list-tile-content>
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
            <v-icon v-if="!miniVariant && drawer" @click="miniVariant = !miniVariant">keyboard_arrow_left</v-icon>
            <v-icon v-if="miniVariant && drawer" @click="miniVariant = !miniVariant">keyboard_arrow_right</v-icon>
            <v-toolbar-title>{{ $auth.user ? $auth.user.client.name : 'First for Contractors' }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="$auth.user" class="d-flex align-center" style="margin-left: auto">
                <v-tooltip left>
                    <v-btn icon :href="'tel:' + $auth.user.client.phone" slot="activator">
                        <v-icon>phone</v-icon>
                    </v-btn>
                    <span>Contact {{ $auth.user.client.name }} on <strong>{{ $auth.user.client.phone }}</strong></span>
                </v-tooltip>
                <v-tooltip left>
                    <v-btn icon :href="'mailto:' + this.$auth.user.client.email +'?subject=I need help with FFC'"
                           slot="activator">
                        <v-icon>mail</v-icon>
                    </v-btn>
                    <span>Email {{ $auth.user.client.name }} on <strong>{{ $auth.user.client.email }}</strong></span>
                </v-tooltip>
            </div>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer clipped class="orange darken-1">
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
        drawer: null,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    computed: mapState(['navigation', 'alert']),
    mounted: function () {
      this.drawer = !(window.innerWidth < 600)
      this.$store.dispatch('GET_NAVIGATION')
      if (this.$auth.user) {
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

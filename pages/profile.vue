<template>
    <v-layout>
        <loading-circle v-if="!loaded"/>
        <v-container grid-list-md v-if="loaded">
            <v-toolbar color="deep-orange darken-4" dark>
                <v-icon>person</v-icon>
                <v-toolbar-title>Profile Details</v-toolbar-title>
            </v-toolbar>
            <v-tabs dark align-with-title v-model="activeTab" class="elevation-3" color="orange darken-4"
                    slider-color="yellow">
                <v-tab key="personal"
                       href="#personal"
                       ripple
                >
                    Personal
                </v-tab>
                <v-tab key="contact"
                       href="#contact"
                       ripple
                >
                    Contact
                </v-tab>
                <v-tab key="company"
                       href="#company"
                       ripple
                >
                    Company
                </v-tab>
                <v-tab-item
                        key="personal"
                        id="personal"
                >
                    <v-card>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Forename *"
                                                v-model="employee.forename"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Surname *"
                                                v-model="employee.surname"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-combobox
                                                v-model="employee.jobtitle"
                                                :items="jobtitles"
                                                :search-input.sync="search"
                                                hide-selected
                                                item-text="name"
                                                item-value="@id"
                                                label="Profession / Trade"
                                                placeholder="Start typing to Search"
                                                return-object
                                        ></v-combobox>
                                        <!--<v-select-->
                                        <!--autocomplete-->
                                        <!--:search-input.sync="search"-->
                                        <!--:items="jobtitles"-->
                                        <!--v-model="employee.jobtitle"-->
                                        <!--label="Profession / Trade"-->
                                        <!--item-text="name"-->
                                        <!--item-value="@id"-->
                                        <!--&gt;</v-select>-->
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="National Insurance Number"
                                                v-model="employee.nationalInsurance"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="info" @click.native="changeTab('contact')">
                                <span class="hidden-xs-only">Contact Details</span>
                                <v-icon>navigate_next</v-icon>
                            </v-btn>
                            <v-btn color="success" :loading="loading" @click="submit()">Save
                                <v-icon>done</v-icon>
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                        key="contact"
                        id="contact"
                >
                    <v-card>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Address Line 1 *"
                                                v-model="employee.address1"

                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Address Line 2 *"
                                                v-model="employee.address2"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="City / Town *"
                                                v-model="employee.city"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="County *"
                                                v-model="employee.county"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Postcode *"
                                                v-model="employee.postcode"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Country"
                                                v-model="employee.country"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Telephone *"
                                                v-model="employee.telephone"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Mobile Phone"
                                                v-model="contractor.mobile"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Email *"
                                                v-model="contractor.email"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="info" @click.native="changeTab('personal')">
                                <v-icon>navigate_before</v-icon>
                                <span class="hidden-xs-only">Personal Details</span>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="info" @click.native="changeTab('company')">
                                <span class="hidden-xs-only">Company Details</span>
                                <v-icon>navigate_next</v-icon>
                            </v-btn>
                            <v-btn color="success" :loading="loading" @click="submit()">Save
                                <v-icon>done</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                        key="company"
                        id="company"
                >
                    <v-card>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Company Name *"
                                                v-model="contractor.company"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Registered Company Number *"
                                                v-model="contractor.companyNumber"
                                                :counter="8"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Vat Registration Number *"
                                                v-model="contractor.vat"
                                                :counter="9"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex sm12 m6 lg6>
                                        <v-text-field
                                                label="Unique Taxpayer Reference Number *"
                                                v-model="contractor.tax"
                                                :counter="10"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="info" @click.native="changeTab('contact')">
                                <v-icon>navigate_before</v-icon>
                                <span class="hidden-xs-only">Contact Details</span>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="success" :loading="loading" @click="submit()">Save
                                <v-icon>done</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-container>
    </v-layout>
</template>

<script>
  // import Api from '~/utilities/api'
  import {mapGetters} from 'vuex'
  import LoadingCircle from '~/components/loading-circle'

  export default {
    middleware: 'auth',
    async fetch ({store, params}) {
      // await store.dispatch('GET_CONTRACTOR')
      // await store.dispatch('GET_EMPLOYEE')
      await store.dispatch('GET_JOBTITLES')
    },
    computed: {
      ...mapGetters(['contractor', 'employee'])
    },
    components: {
      LoadingCircle
    },
    name: 'profile_settings',
    data () {
      return {
        loaded: false,
        loading: false,
        activeTab: null,
        search: null,
        isLoading: false,
        descriptionLimit: 60,
        model: null,
        count: 0,
        jobtitles: []
      }
    },
    mounted: function () {
      this.loaded = true
    },
    watch: {
      async search (val) {
        this.isLoading = true
        let { data } = await this.$axios.get(`/jobtitles?name=${val}&name=${val}`, {
          headers: { 'content-type': 'application/ld+json; charset=utf-8' }
        })
        this.count = data['hydra:member'].length
        this.jobtitles = data['hydra:member']
        this.isLoading = false
      }
    },
    methods: {
      async submit () {
        this.loading = true
        let employee = JSON.parse(JSON.stringify(this.employee))
        employee.jobtitle = this.employee.jobtitle['@id']
        // this.employee.jobtitle = this.employee.jobtitle['@id']
        await this.$store.dispatch('PUT_EMPLOYEE', employee)
        await this.$store.dispatch('PUT_CONTRACTOR', this.contractor)
        await this.$store.dispatch('PUT_PROGRESS')
        this.$store.dispatch('GET_NAVIGATION')
        this.$store.commit('SET_ALERT', {
          message: 'Successfully saved your answers.',
          colour: 'green darken-2',
          active: true
        })
        this.$router.replace({path: '/'})
      },
      changeTab (id) {
        this.activeTab = id
      }
    }
  }
</script>

<style scoped>

</style>

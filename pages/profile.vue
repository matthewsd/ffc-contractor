<template>
    <v-layout>
    <loading-circle v-if="!loaded"/>
    <v-container grid-list-md v-if="loaded">
        <v-toolbar color="deep-orange darken-4" dark>
            <v-icon>person</v-icon>
            <v-toolbar-title>Profile Details</v-toolbar-title>
        </v-toolbar>
        <v-tabs v-model="activeTab" class="elevation-3">
            <v-form>
                <v-tabs-bar class="orange darken-4" dark>
                    <v-tabs-item key="personal"
                                 href="#personal"
                                 ripple
                    >
                        Personal
                    </v-tabs-item>
                    <v-tabs-item key="contact"
                                 href="#contact"
                                 ripple
                    >
                        Contact
                    </v-tabs-item>
                    <v-tabs-item key="company"
                                 href="#company"
                                 ripple
                    >
                        Company
                    </v-tabs-item>
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                    <v-tabs-content
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
                                            <v-select
                                                    autocomplete
                                                    v-bind:items="jobtitles"
                                                    v-model="employee.jobtitle"
                                                    label="Profession / Trade (Cannot be edited)"
                                                    item-text="name"
                                                    item-value="@id"
                                            ></v-select>
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
                                <v-btn color="success" @click="submit()">Save
                                    <v-icon>done</v-icon>
                                </v-btn>

                            </v-card-actions>
                        </v-card>
                    </v-tabs-content>
                    <v-tabs-content
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
                                        <v-flex sm12 m6 lg6>
                                            <v-text-field
                                                    label="Emergency Contact Name"
                                                    v-model="employee.emergencyForename"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex sm12 m6 lg6>
                                            <v-text-field
                                                    label="Emergency Contact Number"
                                                    v-model="employee.emergencyPhone"
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
                                <v-btn color="success" @click="submit()">Save
                                    <v-icon>done</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tabs-content>
                    <v-tabs-content
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
                                <v-btn color="success" @click="submit()">Save
                                    <v-icon>done</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tabs-content>
                </v-tabs-items>
            </v-form>
        </v-tabs>
    </v-container>
    </v-layout>
</template>

<script>
  // import Api from '~/utilities/api'
  import { mapGetters } from 'vuex'
  import LoadingCircle from '~/components/loading-circle'

  export default {
    middleware: 'auth',
    async fetch ({ store, params }) {
      // await store.dispatch('GET_CONTRACTOR')
      // await store.dispatch('GET_EMPLOYEE')
      await store.dispatch('GET_JOBTITLES')
    },
    computed: mapGetters(['contractor', 'employee', 'jobtitles']),
    components: {
      LoadingCircle
    },
    name: 'profile_settings',
    data () {
      return {
        loaded: false,
        activeTab: null,
        search: null
      }
    },
    mounted: function () {
      this.loaded = true
    },
    methods: {
      async submit () {
        await this.$store.dispatch('PUT_EMPLOYEE', this.employee)
        await this.$store.dispatch('PUT_CONTRACTOR', this.contractor)
        await this.$store.dispatch('PUT_PROGRESS')
        this.$store.dispatch('GET_NAVIGATION')
        this.$store.commit('SET_ALERT', { message: 'Successfully saved your answers.', colour: 'green darken-2', active: true })
        this.$router.replace({ path: '/' })
      },
      changeTab (id) {
        this.activeTab = id
      }
    }
  }
</script>

<style scoped>

</style>

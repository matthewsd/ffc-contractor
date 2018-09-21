<template>
  <!--<section  v-if="this.$store.state.loaded">-->
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md8>
      <v-card>
        <v-card-title class="headline">Welcome to First for Contractors.</v-card-title>
        <v-card-text>
          <p>First for Contractors is your personal portal for maintaining all of your companies
            records and documents.</p>
          <p>Please use the form below to sign into your profile. You should have been
            supplied your contractor number and password by your current employer.</p>
          <v-form v-model="valid" v-if="loading == false" ref="form" lazy-validation @submit.prevent="login">
            <v-container grid-list-md>
              <v-alert color="error" icon="warning" value="true" v-if="formError">
                The 'Contractor ID' or 'Password' you supplied, was incorrect. Please try again.
              </v-alert>
              <v-layout row wrap>
                <v-flex sm12 m6 lg6>
                  <v-text-field
                          type="text"
                          label="Contractor ID"
                          v-model="username"
                          :counter="6"
                          required
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 m6 lg6>
                  <v-text-field
                          label="Password"
                          v-model="password"
                          :append-icon="e1 ? 'visibility_off' : 'visibility'"
                          @click:append="() => (e1 = !e1)"
                          :type="e1 ? 'password' : 'text'"
                          required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn
                      type="submit"
                      block
                      color="green darken-1"
                      style="color:white;"
                      :disabled="!valid"
              >
                Login
                <v-icon v-if="valid" color="white">done</v-icon>
              </v-btn>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-text v-if="loading == true">
          <div style="text-align:center;">
            <v-progress-circular indeterminate v-bind:size="300" v-bind:width="2" color="orange">Logging In...</v-progress-circular>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  <!--</section>-->
</template>

<script>
  function numberChecker () {
    return [
      (v) => !!v || `Contractor ID is required`,
      (v) => v && ((v.length >= 5) || `Your Contractor ID must be more than 5 digits`),
      (v) => v && ((v.length <= 7) || `Your Contractor ID must be less than 7 digits`),
      (v) => v && (/^\d+$/.test(v) || `Your Contractor ID should contain only numbers`)
    ]
  }
  function passwordChecker () {
    return [
      (v) => !!v || `Password is required`,
      (v) => v && (v.length >= 5 || `Your password should be at least 6 characters long`)
    ]
  }
  export default {
    name: 'login',
    mounted: function () {
      this.$store.dispatch('GET_NAVIGATION')
    },
    data: () => ({
      loading: false,
      e1: true,
      valid: false,
      username: null,
      password: '',
      usernameRules: numberChecker(),
      passwordRules: passwordChecker(),
      formError: null
    }),
    methods: {
      async login () {
        try {
          this.loading = true
          await this.$auth.login({
            data: {
              username: this.username,
              password: this.password
            }
          })
          this.$store.dispatch('GET_NAVIGATION')
          this.$store.dispatch('GET_CONTRACTOR')
          this.$store.dispatch('GET_EMPLOYEE')
          this.$router.replace({path: '/'})
          this.username = ''
          this.password = ''
          this.formError = null
        } catch (e) {
          this.loading = false
          this.formError = e
        }
      }
    }
  }
</script>

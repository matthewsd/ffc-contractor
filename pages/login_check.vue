<template>
    <div>
        <h1>Login Check</h1>
    </div>
</template>

<script>
  export default {
    layout: 'blank',
    name: 'login_check',
    data: () => ({
      username: null,
      password: null,
      formError: null
    }),
    mounted: function () {
      window.addEventListener('message', this.recMessage)
    },
    methods: {
      async recMessage (event) {
        if (event.data.target === 'check_user') {
          if (this.$auth.state.loggedIn) {
            event.source.postMessage({loggedIn: true, data: this.$auth.state.user}, event.origin)
          } else {
            event.source.postMessage({loggedIn: false}, event.origin)
          }
        } else if (event.data.target === 'logout_user') {
          await this.$auth.logout()
          event.source.postMessage({loggedOut: true, status: 'success', data: this.$auth.state}, event.origin)
        } else if (event.data.target === 'login_user') {
          if (!event.data.data.username) {
            event.source.postMessage({
              loginFail: true,
              status: 'fail',
              message: 'Contractor ID is required.'
            }, event.origin)
            return
          }
          if (!event.data.data.password) {
            event.source.postMessage({
              loginFail: true,
              status: 'fail',
              message: 'Password is required.'
            }, event.origin)
            return
          }
          try {
            console.log(event.data.data.username)
            await this.$auth.login({
              data: {
                username: event.data.data.username,
                password: event.data.data.password
              }
            })
            this.formError = null
            event.source.postMessage({status: 'success', loginSuccess: true}, event.origin)
          } catch (e) {
            this.formError = e
            event.source.postMessage({
              loginFail: true,
              status: 'fail',
              message: 'The \'Contractor ID\' or \'Password\' you supplied, was incorrect. Please try again.'
            }, event.origin)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
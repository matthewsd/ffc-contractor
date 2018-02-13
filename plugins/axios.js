import axios from 'axios'

export default axios.create({
  headers: {'Authorization': 'Bearer ' + this.$state.auth.token}
  // baseURL: 'https://api.eldirect.co.uk'
})

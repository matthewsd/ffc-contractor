import Vuex from 'vuex'
import axios from '~/plugins/axios.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      navigation: [],
      helps: [],
      users: []
    },
    getters: {
      navigation (state) {
        return state.navigation
      },
      helps (state) {
        return state.helps
      },
      users (state) {
        return state.users
      }
    },
    mutations: {
      SET_NAVIGATION (state, payload) {
        state.navigation = payload
      },
      SET_HELPS (state, payload) {
        state.helps = payload
      },
      SET_USERS (state, payload) {
        state.users = payload
      }
    },
    actions: {
      async GET_NAVIGATION ({commit, state}) {
        if (state.auth.loggedIn) {
          await commit('SET_NAVIGATION', [
            {icon: 'dashboard', title: 'Dashboard', to: '/'},
            {icon: 'assignment', title: 'PQQ', to: '/inspire', children: await getChildren(), model: true},
            {icon: 'help', title: 'Help', to: '/help'},
            {icon: 'cancel', title: 'Log Out', to: '/logout'}
          ])
        } else {
          await commit('SET_NAVIGATION', [
            {icon: 'security', title: 'Login', to: '/login'},
            {icon: 'help', title: 'Help', to: '/help'}
          ])
        }
      },
      async GET_HELPS ({commit, store}) {
        let {data} = await axios.get(`https://api.eldirect.co.uk/helps`)
        commit('SET_HELPS', data['hydra:member'])
      },
      async GET_USERS ({commit, store}) {
        let {data} = await axios.get(`http://localhost:8004/users`)
        commit('SET_USERS', data['hydra:member'])
      }
    }
  })
}

function getChildren () {
  return [
    {icon: 'dashboard', title: 'Dashboard', to: '/dashboard', progress: 100},
    {icon: 'dashboard', title: 'Dashboard', to: '/dashboard', progress: 70},
    {icon: 'dashboard', title: 'Dashboard', to: '/dashboard', progress: 40}
  ]
}

export default createStore

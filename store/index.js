import Vuex from 'vuex'
// import axios from '~/plugins/axios.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      navigation: [],
      helps: [],
      notes: {
        loaded: false,
        data: []
      },
      workSectors: [],
      workSector: {},
      staticSectors: [],
      standardSector: {},
      sectorsSorted: {
        incomplete: [],
        complete: [],
        approved: []
      },
      sectorsLoading: false,
      unreadNotes: 0,
      alert: {
        active: false,
        message: '',
        colour: ''
      },
      contractor: {},
      employee: {},
      jobtitles: [],
      profileProgressId: null,
      buttonIsDisabled: false
    },
    getters: {
      navigation (state) {
        return state.navigation
      },
      helps (state) {
        return state.helps
      },
      notes (state) {
        return state.notes
      },
      staticSectors (state) {
        return state.staticSectors
      },
      standardSector (state) {
        return state.standardSector
      },
      workSectors (state) {
        return state.workSectors
      },
      workSector (state) {
        return state.workSector
      },
      sectorsSorted (state) {
        return state.sectorsSorted
      },
      sectorsLoading (state) {
        return state.sectorsLoading
      },
      alert (state) {
        return state.alert
      },
      jobtitles (state) {
        return state.jobtitles
      },
      contractor (state) {
        return state.contractor
      },
      employee (state) {
        return state.employee
      },
      buttonIsDisabled (state) {
        return state.buttonIsDisabled
      }
    },
    mutations: {
      SET_EMPLOYEE (state, payload) {
        state.employee = payload
      },
      SET_CONTRACTOR (state, payload) {
        state.contractor = payload
      },
      SET_JOBTITLES (state, payload) {
        state.jobtitles = payload
      },
      SET_NAVIGATION (state, payload) {
        state.navigation = payload
      },
      SET_WORK_SECTOR (state, payload) {
        state.workSector = payload
      },
      SET_WORK_SECTORS (state, payload) {
        state.workSectors = payload
      },
      SET_STANDARD_SECTOR (state, payload) {
        state.standardSector = payload
      },
      SET_STATIC_SECTORS (state, payload) {
        state.staticSectors = payload
      },
      SET_SECTORS_SORTED (state, payload) {
        state.sectorsSorted = payload
      },
      SET_HELPS (state, payload) {
        state.helps = payload
      },
      SET_NOTES (state, payload) {
        state.notes = payload
      },
      INCREMENT_UNREAD_NOTES_COUNT (state) {
        state.unreadNotes++
      },
      DECREASE_UNREAD_NOTES_COUNT (state) {
        state.unreadNotes--
      },
      SECTORS_LOADING (state, payload) {
        state.sectorsLoading = payload
      },
      SET_ALERT (state, payload) {
        state.alert = payload
      },
      RESET_ALERT (state) {
        state.alert = {
          active: false,
          message: '',
          colour: ''
        }
      },
      SET_BUTTON_STATE (state, payload) {
        state.buttonIsDisabled = payload
      }
    },
    actions: {
      async GET_CONTRACTOR ({commit, state}) {
        const {data} = await this.$axios.get(`/contractors/${state.auth.user.id}`)
        commit('SET_CONTRACTOR', data)
      },
      async PUT_CONTRACTOR ({commit, state}, contractor) {
        await this.$axios.put(contractor['@id'], contractor)
      },
      async GET_EMPLOYEE ({commit, state}) {
        const {data} = await this.$axios.get(`/employees/${state.auth.user.id}`)
        commit('SET_EMPLOYEE', data)
      },
      async PUT_EMPLOYEE ({commit, state}, employee) {
        await this.$axios.put(employee['@id'], employee)
      },
      async PUT_PROGRESS ({commit, state}, sector) {
        await this.$axios.put(`/calculate/profile_progress/${state.profileProgressId}`) // Run this, once the other 2 are complete, but no need to wait for it to complete before redirect is run.
      },
      async GET_JOBTITLES ({commit, state}) {
        const {data} = await this.$axios.get('/jobtitles')
        commit('SET_JOBTITLES', data['hydra:member'])
      },
      async GET_NAVIGATION ({dispatch, commit, state}) {
        if (state.auth.loggedIn) {
          commit('SECTORS_LOADING', true)
          await dispatch('GET_SECTOR_PROGRESSES')
          await commit('SET_NAVIGATION', [
            {icon: 'dashboard', title: 'Dashboard', to: '/'},
            {icon: 'assignment', title: 'PQQ', to: '/inspire', model: true, children: state.sectorsSorted},
            {icon: 'help', title: 'Help', to: '/help'},
            {icon: 'cancel', title: 'Log Out', to: '/logout'}
          ])
          commit('SECTORS_LOADING', false)
        } else {
          await commit('SET_NAVIGATION', [
            {icon: 'security', title: 'Login', to: '/login'},
            {icon: 'help', title: 'Help', to: '/help'}
          ])
        }
      },
      async GET_HELPS ({commit, store}) {
        let {data} = await this.$axios.get(`/helps`)
        commit('SET_HELPS', data['hydra:member'])
      },
      async GET_NOTES ({commit, state}) {
        const {data} = await this.$axios.get(`/notes`)
        commit('SET_NOTES', { loaded: true, data: data['hydra:member'] })
        state.unreadNotes = 0
        await data['hydra:member'].map((note) => {
          if (!note.read) {
            commit('INCREMENT_UNREAD_NOTES_COUNT')
          }
        })
      },
      MARK_NOTE_READ ({commit}, note) {
        this.$axios.put(note, {
          isRead: true
        })
        commit('DECREASE_UNREAD_NOTES_COUNT')
      },
      async GET_SECTOR_PROGRESSES ({commit, state, dispatch}) {
        await dispatch('GET_WORK_SECTORS')
        await dispatch('GET_STATIC_SECTORS')
        const obj = {
          incomplete: [],
          complete: [],
          approved: []
        }
        state.workSectors.map((p) => {
          p.toUrl = '/pqq/' + p.id
          if (p.progress < 100 && !p.isApproved) {
            obj.incomplete.push(p)
          } else if (p.progress === 100 && !p.isApproved) {
            obj.complete.push(p)
          } else {
            obj.approved.push(p)
          }
        })
        state.staticSectors.map((p) => {
          if (p.type === 'DETAILS') {
            state.profileProgressId = p.id
          }
          if (p.progress < 100 && !p.isApproved) {
            obj.incomplete.push(p)
          } else if (p.progress === 100 && !p.isApproved) {
            obj.complete.push(p)
          } else {
            obj.approved.push(p)
          }
        })
        commit('SET_SECTORS_SORTED', obj)
      },
      async GET_WORK_SECTORS ({commit}) {
        let {data} = await this.$axios.get(`/work_sector_progresses?isRetired=false&order[progress]=asc&order[approved]=asc`)
        commit('SET_WORK_SECTORS', data['hydra:member'])
      },
      async GET_WORK_SECTOR ({commit, state}, param) {
        var sectorProgress = await this.$axios.get(`/work_sector_progresses/${param}`)
        let questions = await this.$axios.get(`/questions/answers/${sectorProgress.data.workSector.id}`)
        await questions.data.map((question) => {
          question.dropOptions = dropOptions(question, state.auth.user.id)
          question.sub_questions.map((sub) => {
            sub.dropOptions = dropOptions(sub, state.auth.user.id)
          })
        })
        sectorProgress.data.questions = questions.data
        commit('SET_WORK_SECTOR', sectorProgress.data)
      },
      async PUT_WORK_SECTOR ({commit, state}, data) {
        this.$axios.put('/sectors/questions/answers', data)
      },
      async GET_STATIC_SECTORS ({commit}) {
        let {data} = await this.$axios.get(`/static_progresses?order[progress]=asc&order[approved]=asc`)
        commit('SET_STATIC_SECTORS', data['hydra:member'])
      },
      async GET_STANDARD_SECTOR ({commit, state}) {
        let questions = await this.$axios.get(`/standard/questions/answers/get`)
        await questions.data.map((question) => {
          question.dropOptions = dropOptions(question, state.auth.user.id)
          question.sub_questions.map((sub) => {
            sub.dropOptions = dropOptions(sub, state.auth.user.id)
          })
        })
        commit('SET_STANDARD_SECTOR', questions.data)
      },
      async PUT_STANDARD_SECTOR ({commit, state}, data) {
        this.$axios.put('/standard/questions/answers/put', data)
      },
      async RESET_EVERYTHING ({commit}) {
        commit('SET_STATIC_SECTORS', [])
        commit('SET_SECTORS_SORTED', {
          incomplete: [],
          complete: [],
          approved: []
        })
        commit('SET_WORK_SECTORS', [])
      },
      async getAlerts (context, {alert}) {
        context.commit('SET_ALERT', alert)
      },
      async PUT_ACTION ({store, commit, state, dispatch}, {url, department}) {
        if (state.auth.loggedIn) {
          // If Contractor already has a contact_id then it's as simple as adding an action
          if (state.contractor.contact) {
            this.$axios.put(state.contractor.contact, {
              lastResult: 19
            })
            this.$axios.post(`/actions`, {
              contact: state.contractor.contact,
              user: 'FFC-CONTRACTOR',
              notes: `Contractor ID ${state.contractor.id} for Client ${state.auth.user.client.id} clicked on ${url}`,
              sticky: false
            })
          } else {
            var jobtitle = null
            // Otherwise we have to do some sanity checking so we don't duplicate the Contact
            var contacts = []
            if (state.contractor.companyNumber) {
              contacts = await this.$axios.get(`/contacts?companyNumber=${state.contractor.companyNumber}`)
            } else if (state.contractor.email) {
              contacts = await this.$axios.get(`/contacts?email=${state.contractor.email}`)
            } else if (state.employee.telephone) {
              contacts = await this.$axios.get(`/contacts?phone=${state.employee.telephone}`)
            } else if (state.contractor.company) {
              contacts = await this.$axios.get(`/contacts?companyName=${state.contractor.company}`)
            }
            // Now we need to make sure we're only getting one hit.
            if (contacts.data['hydra:totalItems'] === 1) {
              this.$axios.put(contacts.data['hydra:member'][0]['@id'], {
                lastResult: 19
              })
              this.$axios.put(state.contractor['@id'], {
                contact: contacts.data['hydra:member'][0]['@id']
              })
              this.$axios.post(`/actions`, {
                contact: `${contacts.data['hydra:member'][0]['@id']}`,
                user: 'FFC-CONTRACTOR',
                notes: `Contractor ID ${state.contractor.id} for Client ${state.auth.user.client.id} clicked on ${url}`,
                sticky: false
              })
            } else if (contacts.data['hydra:totalItems'] > 1) {
              // So we got multiple hits, thats a bit of a bummer... We don't want to risk inaccurate data. So instead of
              // guessing, put a new contact in BUT with a note stating it is more than likely a duplicate and it's worth
              // checking the other match.
              let owner = await this.$axios.put(`/staff/web-selector/increment/${department}`)
              if (state.employee.jobtitle) {
                jobtitle = await dispatch('GET_JOBTITLE_NAME', state.employee.jobtitle)
              }
              let contact = await this.$axios.post(`/contacts`, newContact(state.contractor, state.employee, jobtitle, owner.data.username))
              this.$axios.post(`/actions`, {
                contact: contact.data['@id'],
                user: 'FFC-CONTRACTOR',
                notes: `*POSSIBLE DUPLICATE PLEASE CHECK* Contractor ID ${state.contractor.id} for Client ${state.auth.user.client.id} clicked on ${url}`,
                sticky: false
              })
              this.$axios.put(state.contractor['@id'], { contact: contact.data['@id'] })
              dispatch('GET_CONTRACTOR')
            } else {
              // Finally. No matches found, so a simple Contact & Action insert, but get the new sales owner first
              // by using the web selector endpoint.
              let owner = await this.$axios.put(`/staff/web-selector/increment/${department}`)
              if (state.employee.jobtitle) {
                jobtitle = await dispatch('GET_JOBTITLE_NAME', state.employee.jobtitle)
              }
              let contact = await this.$axios.post(`/contacts`, newContact(state.contractor, state.employee, jobtitle, owner.data.username))
              this.$axios.post(`/actions`, {
                contact: contact.data['@id'],
                user: 'FFC-CONTRACTOR',
                notes: `Contractor ID ${state.contractor.id} for Client ${state.auth.user.client.id} clicked on ${url}`,
                sticky: false
              })
              this.$axios.put(state.contractor['@id'], { contact: contact.data['@id'] })
              dispatch('GET_CONTRACTOR')
            }
          }
        }
      },
      async GET_JOBTITLE_NAME ({state}, jobtitle) {
        if (jobtitle) {
          console.log(jobtitle)
          console.log('got new meth')
          let jobtitleReq = await this.$axios.get(jobtitle)
          console.log(jobtitleReq.data.name)
          return jobtitleReq.data.name
        } else {
          return ''
        }
      }
    }
  })
}

function dropOptions (question, contractor) {
  var required = (question.answer_evidence_isRequired) ? ' * Required' : ''
  return {
    url: `${process.env.UPLOAD_API_URL}/${question.client}/${contractor}`,
    maxFilesize: 25,
    method: 'POST',
    addRemoveLinks: true,
    uploadMultiple: false,
    maxFiles: 1,
    headers: {
      'Access-Control-Request-Method': 'POST'
    },
    dictDefaultMessage: `Drop a document here, or tap here to select a document to upload. ${required}`
  }
}
function newContact (contractor, employee, jobtitle, owner) {
  console.log(owner)
  return {
    companyName: contractor.company,
    name: contractor.forename + ' ' + contractor.surname,
    jobTitle: jobtitle,
    phone: employee.telephone,
    mobile: employee.mobile,
    address1: employee.address1,
    address2: employee.address2,
    city: employee.city,
    county: employee.county,
    postcode: employee.postcode,
    country: employee.country,
    email: contractor.email,
    lastResult: 19,
    companyNumber: contractor.companyNumber,
    retired: false,
    owner: owner,
    cameFrom: 21,
    salesOwner: owner,
    foundUs: 10
  }
}

export default createStore

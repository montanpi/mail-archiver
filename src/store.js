import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { sortBy } from './utils/utils'
// TODO format dates based on locale
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emails: [],
    sort: 'date',
    order: 'desc'
  },
  actions: {
    getMail ({ commit }, { baseURL, sort, order, from, to }) {
      axios.get(baseURL, {
        params: {
          _sort: sort,
          _order: order,
          date_gte: from,
          date_lte: to
        }
      })
        .then(res => {
          commit('setMail', res.data)
        })
        .catch(err => { window.alert(err) })
    }
  },
  mutations: {
    changeSort (state, newSort) {
      if (newSort === state.sort) {
        if (state.order === 'asc') {
          state.order = 'desc'
        } else {
          state.order = 'asc'
        }
      }
      if (newSort !== state.sort) {
        state.sort = newSort
        state.order = 'desc'
      }
      switch (state.sort) {
        case 'from':
          Vue.set(state, 'emails', sortBy('from', state.order, state.emails))
          break
        case 'to':
          Vue.set(state, 'emails', sortBy('to', state.order, state.emails))
          break
        case 'subject':
          Vue.set(state, 'emails', sortBy('subject', state.order, state.emails))
          break
        case 'date':
          Vue.set(state, 'emails', sortBy('date', state.order, state.emails))
          break
        case 'id':
          Vue.set(state, 'emails', sortBy('id', state.order, state.emails))
          break
      }
    },
    setMail (state, emails) {
      Vue.set(state, 'emails', emails)
    }
  }
})

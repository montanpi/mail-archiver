import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import sortBy from './utils/sortBy'

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
        .then(res => res.data)
        .then(emails => {
          commit('setMail', emails)
        })
    }
  },
  mutations: {
    sort (state, newSort) {
      if (newSort === state.sort) {
        if (state.order === 'asc') {
          state.order = 'desc'
        } else {
          state.order = 'asc'
        }
      }
      if (newSort !== state.sort) {
        state.sort = newSort
      }
      switch (state.sort) {
        case 'from':
          Vue.set(this.state, 'emails', sortBy('from', state.sort, state.emails))
          break
        case 'to':
          Vue.set(this.state, 'emails', sortBy('to', state.sort, state.emails))
          break
        case 'subject':
          Vue.set(this.state, 'emails', sortBy('subject', state.sort, state.emails))
          break
        case 'date':
          Vue.set(this.state, 'emails', sortBy('date', state.sort, state.emails))
          break
        case 'id':
          Vue.set(this.state, 'emails', sortBy('id', state.sort, state.emails))
          break
      }
    },
    setMail (state, emails) {
      Vue.set(state, 'emails', emails)
    }
  }
})

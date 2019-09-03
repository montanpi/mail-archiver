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
          // after resolved, a syncronous mutation is committed
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
      // once the sort property and order are set, the actual sorting takes place
      Vue.set(state, 'emails', sortBy(state))
    },
    setMail (state, payload) {
      Vue.set(state, 'emails', payload)
    }
  }
})

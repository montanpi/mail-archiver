<template>
  <div class="container">
    <menu>
      <ul>
        <li>
          <a href="#" @click="sort('from')">From</a>
        </li>
        <li>
          <a href="#" @click="sort('to')">To</a>
        </li>
        <li>
          <a href="#" @click="sort('subject')">Subject</a>
        </li>
        <li>
          <a href="#" @click="sort('date')">Date</a>
        </li>
      </ul>
    </menu>
    <main>
      <ul>
        <li v-for="email in emails" :key="email.id">
          <input
            type="checkbox"
            v-bind:checked="ids.indexOf(email.id) !== -1"
            @click="toggleSelected(email.id)"
          />
          {{ email.id }}
          {{ email.from }}
          {{ formatRecipients(email.to) }}
          <span
            v-if="email.to.length > 1"
            style="color: red"
          >{{ formatBadge(email.to) }}</span>
          <span style="color: blue">{{ email.subject }}</span>
          {{ formatDateWrapper(email.date) }}
        </li>
      </ul>
    </main>
    <footer v-show="ids.length">
      <button type="button" @click="showModal = true">inspect</button>
    </footer>
    <inspect v-if="showModal" @close="showModal = false" :selected-emails="selected" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { formatDate } from '../utils/utils'
import Inspect from './Inspect'

export default {
  name: 'SearchResult',
  components: {
    Inspect
  },
  data () {
    return {
      ids: [],
      showModal: false
    }
  },
  computed: {
    ...mapState(['emails']),
    selected: function () {
      return this.emails.filter(cur => this.ids.indexOf(cur.id) !== -1)
    }
  },
  created: function () {
    this.$eventHub.$on('newSearch', () => {
      this.ids = []
    })
  },
  methods: {
    ...mapMutations(['sort']),
    formatBadge (recipients) {
      return `+${recipients.length - 1}`
    },
    formatRecipients (recipients) {
      return recipients.join(', ')
    },
    formatDateWrapper (date) {
      return formatDate(date)
    },
    toggleSelected (id) {
      const idx = this.ids.indexOf(id)
      idx === -1 ? this.ids.push(id) : this.ids.splice(idx, 1)
    }
  }
}
</script>

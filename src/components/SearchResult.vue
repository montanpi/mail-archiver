<template>
  <div>
    <div class="search-results">
      Results:
      <span>{{ emails.length }}</span>mail(s)
    </div>
    <div v-if="emails.length" class="email-container">
      <div class="email-menu">
        <ul>
          <li :class="{ order: sort == 'from', desc: order == 'desc' }" @click="changeSort('from')">
            <span>From</span>
          </li>
          <li :class="{ order: sort == 'to', desc: order == 'desc' }" @click="changeSort('to')">
            <span>To</span>
          </li>
          <li :class="{ order: sort == 'subject', desc: order == 'desc' }" @click="changeSort('subject')">
            <span>Subject</span>
          </li>
          <li :class="{ order: sort == 'date', desc: order == 'desc' }" @click="changeSort('date')">
            <span>Date</span>
          </li>
        </ul>
      </div>
      <div>
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
      </div>
      <footer v-show="ids.length">
        <button type="button" @click="showModal = true">inspect</button>
      </footer>
      <inspect v-if="showModal" @close="showModal = false" :selected-emails="selected" />
    </div>
    <div v-else>No results</div>
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
    ...mapState(['emails', 'sort', 'order']),
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
    ...mapMutations(['changeSort']),
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

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_functions.scss";
.search-results {
  margin-left: em(26);
  color: $headings-font-color;
  font-size: em(17.3);
  font-weight: bold;
  letter-spacing: em(0.5);
  span {
    font-size: em(23);
  }
}
.email-container {
  margin-top: em(6);
  border-top: em(2) solid $border-color;
}
.email-menu {
  margin: 0;
  padding: 0;
  background: $background-color;
  height: em(52);
  border-bottom: em(2) solid $border-color;
  font-weight: bold;
  color: $headings-font-color;
  font-size: em(16.2);
  ul {
    display: flex;
    margin: 0;
    // padding: 18px 28px 14px 28px;
    padding: em(17) 0 0 em(28);
    list-style: none;
    li {
      padding: 0;
      cursor: pointer;
      &::before {
        content: "|";
        display: inline-block;
        text-align: center;
        width: em(22);
        cursor: default;
      }
      &:first-child::before {
        content: none;
      }
    }
  }
  .order {
    color: $selected-font-color;
    &::after {
      background: url("../assets/icon_arrow01.svg") right no-repeat;
      background-size: contain;
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: em(19);
      height: em(6);
    }
  }
  .desc {
    &::after {
      -webkit-transform: scaleY(-1);
      transform: scaleY(-1);
    }
  }
}
</style>

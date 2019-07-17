<template>
  <div>
    <div class="search-results">
      Results:
      <span>{{ emails.length }}</span>mail(s)
    </div>
    <div v-if="emails.length" class="container">
      <div class="email-menu">
        <ul>
          <li :class="{ order: sort == 'from', desc: order == 'desc' }" @click="changeSort('from')">
            <span>From</span>
          </li>
          <li :class="{ order: sort == 'to', desc: order == 'desc' }" @click="changeSort('to')">
            <span>To</span>
          </li>
          <li
            :class="{ order: sort == 'subject', desc: order == 'desc' }"
            @click="changeSort('subject')"
          >
            <span>Subject</span>
          </li>
          <li :class="{ order: sort == 'date', desc: order == 'desc' }" @click="changeSort('date')">
            <span>Date</span>
          </li>
        </ul>
      </div>
      <div class="email-items">
        <div class="email-grid" v-for="email in emails" :key="email.id">
          <input
            class="grid-checkbox"
            type="checkbox"
            v-bind:checked="ids.indexOf(email.id) !== -1"
            @click="toggleSelected(email.id)"
          />
          <div class="grid-icon"></div>
          <div class="grid-from">{{ email.from }}</div>
          <div class="grid-to">{{ formatRecipients(email.to) }}</div>
          <div
            v-if="email.to.length > 1"
            class="grid-badge"
          ><span>{{ formatBadge(email.to) }}</span></div>
          <div class="grid-subject">{{ email.subject }}</div>
          <div class="grid-date">
            <img v-if="email.attachment" class="date-attachment" src="../assets/icon_clip.svg" alt="icon_clip" />
            <span>{{ formatDateWrapper(email.date) }}</span>
            <img class="date-arrow" src="../assets/icon_arrow02.svg" alt="icon_arrow02" />
          </div>
        </div>
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
  font-weight: 600;
  letter-spacing: em(0.5);
  span {
    font-size: em(23);
  }
}
.container {
  margin-top: em(6);
  border-top: em(2) solid $border-color;
}
.email-menu {
  margin: 0;
  padding: 0;
  background: $background-color;
  height: em(52);
  border-bottom: em(2) solid $border-color;
  font-weight: 600;
  color: $headings-font-color;
  font-size: em(16.2);
  ul {
    display: flex;
    margin: 0;
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
      width: em(18);
      height: em(7);
    }
  }
  .desc {
    &::after {
      -webkit-transform: scaleY(-1);
      transform: scaleY(-1);
    }
  }
}
.email-grid {
  display: grid;
  box-sizing: border-box;
  width: em(520);
  height: em(126);
  border-bottom: em(1) solid $border-color;
  grid-template-columns: em(39) em(324) em(80) em(44);
  grid-template-rows: em(30) em(30) em(38);
  padding: em(14) em(16) em(12) em(16);
  &:last-child {
    border-bottom: 0;
  }
}
.grid-checkbox {
  display: none;
}
.grid-icon {
  grid-area: 1 / 1 / 3 / 2;
  background: url("../assets/icon_mail_sp.svg") left em(13) center / em(16)
    no-repeat;
}
.grid-from {
  grid-area: 1 / 2 / 1 / 3;
  padding: em(2) 0;
  font-size: em(18.9);
  font-weight: 600;
  color: $selected-font-color;
}
.grid-to {
  grid-area: 2 / 2 / 2 / 4;
  padding: em(2) 0;
  font-size: em(18.9);
  white-space: nowrap;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  &::after {
    content: "...";
  }
}
.grid-badge {
  position: relative;
  grid-area: 2 / 4 / 2 / 5;
  background-color: $badge-color;
  padding: em(1);
  border-radius: em(4);
  margin: em(3) em(8);
  height: em(18);
  width: em(26);
  span {
    position: absolute;
    top: 0;
    right: em(4);
    color: white;
    font-weight: 600;
  }
}
.grid-subject {
  grid-area: 3 / 1 / 3 / 5;
  padding-top: em(3);
  font-size: em(22);
  padding-left: em(8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.grid-date {
  grid-area: 1 / 3 / 1 / 5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: em(18.5);
  .date-arrow {
    width: auto;
    height: em(8);
    padding: em(5);
  }
  .date-attachment {
    width: auto;
    height: em(18);
    padding: em(8);
  }
}
</style>

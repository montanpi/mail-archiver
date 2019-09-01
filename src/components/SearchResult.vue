<template>
  <div>
    <div class="search-results">
      Results:
      <span>{{ emails.length }}</span>mail(s)
    </div>
    <div v-if="emails.length" :class="{ 'inspect-margin': ids.length, 'no-select': !userSelection }" class="container">
      <div class="email-menu">
        <ul>
          <li :class="{ order: sort == 'from', desc: order == 'desc' }" @click="changeSort('from')">
            <span tabindex="0" @keyup.enter="changeSort('from')">From</span>
          </li>
          <li :class="{ order: sort == 'to', desc: order == 'desc' }" @click="changeSort('to')">
            <span tabindex="0" @keyup.enter="changeSort('to')">To</span>
          </li>
          <li
            :class="{ order: sort == 'subject', desc: order == 'desc' }"
            @click="changeSort('subject')"
          >
            <span tabindex="0" @keyup.enter="changeSort('subject')">Subject</span>
          </li>
          <li :class="{ order: sort == 'date', desc: order == 'desc' }" @click="changeSort('date')">
            <span tabindex="0" @keyup.enter="changeSort('date')">Date</span>
          </li>
        </ul>
      </div>
      <div
        class="email-grid"
        v-for="email in emails"
        :key="email.id"
        tabindex="0"
        v-bind:class="{ selected: ids.indexOf(email.id) !== -1}"
        @click.left.exact="toggleSelected(email.id)"
        @keyup.enter="toggleSelected(email.id)"
        @click.shift.exact="toggleShiftSelected(email.id)"
      >
        <div class="grid-icon"></div>
        <div class="grid-from">{{ email.from }}</div>
        <div class="grid-to">{{ formatRecipients(email.to) }}</div>
        <div v-if="email.to.length > 1" class="grid-badge">
          <span>{{ formatBadge(email.to) }}</span>
        </div>
        <div class="grid-subject">{{ email.subject }}</div>
        <div class="grid-date">
          <svg
            v-if="email.attachment"
            class="date-attachment"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13.93083 15"
          >
            <title>icon_clip</title>
            <path
              class="a"
              d="M6.799,3.6254A2.30522,2.30522,0,1,0,3.56718,6.85622l4.304,4.304a.5222.5222,0,0,0,.7385-.7385l-4.304-4.304c-.53586-.53586-.87743-1.33808-.23084-1.98466.64553-.64659,1.4488-.304,1.98466.23189L11.032,9.3364c1.90632,1.90841,2.38159,2.78793,1.24615,3.92441-1.149,1.148-2.367.86385-4.20121-.96935L2.367,6.57941C1.1741,5.38653.33845,3.43842,1.90633,1.87159c1.86141-1.86141,3.98708-.03134,4.59293.57555l5.11038,5.11142a.5222.5222,0,0,0,.7385-.7385L7.23776,1.70864C5.18625-.34288,2.86-.56223,1.16678,1.13308c-1.711,1.71-1.5261,4.196.4617,6.18484l5.711,5.711C7.96726,13.6567,9.31161,15,10.85756,15a3.01214,3.01214,0,0,0,2.16014-1.00173c2.07554-2.07658.15564-3.99857-1.24616-5.40141Z"
            />
          </svg>
          <span>{{ formatDateWrapper(email.date) }}</span>
          <img class="date-arrow" src="../assets/icon_arrow02.svg" alt="icon_arrow02" />
        </div>
      </div>
      <div class="inspect-container" v-show="ids.length">
        <img tabindex="0" class="close-btn" src="../assets/icon_cross.svg" alt="icon_cross" @click="resetIds">
        <inspect :selected-emails="selected" />
      </div>
    </div>
    <div v-else class="container">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="logo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { formatDate } from '../utils/utils'
import Inspect from './Inspect'
import { Promise } from 'q'

export default {
  name: 'SearchResult',
  components: {
    Inspect
  },
  data () {
    return {
      ids: [],
      pivotId: null,
      userSelection: true
    }
  },
  computed: {
    ...mapState(['emails', 'sort', 'order']),
    selected: function () {
      return this.emails.filter(cur => this.ids.indexOf(cur.id) !== -1)
    },
    all: function () {
      return this.emails.map(cur => cur.id)
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
      if (document.getSelection().toString() === '') {
        this.toggleUserSelection()
          .then(() => {
            const idx = this.ids.indexOf(id)
            if (idx === -1) {
              this.pivotId = id
              this.ids.push(id)
            } else {
              this.pivotId = null
              this.ids.splice(idx, 1)
            }
          })
          .then(this.toggleUserSelection())
      }
    },
    toggleUserSelection () {
      return Promise((resolve) => {
        document.getSelection().removeAllRanges()
        this.userSelection ? this.userSelection = false : this.userSelection = true
        resolve()
      })
    },
    toggleShiftSelected (id) {
      if (this.pivotId === null) {
        this.toggleSelected(id)
      } else if (document.getSelection().toString() === '') {
        this.toggleUserSelection()
          .then(() => {
            const pivot = this.all.indexOf(this.pivotId)
            const selected = this.all.indexOf(id)
            if (selected < pivot) {
              this.ids = []
              for (let i = selected; i <= pivot; i++) {
                this.ids.push(this.emails[i].id)
              }
            // } else if (selected === pivot) {}
            } else if (selected > pivot) {
              this.ids = []
              for (let i = pivot; i <= selected; i++) {
                this.ids.push(this.emails[i].id)
              }
            }
          })
          .then(this.toggleUserSelection())
      }
    },
    resetIds () {
      this.pivotId = null
      this.ids = []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_functions.scss";
@import "../scss/_mixins.scss";
.no-select {
  user-select: none;
}
.selected {
  background-color: $selected-background-color;
}
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
.logo-container {
  padding-top: 12%;
  img {
    display: block;
    margin: 0 auto;
    width: 12%;
    height: auto;
  }
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
      span {
        cursor: pointer;
      }
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
    &::after {
      cursor: pointer;
      background: url("../assets/icon_arrow01.svg") right no-repeat;
      background-size: contain;
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: em(18);
      height: em(7);
      -webkit-transform: scaleY(-1);
      transform: scaleY(-1);
    }
  }
  .desc {
    &::after {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
    }
  }
}
.email-grid {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  height: em(126);
  border-bottom: em(1) solid $border-color;
  grid-template-columns: 7.79% 61.476% 21.724% auto;
  grid-template-rows: em(30) em(30) em(38);
  padding: em(14) 3.077% em(12) 3.077%;
  div {
    @include dots();
  }
}
.grid-icon {
  grid-area: 1 / 1 / 3 / 2;
  background: url("../assets/icon_mail_sp.svg") left 60% center / em(16)
    no-repeat;
  max-width: em(38);
}
.grid-from {
  grid-area: 1 / 2 / 1 / 3;
  padding: em(2) em(30) 0 0;
  font-size: em(18.9);
  word-wrap: break-word;
  font-weight: 600;
  height: em(30);
}
.grid-to {
  grid-area: 2 / 2 / 2 / 4;
  padding: em(2) em(18) 0 0;
  font-size: em(18.9);
  word-wrap: break-word;
  height: em(30);
}
.grid-badge {
  position: relative;
  grid-area: 2 / 4 / 2 / 5;
  background-color: $badge-color;
  padding: em(1);
  border-radius: em(4);
  margin: em(3) em(6);
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
  height: em(30);
}
.grid-date {
  grid-area: 1 / 3 / 1 / 5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: em(18.5);
  height: em(30);
  .date-arrow {
    width: auto;
    height: em(8);
    padding: em(5);
  }
  .date-attachment {
    fill: $headings-font-color;
    width: auto;
    height: em(18);
    padding: em(8);
  }
}
.close-btn {
  cursor: pointer;
  position: fixed;
  bottom: calc(40vh - #{em(16)});;
  left: em(4);
  width: auto;
  height: em(12);
}
.inspect-container {
  position: fixed;
  overflow-y: auto;
  bottom: 0;
  left: 0;
  padding: 0 5%;
  height: 40vh;
  width: 90%;
  z-index: 9999;
  background-color: $inspect-background-color;
  border-top: em(2) solid $border-color;
}
.inspect-margin {
  margin-bottom: 40vh !important;
}
@media screen and (min-width: 950px) {
  .search-results {
    margin-left: 4.9%;
  }
  .container {
    margin: 0.5% 4.9% 0 4.9%;
  }
  .email-menu {
    ul {
      padding-left: 1.1%;
      li {
        &:nth-child(1) {
          min-width: em(209);
          width: 15.7%;
        }
        &:nth-child(2) {
          min-width: calc(#{em(209)} + 6.2%);
          width: 26.8%;
        }
        &:nth-child(3) {
          min-width: em(209);
          width: 48.6%;
        }
        &:nth-child(4) {
          min-width: em(115);
          width: auto;
        }
        &::before {
          content: none;
        }
        &::after {
          cursor: pointer;
          width: em(20) !important;
        }
      }
    }
  }
  .email-grid {
    width: 100%;
    height: em(55);
    grid-template-columns: minmax(em(209), 15.8%) minmax(em(209), 20.3%) 6.2% minmax(em(209), 47%) minmax(em(140), auto);
    grid-template-rows: em(55);
    padding: em(10) em(16) em(12) em(16);
    &:hover {
      cursor: pointer;
      background-color: $selected-background-color;
      color: $selected-font-color;
      .date-attachment {
        fill: $selected-font-color;
      }
    }
  }
  .grid-icon {
    display: none;
  }
  .grid-from {
    grid-area: 1 / 1 / 1 / 2;
    font-weight: 400;
    font-size: em(20);
  }
  .grid-to {
    grid-area: 1 / 2 / 1 / 3;
    font-size: em(20);
  }
  .grid-badge {
    grid-area: 1 / 3 / 1 / 4;
    margin: 5% 10%;
  }
  .grid-subject {
    grid-area: 1 / 4 / 1 / 5;
    font-size: em(20);
  }
  .grid-date {
    grid-area: 1 / 5 / 1 / 6;
    font-weight: 600;
    font-size: em(20);
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    span {
      position: absolute;
      left: em(32);
      top: em(2.8);
      color: $font-color;
    }
    .date-arrow {
      display: none;
    }
    .date-attachment {
      width: em(15.5);
      height: em(19);
      padding: em(2) 0 0 em(1.5);
    }
  }
  .close-btn {
    left: 3.5%;
  }
}
</style>

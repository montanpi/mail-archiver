<template>
  <div class="container">
    <menu>
      <ul>
        <li>
          <a href="#" @click="sort('from')">From</a>
        </li>
        <li>
          <a href="#" @click="sort('from')">To</a>
        </li>
        <li>
          <a href="#" @click="sort('from')">Subject</a>
        </li>
        <li>
          <a href="#" @click="sort('from')">Date</a>
        </li>
      </ul>
    </menu>
    <main>
      <ul>
        <li v-for="email in emails" :key="email.id">
          {{ email.id }} {{ email.from }}
          <ul>
          <li v-for="(recipient, index) in email.to" :key="index">{{ recipient }}</li>
          {{ email.subject }} {{ email.date }}
          </ul>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SearchResult',
  computed: mapState(['emails']),
  methods: {
    ...mapMutations(['sort'])
  }
}
</script>

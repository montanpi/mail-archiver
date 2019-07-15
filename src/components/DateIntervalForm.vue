<template>
  <form action="#">
    <input v-model="interval" type="text" @keyup.enter.prevent="getMail" />
    <button type="button" @click="getMail">
      <img src="../assets/icon_search.svg" alt="icon_search" />
    </button>
  </form>
</template>

<script>
export default {
  name: 'DateIntervalForm',
  data () {
    return {
      interval: '2019/12/31 - 2020/1/3'
    }
  },
  methods: {
    getMail () {
      this.$eventHub.$emit('newSearch')
      this.$store.dispatch('getMail', {
        baseURL: 'http://localhost:8000/emails',
        sort: 'date',
        order: 'desc',
        from: new Date(this.interval.split(' - ')[0]),
        to: new Date(this.interval.split(' - ')[1])
      })
    }
  }
}
</script>

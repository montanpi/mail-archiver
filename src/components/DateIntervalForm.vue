<template>
  <form action="#">
    <input v-model="interval" type="text" />
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
      const from = new Date(this.interval.split(' - ')[0])
      let to = new Date(this.interval.split(' - ')[1])
      to.setHours(23, 59, 59, 999)
      this.$store.dispatch('getMail', {
        baseURL: 'http://localhost:8000/emails',
        sort: 'date',
        order: 'desc',
        from: from.toJSON(),
        to: to.toJSON()
      })
    }
  }
}
</script>

<template>
  <div id="app">
    <DateIntervalForm />
    <SearchResult />
  </div>
</template>

<script>
import SearchResult from './components/SearchResult'
import DateIntervalForm from './components/DateIntervalForm'

export default {
  name: 'app',
  components: {
    DateIntervalForm,
    SearchResult
  }
}
</script>

<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

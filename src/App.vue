<template>
  <div id="app">
    <header>
      <dateIntervalForm />
    </header>
    <main>
      <searchResult />
    </main>
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
@import "./scss/variables.scss";
@import "./scss/functions.scss";
body {
  line-height: 1.25;
  margin: 0;
}
#app {
  // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-family: sans-serif;
  color: $font-color;
  max-width: 1550px;
}
header {
  margin: em(28) 0 0 em(28);
}
main {
  margin-top: em(25);
}
@media screen and (min-width: 1000px) {
  header {
    margin: em(42.1) 0 0 5%;
  }
}
</style>

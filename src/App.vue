<template>
  <div id="app">
    <header>
      <DateIntervalForm />
    </header>
    <main>
      <SearchResult />
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
}
header {
  margin: em(28) em(28) 0 em(28);
}
main {
  margin-top: em(25);
}
</style>

<template>
  <div id="app">
    <!-- semantic html tags -->
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
@font-face {
  font-family: 'FreeSans';
  src: url('assets/FreeSans.otf');
}
body {
  line-height: 1.25;
  margin: 0;
}
#app {
  // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-family: FreeSans;
  color: $font-color;
  max-width: 1550px;
  margin: 0 auto;
}
header {
  margin: em(28) 0 0 em(28);
}
main {
  margin-top: em(25);
}
@media screen and (min-width: 950px) {
  header {
    margin: em(42.1) 0 0 5%;
  }
}
</style>

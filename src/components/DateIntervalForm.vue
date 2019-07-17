<template>
  <form action="#">
    <input v-model="interval" type="text" maxlength="23" @keyup.enter.prevent="getMail" />
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
        to: new Date(new Date(this.interval.split(' - ')[1]).getTime() + 86399999)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_functions.scss";
form {
  display: flex;
  // grid-column: 1;
}
input {
  height: em(38);
  width: em(182);
  padding-top: em(2);
  padding-left: em(51);
  padding-bottom: 0;
  padding-right: 0;
  font: inherit;
  font-size: em(20);
  letter-spacing: em(0.2);
  color: $selected-font-color;
  border-radius: em(8);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: em(1) solid $border-color;
  border-right: 0;
  background: url("../assets/icon_calender.svg") left em(18) center/em(22) no-repeat;
  &:focus {
    outline: none;
  }
}
button {
  padding-top: em(6);
  padding-left: em(15);
  padding-right: em(18);
  background: $background-color;
  border-radius: em(8);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font: inherit;
  font-size: em(20);
  border: em(1) solid $border-color;
  &:focus {
    outline: none;
  }
  img {
    width: em(20);
  }
}
@media screen and (min-width: 1000px) {
  input {
    padding-right: 1.6%;
  }
}
</style>

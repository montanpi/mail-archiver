<template>
  <div class="modal-body">
    <img src="../assets/icon_cross.svg" alt="icon_cross" @click="$emit('close')">
    <div class="email" v-for="email in selectedEmails" :key="email.id">
      <div class="from">{{ email.from }}</div>
      <div class="subject">{{ email.subject}}</div>
      <div class="body" :class="{ 'dots': selectedEmails.length > 1 }">{{ email.body}}</div>
    </div>
  </div>
  <!-- <button v-longpress="log" id="bt1" style="padding: 40px">Hold me for a while</button> -->
</template>

<script>
export default {
  name: 'Inspect',
  props: {
    selectedEmails: {
      type: Array,
      required: true
    }
  },
  methods: {
    log () {
      document.getElementById('bt1').className = 'red'
      console.log(window.navigator)
      console.log(this.selectedIds)
      window.navigator.vibrate(20)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_functions.scss";
@import "../scss/_mixins.scss";
.email {
  padding-top: em(10);
  border-bottom: em(1) solid $border-color;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
}
.from {
  float: left;
  font-size: em(17.3);
  @include dots();
}
.subject {
  float: right;
  @include dots();
  font-size: em(17.3);
  font-weight: 600;
}
.body {
  clear: both;
  padding: em(15) 0 em(5) 0;
}
.dots {
  @include dots();
}
.red {
  color: red;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 90vw;
  margin: 0 auto;
  padding: em(30);
  background-color: #fff;
  border-radius: em(2);
  box-shadow: 0 em(2) em(8) rgba(0, 0, 0, .33);
  transition: all .3s ease;
  position: relative;
  img {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: em(17.3);
    height: auto;
  }
}
.modal-body {
  margin: em(20) 0;
  position: relative;
  img {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: em(17.3);
    height: auto;
  }
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
</style>

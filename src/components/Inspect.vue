<template>
  <div>
    <div class="email" v-for="email in selectedEmails" :key="email.id">
      <div class="from">{{ email.from }}</div>
      <div class="subject">{{ email.subject}}</div>
      <div class="body" :class="{ 'dots': selectedEmails.length > 1 }">{{ email.body}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inspect',
  props: {
    selectedEmails: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_functions.scss";
@import "../scss/_mixins.scss";
.email {
  padding: em(20);
  border-bottom: em(1) solid $border-color;
  &:last-child {
    border-bottom: 0;
  }
}
.from {
  float: left;
  font-size: em(17.3);
  @include dots();
  max-width: 40%;
}
.subject {
  float: right;
  @include dots();
  font-size: em(17.3);
  font-weight: 600;
  max-width: 60%;
}
.body {
  clear: both;
  padding: em(15) 0 em(5) 0;
}
.dots {
  @include dots();
}
</style>

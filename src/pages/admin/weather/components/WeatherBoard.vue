<template lang="pug">
  .p-10
    .p-10.pv-20.fs-ees(style='color: #a9aece82')
      span CURRENT LOCATION
    .p-10.fs-el.fw-s(style='color: #8da7dd')
      transition(name='power-switch', mode='out-in')
        span(:key='data.label') {{ data.label }}
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="stylus" scoped>
.power-switch
  &-enter-active
  &-leave-active
    transition all .28s
  &-enter
  &-leave-active
    opacity 0
    transform translateY(-10px)
  &-move
    transition all .28s
  &-leave-active
    position absolute
</style>

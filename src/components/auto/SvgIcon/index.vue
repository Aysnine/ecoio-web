<template lang="pug">
  svg(:class='svgClass', aria-hidden='true')
    use(:xlink:href='iconName')
</template>

<script>
import '@/assets/svg-icons'

export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    },
    svgClass() {
      return `svg-icon ${this.className}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.svg-icon
  width 1em
  height 1em
  vertical-align -0.125em
  fill currentColor
  overflow hidden
  &.M
    width 1.25em
    height 1.25em
    vertical-align -0.25em
  &.B
    vertical-align bottom
</style>

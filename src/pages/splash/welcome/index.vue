<template lang="pug">
  .heroed
    .p-10
      h1= process.env.VUE_APP_TITLE
    .p-10
      hero-carousel.hero-carousel
</template>

<script>
import HeroCarousel from './components/HeroCarousel'

export default {
  components: {
    HeroCarousel
  }
}
</script>

<style lang="stylus" scoped>
h1
  font-weight 100
  color #ffffffbf
  transition color .25s
  text-align center
  font-size 24px
  &:hover
    color #fff
.hero-carousel
  margin 3em 0
</style>

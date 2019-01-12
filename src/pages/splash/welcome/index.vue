<template lang="pug">
  .heroed
    .p-10
      h1(title=process.env.VUE_APP_TITLE)
        img.va-b(src='@/assets/logo-w.png', height='26')
        span.fw-s= process.env.VUE_APP_TITLE_BODY
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

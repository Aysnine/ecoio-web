<template lang="pug">
  el-scrollbar
    div(style='height: calc(100vh - 60px)')
      el-row.pb-20
        el-col(:md='24', :lg='12')
          .p-10
            .p-10.pv-20.fs-ees(style='color: #a9aece82')
              span CURRENT LOCATION
            .p-10.fs-el.fw-s.va-b(style='color: #8da7dd')
              i.el-icon-location.mr-5
              transition(name='power-switch', mode='out-in')
                span(:key='data.label') {{ data.label }}
            .line
            .p-10
              .fs-es.data(v-if='data.data instanceof Array')
                template(v-for='i in data.data')
                  count-to(v-if='typeof i === "number"', :start-val='0', :end-val='i', :duration='3000', :decimals='0', autoplay, separator='')
                  template(v-if='typeof i === "object" && typeof i.value === "number"')
                    .prop-item.fw-s.va-b
                      svg-icon.M.mr-8.ml-1(v-if='i.icon', :icon='"we-" + i.icon')
                      span.mr-5(v-if='i.label') {{ i.label }} 
                      count-to(:start-val='0', :end-val='i.value', :duration='3000', :decimals='i.decimals || 0', autoplay, :separator='i.separator || ""', :prefix='i.prefix || ""', :suffix='i.suffix || ""')
                  template(v-if='typeof i === "object" && typeof i.value === "string"')
                    .prop-item.fw-s.va-b
                      svg-icon.M.mr-8.ml-1(v-if='i.icon', :icon='"we-" + i.icon')
                      span.mr-5(v-if='i.label') {{ i.label }} 
                      span  {{ i.value }}
              .fs-es.ml-10.pl-5.pt-3.data(v-if='typeof data.data === "number"')
                count-to(:start-val='0', :end-val='data.data', :duration='3000', :decimals='0', autoplay, separator='')
              .fs-es.ml-10.pl-5.pt-3.data(v-if='typeof data.data === "string"')
                span {{ data.data }}
        el-col(:md='24', :lg='12')
          .p-20.f-r
            el-card.hero-block.we-card(shadow='never')
                transition(name='el-fade-in', mode='out-in')
                  .p-20.ta-c(:key='data.label')
                    div(style='display: inline-block')
                      .va-m.f-l
                        svg-icon.logod(:icon='"wh-" + data.icon')
                        .fs-ees.p-10 {{ data.icon }}
                      .wow.f-l.fw-s {{ data.data[0].value }}°
                      .f-c
      .p-20
        ul.grid-wrap
          li(v-for='i in 6')
            i.el-icon-star-off
    .abf(v-if='error')
      .ta-c.fs-es.error-tips
        i.el-icon-circle-close-outline.mr-5.va-b
        span 加载失败...
    .abf(v-if='loading', v-loading='loading', element-loading-background='#00000000')
</template>

<script>
import { mapActions } from 'vuex'
import CountTo from 'vue-count-to'

export default {
  props: ['data'],
  mounted() {
    this.loading = true
    this.error = false
    this.fetch(this.weatherId)
  },
  data() {
    return {
      loading: false,
      error: false,
      info: null
    }
  },
  computed: {
    weatherId() {
      return this.data.id
    }
  },
  watch: {
    weatherId(val) {
      this.loading = true
      this.error = false
      this.fetch(val)
    }
  },
  methods: {
    ...mapActions('admin/weather', ['fetchWeatherInfo']),
    async fetch(weatherId) {
      try {
        await this.fetchWeatherInfo(weatherId)
        // console.log('old', weatherId, 'now', this.weatherId)
      } catch (error) {
        // console.log('old', weatherId, 'now', this.weatherId)
        if (this.weatherId === weatherId) {
          // console.log('done', weatherId)
          this.error = true
        }
      }
      if (this.weatherId === weatherId) {
        // console.log('done', weatherId)
        this.loading = false
      }
    }
  },
  components: {
    CountTo
  }
}
</script>

<style lang="stylus" scoped>
.line
  height 1px
  background #8da7dd45
.prop-item
  color rgb(141, 167, 221)
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
.abf
  absolute left top right bottom
  bottom 60px
.we-card
  position relative
  margin auto
  width 360px
  border-color #ecf5ff
  color #97a8be
  .wow
    font-size 5em
  .logod
    font-size 3em
.error-tips
  position absolute
  top 50%
  margin-top -1em
  right 0
  left 0
  color #8da7dd
ul.grid-wrap
  overflow hidden
  list-style none
  padding 0
  border 1px solid #ecf5ff
  border-radius 4px
  background-image linear-gradient(180deg, #ffffff 0%, rgba(151,8,204,0) 100%)
  li
    float left
    width 16.66%
    min-width 150px
    text-align center
    height 280px
    line-height @height
    color #666
    font-size 13px
    transition color .15s linear
    border-right 1px solid #ecf5ff
    border-bottom 1px solid #ecf5ff
    margin-right -1px
    margin-bottom -1px
</style>

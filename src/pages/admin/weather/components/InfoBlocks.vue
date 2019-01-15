<template lang="pug">
  .p-10
    template(v-for='item in data')
      .box-wrap.p-10
        .box(:class='{ target: target && item.label === target }')
          svg-icon.logod.f-l(:icon='"wh-" + item.icon')
          .f-l
            .fs-es.fw-b.ml-10.pl-5.pb-5.pt-5.label {{ item.label }}
            .fs-es.ml-10.pl-5.pt-3.data(v-if='item.data instanceof Array')
              template(v-for='(i, index) in item.data')
                span.sep.fw-s(v-if='index') /
                count-to(v-if='typeof i === "number"', :start-val='0', :end-val='i', :duration='2000', :decimals='0', autoplay, separator='')
                template(v-if='typeof i === "object" && typeof i.value === "number"')
                  svg-icon.M(v-if='i.icon', :icon='"we-" + i.icon')
                  count-to(:start-val='0', :end-val='i.value', :duration='2000', :decimals='i.decimals || 0', autoplay, :separator='i.separator || ""', :prefix='i.prefix || ""', :suffix='i.suffix || ""')
                template(v-if='typeof i === "object" && typeof i.value === "string"')
                  svg-icon.M(v-if='i.icon', :icon='"we-" + i.icon')
                  span {{ i.value }}
            .fs-es.ml-10.pl-5.pt-3.data(v-if='typeof item.data === "number"')
              count-to(:start-val='0', :end-val='item.data', :duration='2000', :decimals='0', autoplay, separator='')
            .fs-es.ml-10.pl-5.pt-3.data(v-if='typeof item.data === "string"')
              span {{ item.data }}
          .f-c
    .box-wrap.p-10
      .box.squared.ta-c.fs-es
        i.el-icon-plus.logod
        span 更多
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    data: {
      type: Array
    },
    target: {
      type: String,
      required: false
    }
  },
  components: {
    CountTo
  }
}
</script>

<style lang="stylus" scoped>
.box-wrap
  display block
  max-width 300px
  overflow hidden
.box
  background #fff
  border-radius 3px
  cursor pointer
  box-shadow rgba(163,142,183,0.08) 0px 2px 8px 0px
  transition box-shadow .25s
  padding 1em

  &:hover
    box-shadow rgba(73, 7, 136, 0.13) 0px 2px 8px 0px
    .data
      color #666
  .logod
    font-size 2em
    padding .25em
  &.squared
    color #c0c4cc
    background transparent
    outline dashed 1px
    &:hover, &
      box-shadow none
    .logod
      font-size 1em
      padding .25em
  &.target
    background-image linear-gradient(225deg, #3585f9 10px, rgba(0,0,0,.01) 0)
  .label
    color rgba(0,0,0,0.45)
    max-width 190px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .data
    color #97a8be
    max-width 190px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    transition color .28s
  .sep
    color #66b1ff
</style>

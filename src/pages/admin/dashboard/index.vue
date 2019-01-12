<template lang="pug">
  .p-10
    template(v-for='item in infos')
      .box-wrap.p-10
        .box
          svg-icon.f-l(:icon='"quick-" + item.icon')
          .f-l
            .fs-m.fw-b.ml-10.pl-5.pb-5.label {{ item.label }}
            .fs-s.fw-b.ml-10.pl-5.pt-5.data(v-if='item.data instanceof Array')
              template(v-for='(i, index) in item.data')
                span.sep.fw-s(v-if='index')  / 
                count-to(:start-val='0', :end-val='i', :duration='2000', :decimals='0', autoplay, separator='')
            .fs-s.fw-b.ml-10.pl-5.pt-5.data(v-if='typeof item.data === "number"')
              count-to(:start-val='0', :end-val='item.data', :duration='2000', :decimals='0', autoplay, separator='')
          .f-c
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  data() {
    return {
      infos: [
        {
          icon: 'device',
          label: '设备总数 / 在线 / 离线',
          sep: '/',
          data: [100, 20, 80]
        },
        { icon: 'user', label: '用户总数 / 在线 / 离线', data: [512, 12, 500] },
        { icon: 'data', label: '数据上传总量', data: 2048 }
      ]
    }
  },
  components: {
    CountTo
  }
}
</script>

<style lang="stylus" scoped>
.box-wrap
  display inline-block
.box
  background #fff
  width 220px
  border-radius 3px
  cursor pointer
  box-shadow rgba(163,142,183,0.08) 0px 2px 8px 0px
  transition box-shadow .25s
  padding 1em
  &:hover
    box-shadow rgba(73, 7, 136, 0.13) 0px 2px 8px 0px
  .svg-icon
    font-size 3em
  .label
    color rgba(0,0,0,0.45)
  .data
    color #666
  .sep
    color #66b1ff
</style>

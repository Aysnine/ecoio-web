<template lang="pug">
  el-carousel(:interval='4000', type='card', height='300px')
    el-carousel-item(v-for='item in cards', :key='item.title')
      h3
        svg-icon(:icon='"hero-" + item.icon', style='font-size: 3em')
        .title {{ item.title }}
</template>

<script>
export default {
  name: 'HeroCarousel',
  data() {
    return {
      cards: [
        { icon: 'alert', title: '时间就是对手，效益就是生命' },
        { icon: 'notice', title: '高性能数据流计算' },
        { icon: 'protected', title: '功耗状态实时掌握' },
        { icon: 'manage', title: '设备在线统一管理' }
      ]
    }
  }
}
</script>

<style lang="stylus">
.el-carousel__item
  h3
    color #475669
    font-size 24px
    text-align center
    font-weight 100
    line-height 100px
    padding 50px
    padding-top 80px
    height 300px
    margin 0
    background-color #fffe
    .title
      font-size 20px
</style>

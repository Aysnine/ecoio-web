<template lang="pug">
  el-container(style='height: calc(100vh - 60px);')
    el-aside.thin-bg-d(width='320px')
      el-scrollbar
        div(style='height: calc(100vh - 60px)')
          info-blocks(:data='infos', v-model='target')
    el-main.pm-0
      el-scrollbar
        div(style='height: calc(100vh - 60px)')
          weather-board(:data='targetInfo')
</template>

<script>
import InfoBlocks from './components/InfoBlocks'
import WeatherBoard from './components/WeatherBoard'

export default {
  data() {
    return {
      infos: [
        {
          icon: '晴',
          label: '四川省 / 自贡市 / 自流井区',
          sep: '/',
          data: [
            { value: 10, icon: 'airtemp', suffix: '°' },
            { value: 20, icon: 'humidity', suffix: '%' },
            { value: '3级 东南风', icon: 'speed' }
          ]
        },
        {
          icon: '多云',
          label: '四川省 / 成都市 / 武侯区',
          sep: '/',
          data: [
            { value: 20, icon: 'airtemp', suffix: '°' },
            { value: 20, icon: 'humidity', suffix: '%' },
            { value: '3级 东南风', icon: 'speed' }
          ]
        },
        {
          icon: '大雪',
          label: '四川省 / 广元市 / 利州区',
          sep: '/',
          data: [
            { value: 20, icon: 'airtemp', suffix: '°' },
            { value: 20, icon: 'humidity', suffix: '%' },
            { value: '3级 东南风', icon: 'speed' }
          ]
        }
      ],
      target: '四川省 / 自贡市 / 自流井区'
    }
  },
  computed: {
    targetInfo() {
      return this.infos.find(i => i.label === this.target) || null
    }
  },
  components: {
    InfoBlocks,
    WeatherBoard
  }
}
</script>

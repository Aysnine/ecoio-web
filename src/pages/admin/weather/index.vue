<template lang="pug">
  el-container(style='height: calc(100vh - 60px);')
    el-aside.thin-bg-d(width='320px')
      el-scrollbar
        div(style='height: calc(100vh - 60px)')
          info-blocks(:data='infos', v-model='target')
    el-main.pm-0
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
          id: '1',
          icon: '晴',
          label: '四川省 / 自贡市 / 自流井区',
          sep: '/',
          data: [
            { label: '气温', value: 10, icon: 'airtemp', suffix: '°' },
            { label: '湿度', value: 20, icon: 'humidity', suffix: '%' },
            { label: '风力', value: '3级 东南风', icon: 'speed' }
          ]
        },
        {
          id: '2',
          icon: '多云',
          label: '四川省 / 成都市 / 武侯区',
          sep: '/',
          data: [
            { label: '气温', value: 20, icon: 'airtemp', suffix: '°' },
            { label: '湿度', value: 20, icon: 'humidity', suffix: '%' },
            { label: '风力', value: '3级 东南风', icon: 'speed' }
          ]
        },
        {
          id: '3',
          icon: '大雪',
          label: '四川省 / 广元市 / 利州区',
          sep: '/',
          data: [
            { label: '气温', value: -30, icon: 'airtemp', suffix: '°' },
            { label: '湿度', value: 20, icon: 'humidity', suffix: '%' },
            { label: '风力', value: '5级 东南风', icon: 'speed' }
          ]
        },
        {
          id: '4',
          icon: '小雪',
          label: '北京市 / 北京城区 / 东城区',
          sep: '/',
          data: [
            { label: '气温', value: 20, icon: 'airtemp', suffix: '°' },
            { label: '湿度', value: 20, icon: 'humidity', suffix: '%' },
            { label: '风力', value: '1级 北风', icon: 'speed' }
          ]
        },
        {
          id: '5',
          icon: '小雪',
          label: '内蒙古自治区 / 呼和浩特市 / 土默特左旗',
          sep: '/',
          data: [
            { label: '气温', value: 20, icon: 'airtemp', suffix: '°' },
            { label: '湿度', value: 20, icon: 'humidity', suffix: '%' },
            { label: '风力', value: '1级 北风', icon: 'speed' }
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

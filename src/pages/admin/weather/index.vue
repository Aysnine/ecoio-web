<template lang="pug">
  el-container(style='height: calc(100vh - 60px);')
    // el-aside.thin-bg-g(width='320px')
    //   el-scrollbar
    //     div(style='height: calc(100vh - 60px)')
    //       info-blocks(:data='infos', v-model='target')
    // el-main.pm-0
    //   weather-board(:data='targetInfo')
    el-main.pm-0
      el-scrollbar
        div(style='height: calc(100vh - 60px)')
          info-blocks(:data='infos', v-model='target')
</template>

<script>
import InfoBlocks from './components/InfoBlocks'
import WeatherBoard from './components/WeatherBoard'
import { mapGetters, mapActions } from 'vuex'
import { get } from 'lodash'

const transer = ({
  code: id, province, city, forecast, wendu, shidu, fengli, fengxiang
}) => (
  {
    id,
    icon: get(forecast, 'weather[0].day.type'),
    label: `${province} / ${city}`,
    sep: '/',
    data: [
      { label: '气温', value: wendu, icon: 'airtemp', suffix: '°' },
      { label: '湿度', value: parseInt(shidu.slice(0, -1)), icon: 'humidity', suffix: '%' },
      { label: '风力', value: `${fengli} ${fengxiang}`, icon: 'speed' }
    ]
  }
)

export default {
  mounted() {
    this.trigger()
  },
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
        }
      ],
      target: '四川省 / 自贡市 / 自流井区'
    }
  },
  computed: {
    ...mapGetters(['weathers']),
    targetInfo() {
      return this.infos.find(i => i.label === this.target) || null
    }
  },
  mqtt: {
    '@/weather/#'(data, topic) {
      // console.log(data)
      // const target = this.infos.find(({ id }) => id === data.code)
      // if (target) {
        
      // }
      this.infos.push(transer(data))
    }
  },
  methods: {
    ...mapActions(['updateData']),
    trigger() {
      this.$mqtt.publish(
        'ecoio/trigger/publish_weather',
        // JSON.stringify(this.weathers)

      )
    }
  },
  components: {
    InfoBlocks,
    WeatherBoard
  }
}
</script>

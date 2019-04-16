<template lang="pug">
  el-container(style='height: calc(100vh - 60px);')
    el-main.pm-0
      el-scrollbar
        div(style='height: calc(100vh - 60px)')
          info-blocks(:data='infos', v-model='target')
</template>

<script>
import InfoBlocks from './components/InfoBlocks'
import WeatherBoard from './components/WeatherBoard'
import { mapGetters, mapActions } from 'vuex'
import { get, assign } from 'lodash'

const transer = ({
  code: id,
  province,
  city,
  forecast,
  wendu,
  shidu,
  fengli,
  fengxiang
}) => ({
  id,
  icon: get(forecast, 'weather[0].day.type'),
  label: `${province} / ${city}`,
  sep: '/',
  data: [
    { label: '气温', value: wendu, icon: 'airtemp', suffix: '°' },
    {
      label: '湿度',
      value: parseInt(shidu.slice(0, -1)),
      icon: 'humidity',
      suffix: '%'
    },
    { label: '风力', value: `${fengli} ${fengxiang}`, icon: 'speed' }
  ]
})

export default {
  mounted() {
    this.trigger()
  },
  data() {
    return {
      infos: [],
      target: ''
    }
  },
  computed: {
    ...mapGetters(['weathers']),
    targetInfo() {
      return this.infos.find(i => i.label === this.target) || null
    }
  },
  watch: {
    infos(value) {
      if (!this.target && value.length) {
        this.target = value[0].label
      }
    }
  },
  mqtt: {
    '@/weather/#'(data /*, topic */) {
      const target = this.infos.find(({ id }) => id === data.code)
      if (target) {
        assign(target, transer(data))
      } else {
        this.infos.push(transer(data))
      }
    }
  },
  methods: {
    ...mapActions(['updateData']),
    trigger() {
      this.$mqtt.publish(
        'ecoio/trigger/publish_weather',
        JSON.stringify(this.weathers)
      )
    }
  },
  components: {
    InfoBlocks,
    WeatherBoard
  }
}
</script>

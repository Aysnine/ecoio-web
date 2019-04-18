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
import { /* mapGetters,*/ mapActions } from 'vuex'
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

const defaultWeathers = [
  '101270503',
  '101270505',
  '101270506',
  '101270507',
  '101270601',
  '101270604',
  '101270605',
  '101270608',
  '101270701',
  '101270801',
  '101270901',
  '101270903',
  '101271601',
  '101271805',
  '101271817',
  '101271902',
  '101271910',
  '101272003',
  '101272005',
  '101272101',
  '101272102',
  '101272103',
  '101272104',
  '101272105'
]

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
    // ...mapGetters(['weathers']),
    weathers() {
      return defaultWeathers
    },
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

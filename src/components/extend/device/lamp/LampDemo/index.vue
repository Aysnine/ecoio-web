<template lang="pug">
  .wrap(:style='globalBackgorund')
    div
      lamp-shape(:core='core')
    .controls
      h3 开关
      el-switch(v-model='core.power')
      h3 亮度
      el-slider(v-model='core.lightness', :min='1', :max='10', :disabled='!core.power', :show-tooltip="false")
</template>

<script>
import LampShape from './components/LampShape'
import { assign } from 'lodash'

export default {
  props: ['id', 'room'],
  mounted() {
    this.$options.mqtt[this.room] = this.watcher
    this.send('core')
  },
  data() {
    return {
      core: {
        power: false,
        lightness: 1
      },
      t: {}
    }
  },
  watch: {
    'core.power'() {
      this.send('core')
    },
    'core.lightness'() {
      this.send('core')
    }
  },
  computed: {
    globalBackgorund() {
      if (!this.core.power) {
        return 'background-color: rgb(30, 30, 30)'
      }
      let x = ~~(25.5 * this.core.lightness * 0.6 + 100)
      return `background-color: rgb(${x}, ${x}, ${x})`
    }
  },
  methods: {
    watcher({ prop, data, t }) {
      if (t < this.t[prop]) {
        return
      }
      switch (prop) {
        case 'core':
          assign(this.core, data)
          break
      }
    },
    send(prop) {
      const t = +new Date()
      this.t[prop] = t
      this.$mqtt.publish(
        this.room,
        JSON.stringify({ prop, data: this.$data[prop], t })
      )
    }
  },
  components: {
    LampShape
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  position relative
  height 24em
  width 100%
  .controls
    position relative
    margin auto
    text-align center
    max-width 20em
</style>

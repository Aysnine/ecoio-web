<template lang="pug">
  div
    template(v-if='status !== "offline"')
      el-row
        el-col(:span='16')
          ghost-line-percent(ref='wt-line', label='实时耗能', :limit='100', color='#54a4f5', height='140px')
        el-col(:span='8')
          .pl-20
            div
              h3 开关
              el-switch(v-model='core.power')
            div
              h3 亮度
              el-slider(v-model='core.lightness', :min='1', :max='10', :disabled='!core.power', :show-tooltip="false")
    template(v-else)
      span 设备离线中...
</template>

<script>
import { find, assign } from 'lodash'
import GhostLinePercent from '@/components/extend/chart/GhostLinePercent'

export default {
  props: ['id', 'room'],
  mounted() {
    this.$options.mqtt[this.room] = this.watcher
  },
  data() {
    return {
      status: 'offline',
      core: {
        power: false,
        lightness: 1
      },
      pipe: {
        wt: 0
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
    },
    'pipe.wt'(v) {
      if (this.$refs['wt-line'])
        this.$refs['wt-line'].push(this.$tm().format('YYYY-MM-DD HH:mm:ss'), v)
    }
  },
  mqtt: {
    '@/device'(data) {
      const target = find(data, { client_id: 'device_' + this.id })
      this.status = target ? 'online' : 'offline'
    }
  },
  methods: {
    watcher({ prop, data, t }) {
      if (t && t < this.t[prop]) {
        return
      }
      switch (prop) {
        case 'core':
          assign(this.core, data)
          break
        case 'pipe':
          assign(this.pipe, data)
          break
      }
      this.t[prop] = t
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
    GhostLinePercent
  }
}
</script>

<template lang="pug">
  div
    template(v-if='status !== "offline"')
      div
        el-switch(v-model='core.power')
      div
        el-slider(v-model='core.lightness', :min='1', :max='10', :disabled='!core.power', :show-tooltip="false")
    template(v-else)
      span 设备离线中...
</template>

<script>
import { find, assign } from 'lodash'

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
  mqtt: {
    '@/device'(data) {
      const target = find(data, { client_id: 'device_' + this.id })
      this.status = target ? 'online' : 'offline'
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
  }
}
</script>

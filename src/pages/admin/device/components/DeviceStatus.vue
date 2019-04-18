<template lang="pug">
  el-tag(v-if='status === "online"', type='success') 在线
  el-tag(v-else='', type='info') 离线
</template>

<script>
import { find } from 'lodash'

export default {
  props: ['id'],
  data() {
    return {
      status: 'offline',
      target: null
    }
  },
  mqtt: {
    '@/device'(data) {
      const target = find(data, { client_id: 'device_' + this.id })
      this.status = target ? ((this.target = target), 'online') : 'offline'
    }
  }
}
</script>

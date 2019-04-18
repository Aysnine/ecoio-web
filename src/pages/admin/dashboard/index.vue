<template lang="pug">
  div
    info-blocks(:data='computedInfos')
    ghost-time-line.p-10.pt-20(:data='upline', setTitle='数据上传活跃量', :labelMap='{value: "数据传总量"}', height='520px')
</template>

<script>
import { intersection, map } from 'lodash'
import { mapGetters } from 'vuex'
import InfoBlocks from './components/InfoBlocks'
import GhostTimeLine from '@/components/extend/chart/GhostTimeLine'

export default {
  mounted() {
    this.$store.dispatch('admin/account/init')
    this.$timer.start('comSave')
  },
  data() {
    return {
      device: [0, 0, 0],
      user: [0, 0, 0],
      upload: 0,
      upline: [],
      save: 0
    }
  },
  computed: {
    ...mapGetters(['userRole', 'devices']),
    ...mapGetters('admin/account', ['accountList']),
    infos() {
      return [
        {
          icon: 'device',
          label: '设备总数 / 在线 / 离线',
          sep: '/',
          data: this.device
        },
        { icon: 'data', label: '数据上传总量', data: this.upload },
        {
          icon: 'user',
          label: '用户总数 / 在线 / 离线',
          data: this.user,
          role: 'admin'
        }
      ]
    },
    computedInfos() {
      return this.infos.filter(({ role }) => !role || role === this.userRole)
    }
  },
  watch: {
    accountList(v) {
      this.user = [v.length, 1, v.length - 1]
    }
  },
  timers: {
    comSave: {
      time: 1500,
      repeat: true,
      immediate: true
    }
  },
  mqtt: {
    'ecoio/device'(data) {
      const ids1 = map(data, ({ client_id }) =>
        client_id.replace('device_', '')
      )
      const ids2 = map(this.devices, 'id')
      const online = intersection(ids1, ids2).length
      const all = ids2.length
      this.device = [all, online, all - online]
    },
    'ecoio/device/#'() {
      this.save++
    }
  },
  methods: {
    comSave() {
      this.upload += this.save
      this.upline.push({
        value: this.save,
        time: this.$tm().format('YYYY-MM-DD HH:mm:ss')
      })
      this.save = 0
    }
  },
  components: {
    InfoBlocks,
    GhostTimeLine
  }
}
</script>

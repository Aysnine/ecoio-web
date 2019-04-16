<template lang="pug">
  .p-20
    el-row
      el-col(:xs='8', :sm='8', :md='8', :lg='8', :xl='8')
        ghost-gauge-percent(:value='cpuLast / 100', label='CPU', height='300px')
      el-col(:xs='16', :sm='16', :md='16', :lg='16', :xl='16')
        ghost-line-percent.pv-5(ref='cpu-line', label='CPU', :limit='100', color='#6972e8', height='140px')
        ghost-line-percent.pv-5(ref='mem-line', label='内存', :limit='100', color='#54a4f5', height='140px')
    .progress
      div
        .title
          .desc {{ cpuDesc }}
        el-progress(:percentage='cpuLast', color='#6972e8', text-inside, :stroke-width='18')
      div
        .title
          .desc {{ memDesc }}
        el-progress(:percentage='memLast', color='#54a4f5', text-inside, :stroke-width='18')
      div
        .title
          .desc {{ diskDesc }}
        el-progress(:percentage='diskLast', color='#67c23a', text-inside, :stroke-width='18')
</template>

<script>
import GhostGaugePercent from '@/components/extend/chart/GhostGaugePercent'
import GhostLinePercent from '@/components/extend/chart/GhostLinePercent'

export default {
  mounted() {
    if (this.$env__preview) {
      let dt = this.$tm()
      this.$options.preview_interval_timer = setInterval(() => {
        dt = dt.add(1, 'second')
        let cpu = 20 + ~~(Math.random() * 20)
        let mem = 40 + ~~(Math.random() * 10)
        let fdt = dt.format('YYYY-MM-DD HH:mm:ss')

        this.$refs['cpu-line'].push(fdt, cpu)
        this.$refs['mem-line'].push(fdt, mem)
        this.cpuLast = cpu
        this.memLast = mem
      }, 1000)
      setTimeout(() => {
        let disk = 20 + ~~(Math.random() * 2)
        this.diskLast = disk
      }, 1000)
    }
  },
  beforeDestroy() {
    if (this.$env__preview) {
      if (this.$options.preview_interval_timer)
        clearInterval(this.$options.preview_interval_timer)
    }
  },
  data() {
    return {
      cpuLast: 0,
      memLast: 0,
      diskLast: 0
    }
  },
  computed: {
    cpuDesc() {
      return `CPU ${((this.cpuLast / 100) * 8).toFixed(2)}GHz`
    },
    memDesc() {
      return `内存 ${((this.memLast / 100) * 4).toFixed(2)} / ${(4).toFixed(
        2
      )}G`
    },
    diskDesc() {
      return `存储 ${((this.diskLast / 100) * 40).toFixed(2)} / ${(40).toFixed(
        2
      )}G`
    }
  },
  components: {
    GhostGaugePercent,
    GhostLinePercent
  }
}
</script>

<style lang="stylus" scoped>
.progress
  padding: 50px 0
  *
    margin: 10px 0
  .desc
    padding: 0 10px
    display inline
    color #999
</style>

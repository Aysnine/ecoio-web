<template lang="pug">
  .p-20
    el-row.pv-20(:gutter='10')
      el-col(:xs='8', :sm='8', :md='8', :lg='8', :xl='8')
        ghost-gauge-percent(:value='0.4', label='CPU', height='300px')
      el-col(:xs='16', :sm='15', :md='15', :lg='15', :xl='16')
        ghost-line-percent.pv-5(label='CPU', :limit='60', color='#6972e8', height='140px')
        ghost-line-percent.pv-5(label='MEM', :limit='60', color='#54a4f5', height='140px')
        //- ghost-line-percent(label='内存')
          //- chart-cpu
          //- chart-mem
      //- .progress
      //-   div
      //-     .title
      //-       .desc {{ cpuDesc }}
      //-     el-progress(:percentage='cpu', color='#5c9cca')
      //-   div
      //-     .title
      //-       .desc {{ memDesc }}
      //-     el-progress(:percentage='mem', color='#8b84be')
      //-   div
      //-     .title
      //-       .desc {{ fsDesc }}
      //-     el-progress(:percentage='fs', color='#67c23a')
</template>

<script>
import GhostGaugePercent from '@/components/extend/chart/GhostGaugePercent'
import GhostLinePercent from '@/components/extend/chart/GhostLinePercent'

export default {
  components: {
    GhostGaugePercent,
    GhostLinePercent
  }
}
</script>

<style lang="stylus" scoped>
.progress
  padding: 15px 50px
  *
    margin: 10px 0
  .desc
    padding: 0 10px
    display inline
    color #999
</style>

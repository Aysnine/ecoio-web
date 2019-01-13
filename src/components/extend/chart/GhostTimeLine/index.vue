<template lang="pug">
  ve-line(:data='chartData', :settings='chartSettings', :extend='chartExtend', :legend-visible='false', :title='title', :height='height')
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/title'

import tm from 'dayjs'

export default {
  props: ['data', 'setTitle', 'labelMap', 'height'],
  data() {
    this.chartSettings = {
      area: true,
      labelMap: this.labelMap
    }
    this.title = {
      left: 40,
      text: this.setTitle,
      textStyle: {
        color: '#97a8be',
        fontWeight: 100
      }
    }
    this.chartExtend = {
      xAxis: {
        boundaryGap: false,
        axisLabel: {
          color: '#ccd7e5',
          rotate: 60,
          formatter(val) {
            return tm(val).format('MM/DD HH:mm')
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ccd7e5'
          }
        },
        axisPointer: {
          lineStyle: {
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0.3,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#fff' },
                { offset: 1, color: '#5b93f0' }
              ]
            }
          }
        }
      },
      yAxis: {
        axisLabel: {
          color: '#ccd7e5'
        },
        splitLine: false
      },
      series: {
        symbol: 'none',
        lineStyle: {
          width: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 0.3,
            x2: 0,
            y2: 0.5,
            colorStops: [
              { offset: 0, color: '#5b93f0' },
              { offset: 1, color: '#fff' }
            ]
          }
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#5b93f0' },
            { offset: 1, color: '#ffffff00' }
          ]
        }
      }
    }
    return {}
  },
  computed: {
    chartData() {
      return {
        columns: ['time', 'value'],
        rows: this.data
      }
    }
  },
  components: {
    VeLine
  }
}
</script>

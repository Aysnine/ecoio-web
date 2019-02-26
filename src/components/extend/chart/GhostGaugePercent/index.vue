<template lang="pug">
  ve-gauge(
    :data='chartData',
    :settings='chartSettings',
    :tooltip-visible='false'
    :height='height'
  )
</template>

<script>
import VeGauge from 'v-charts/lib/gauge.common'
import 'echarts/lib/component/title'

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ' '
    },
    value: Number,
    height: {
      type: String,
      required: false,
      default: '400px'
    }
  },
  data() {
    this.chartSettings = {
      dataType: {
        label: 'percent'
      },
      dataName: {
        label: this.label
      },
      seriesMap: {
        label: {
          center: ['50%', '55%'],
          radius: '70%',
          min: 0,
          max: 1,
          axisLine: {
            lineStyle: {
              color: [[0.1, '#44c9ff'], [0.8, '#6972e8'], [1, '#f56c6c']],
              width: 3,
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          // axisLabel: {
          //   textStyle: {
          //     fontWeight: 'bolder',
          //     color: '#97a8be'
          //   }
          // },
          axisTick: {
            length: 7,
            lineStyle: {
              color: 'auto',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 1,
              color: 'auto',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          title: {
            color: '#97a8be',
            fontWeight: '100',
            fontSize: 20,
            fontStyle: 'italic'
          }
        }
      }
    }
    return {
      chartData: {
        columns: ['type', 'value'],
        rows: [{ type: 'label', value: this.value }]
      }
    }
  },
  components: {
    VeGauge
  }
}
</script>

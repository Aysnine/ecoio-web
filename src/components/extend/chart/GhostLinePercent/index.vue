<template lang="pug">
  ve-line(
    :data='chartData',
    :colors='colors',
    :extend='extend',
    :tooltip-visible='false',
    :legend-visible='false',
    :title='title',
    :grid='grid',
    :data-zoom='dataZoom'
    :height='height'
  )
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: null
    },
    height: {
      type: String,
      required: false,
      default: '200px'
    },
    limit: {
      type: Number,
      required: false,
      default: 20
    },
    color: {
      type: String,
      required: false,
      default: '#2789c1'
    }
  },
  mounted() {
    // push data
    let dt = this.$tm('2018-01-07')
    setInterval(() => {
      dt = dt.add(1, 'day')
      let row = {
        t: dt.format('YYYY-MM-DD'),
        v: this.chartData.rows.length ? ~~(Math.random() * 30) : 0
      }
      if (this.chartData.rows.length > this.limit) {
        this.chartData.rows.shift()
      }
      this.chartData.rows.push(row)
    }, 500)
  },
  data() {
    // config
    const colors = [this.color]

    this.colors = colors
    this.title = {
      text: this.label,
      textStyle: {
        color: colors[0],
        opacity: 0.2,
        fontWeight: 100
      }
    }
    this.grid = {
      show: true,
      top: this.label ? 30 : 5,
      left: 5,
      right: 5,
      bottom: 5,
      borderColor: colors[0],
      containLabel: true,
      borderWidth: 1,
      shadowBlur: 0
    }
    this.settings = {
      area: true,
      xAxisType: 'time',
      yAxisType: 'value'
    }
    this.extend = {
      series(items) {
        items.map((item, index) => {
          item.animation = false
          item.symbol = 'none'
          item.smooth = false
          item.areaStyle = {
            color: colors[index],
            opacity: 0.05
          }
          item.lineStyle = {
            width: 1
          }
        })
        return items
      },
      xAxis: {
        max: 100,
        show: false,
        boundaryGap: false,
        splitLine: false,
        axisLabel: false,
        axisTick: false
      },
      yAxis: {
        max: 100,
        show: false,
        boundaryGap: false,
        splitLine: false,
        axisLabel: false,
        axisTick: false
      }
    }
    return {
      chartData: {
        columns: ['t', 'v'],
        rows: []
      }
    }
  },
  computed: {
    dataZoom() {
      return {
        zoomOnMouseWheel: false,
        moveOnMouseMove: false,
        moveOnMouseWheel: false,
        type: 'inside',
        zoomLock: true,
        startValue: this.chartData.rows.length - this.limit,
        endValue: this.chartData.rows.length - 1
      }
    }
  },
  components: {
    VeLine
  }
}
</script>

<template lang="pug">
  el-scrollbar
    div(style='height: calc(100vh - 60px)')
      .p-10
        .p-10.pv-20.fs-ees(style='color: #a9aece82')
          span CURRENT LOCATION
        .p-10.fs-el.fw-s(style='color: #8da7dd')
          i.el-icon-location.mr-5
          transition(name='power-switch', mode='out-in')
            span(:key='data.label') {{ data.label }}
    .abf(v-if='error')
      .ta-c(style='position: absolute; top: 50%; margin-top: -1em; right: 0; left: 0') 加载失败...
    .abf(v-if='loading', v-loading='loading', element-loading-background='#00000000')
</template>

<script>
const test = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (~~(Math.random() * 10) % 2) {
      resolve()
    } else {
      reject(new Error('boom'))
    }
  }, 1000)
})

export default {
  props: ['data'],
  mounted() {
    this.fetch(this.weatherId)
  },
  data() {
    return {
      loading: false,
      error: false
    }
  },
  computed: {
    weatherId() {
      return this.data.id
    }
  },
  watch: {
    weatherId(val) {
      this.fetch(val)
    }
  },
  methods: {
    async fetch(weatherId) {
      this.loading = true
      this.error = false
      try {
        await test()
      } catch(error) {
        this.error = true
        // ...
      }
      this.loading = false
      console.log(weatherId)
    }
  }
}
</script>

<style lang="stylus" scoped>
.power-switch
  &-enter-active
  &-leave-active
    transition all .28s
  &-enter
  &-leave-active
    opacity 0
    transform translateY(-10px)
  &-move
    transition all .28s
  &-leave-active
    position absolute
.abf
  absolute left top right bottom
  bottom 60px
</style>

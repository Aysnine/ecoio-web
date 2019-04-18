<template lang="pug">
  span hello {{ id }} {{ room }}
</template>

<script>
export default {
  props: ['id', 'room'],
  mounted() {
    this.$options.mqtt[this.room] = this.asyncCore
  },
  data() {
    return {
      core: {}
    }
  },
  methods: {
    asyncCore(data) {
      this.core = data
    },
    updateCore(data) {
      this.$mqtt.publish(this.room, JSON.stringify(data))
    }
  }
}
</script>

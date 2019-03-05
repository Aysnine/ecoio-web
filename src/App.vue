<template lang="pug">
  #app
    transition(name='el-fade-in', mode='out-in')
      router-view
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>

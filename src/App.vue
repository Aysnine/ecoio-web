<template lang="pug">
  #app
    transition(name='el-fade-in', mode='out-in')
      router-view
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async mounted() {
    const needReload = await this.init()
    if (needReload) location.reload()
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>

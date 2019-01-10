<template lang="pug">
  .wrap-layout
    el-container.vh-100.hero-bg
      el-header
        ghost-menu(:menu='menu')
      el-main.pm-0
        el-scrollbar(ref='main-scrollbar')
          div(style='height: calc(100vh - 60px)')
            transition(name='el-fade-in', mode='out-in')
              keep-alive
                router-view
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('splash', ['menu'])
  }
}
</script>

<template lang="pug">
  .wrap-layout
    el-container.vh-100.hero-bg
      el-header
        ghost-menu(:menu='menu')
      el-main.pm-0
        el-scrollbar(ref='main-scrollbar')
          div(style='height: calc(100vh - 120px)')
            transition(name='el-fade-in', mode='out-in')
              router-view
      el-footer.ta-c(style='color: #ffffffbf')
        span.fs-es= process.env.VUE_APP_FOOTER
          a(href=process.env.VUE_APP_GH_REPO, target='_blanck')
            el-button(type='text', style='color: #ff0')= ' @' + process.env.VUE_APP_GH_NAME
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('splash', ['menu'])
  }
}
</script>

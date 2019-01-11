<template lang="pug">
  .wrap-layout
    el-container
      el-container
        el-aside.hero-bg(width='240px')
          el-scrollbar(ref='aside-scrollbar')
            div.vh-100
              ghost-menu(:menu='menu', mode='vertical')
        el-container.vh-100
          el-header(style='line-height: 58px;')
            router-link(to='/')
              img(src='@/assets/logo.png', height='30', style='vertical-align: middle; cursor: pointer')
            .f-r
              el-button(round) 退出登陆
                i.el-icon-arrow-right.el-icon--right
          el-main.pm-0.vh-100.thin-bg
            el-scrollbar.hero-shadow-top(ref='main-scrollbar')
              div(style='height: calc(100vh - 60px)')
                transition(name='el-fade-in', mode='out-in')
                  keep-alive
                    router-view
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('admin', ['menu'])
  }
}
</script>

<template lang="pug">
  .wrap-layout
    el-container
      el-container
        el-aside.hero-bg(width='240px')
          el-scrollbar(ref='aside-scrollbar')
            div.vh-100
              ghost-menu(:menu='menu', mode='vertical')
        el-container.vh-100
          el-header(style='line-height: 60px')
            router-link.f-l(to='/')
              img.va-m(src='@/assets/logo.png', height='30')
            power-breadcrumb.f-l.ml-10
            .f-r
              el-button(round)
                svg-icon.B.mr-5(icon='m-account')
                span {{ userNickname }}
              el-button(round, @click='handleLogout') 退出登陆
                i.el-icon-arrow-right.el-icon--right
          el-main.pm-0.vh-100.thin-bg
            el-scrollbar.hero-shadow-top(ref='main-scrollbar')
              div(style='height: calc(100vh - 60px)')
                transition(name='el-fade-in', mode='out-in')
                  keep-alive
                    router-view
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userNickname']),
    ...mapGetters('admin', ['menu'])
  },
  methods: {
    ...mapActions(['userLogout']),
    async handleLogout() {
      try {
        await this.$confirm('确认退出登陆?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          await this.userLogout()
          this.$router.push('/login')
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.msg
          })
        }
      } catch {
        // cancel
      }
    }
  }
}
</script>

<template lang="pug">
  .heroed.p-10(style='padding-top: 2em')
    ghost-regist-form.ma(:handleRegist='handleRegist')
      .ta-c(slot='prepend')
        h3.title
          img.va-b(src='@/assets/logo-w.png', height='22')
          span.fw-s 用户注册
      .ta-c(slot='append') 
        span.fs-es
          i.el-icon-question
          |  已有账号？
        el-button.link(type='text', size='small', @click.native.prevent='handleLink') 立即登陆
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    handleLink() {
      this.$router.push({ name: 'SplashLogin' })
    },
    async handleRegist({ account, nickname, pass }) {
      try {
        let { msg } = await this.userRegist({ account, nickname, pass })
        this.$message.success(msg)
        // * Can't use push({ path, params })
        this.$router.push({ name: 'SplashLogin', params: { account, pass } })
      } catch (error) {
        this.$message.error(error.msg)
      }
    },
    ...mapActions(['userRegist'])
  }
}
</script>

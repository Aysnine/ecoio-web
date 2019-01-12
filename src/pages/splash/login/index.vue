<template lang="pug">
  .heroed.p-10(style='padding-top: 4em')
    ghost-login-form.ma
      .ta-c(slot='prepend')
        h3.title
          img.va-b(src='@/assets/logo-w.png', height='22')
          span.fw-s= process.env.VUE_APP_TITLE_BODY
      .ta-c(slot='append') 
        span.fs-es
          i.el-icon-question
          |  没有账号？
        el-button.link(type='text', size='small', @click.native.prevent='handleLink') 立即注册
</template>

<script>
export default {
  methods: {
    handleLink() {
      this.$router.push({ name: 'SplashRegist' })
    }
  }
}
</script>

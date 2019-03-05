<template lang="pug">
  el-form.ghost-form(size='normal', :model='form', :rules='rules', ref='form', label-width='0', auto-complete='on', status-icon, :disabled='loading')
    slot(name='prepend')
    el-form-item.pt-20(prop='account')
      el-input(v-model='form.account', placeholder='账号', clearable, autofocus)
        svg-icon.M.ph-3(slot='prefix', icon='form-username')
    el-form-item.pb-20(prop='pass')
      el-input(type='password', v-model='form.pass', placeholder='密码', clearable, @keyup.enter.native='submitForm("form")')
        svg-icon.M.ph-3(slot='prefix', icon='form-password')
    el-form-item
      el-button.w-100.s-1em(type='primary', :icon='loading ? "el-icon-loading":null', @click.native.prevent='submitForm("form")') {{ loading ? '' : '登陆' }}
    slot(name='append')
</template>

<script>
export default {
  props: {
    handleLogin: {
      type: Function,
      required: true
    }
  },
  mounted() {
    if (this.$env__preview) {
      this.form.account = 'admin'
      this.form.pass = 'admin'
    }
  },
  data() {
    return {
      loading: false,
      form: {
        account: '',
        pass: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'change' },
          {
            min: 5,
            max: 32,
            message: '长度在 5 到 32 个字符',
            trigger: 'change'
          }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          await this.handleLogin(this.form)
          this.loading = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

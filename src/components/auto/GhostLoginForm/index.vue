<template lang="pug">
  el-form.ghost-form(size='normal', :model='form', :rules='rules', ref='form', label-width='0', auto-complete='on', status-icon)
    slot(name='prepend')
    el-form-item.pt-20(prop='username')
      el-input(v-model='form.username', placeholder='账号', clearable, autofocus)
        svg-icon.M.ph-3(slot='prefix', icon='form-username')
    el-form-item.pb-20(prop='password')
      el-input(type='password', v-model='form.password', placeholder='密码', clearable, @keyup.enter.native='submitForm("form")')
        svg-icon.M.ph-3(slot='prefix', icon='form-password')
    el-form-item
      el-button.w-100.s-1em(type='primary', @click.native.prevent='submitForm("form")') 登陆
    slot(name='append')
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'change' },
          {
            min: 5,
            max: 32,
            message: '长度在 5 到 32 个字符',
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

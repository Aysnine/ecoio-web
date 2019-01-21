<template lang="pug">
  el-form.ghost-form(size='normal', :model='form', :rules='rules', ref='form', label-width='0', auto-complete='on', status-icon)
    slot(name='prepend')
    el-form-item.pt-20(prop='account')
      el-input(v-model='form.account', placeholder='账号', clearable, autofocus)
        svg-icon.M.ph-3(slot='prefix', icon='form-username')
    el-form-item(prop='nickname')
      el-input(v-model='form.nickname', placeholder='昵称', clearable, autofocus)
        svg-icon.M.ph-3(slot='prefix', icon='form-username')
    el-form-item(prop='password')
      el-input(type='password', v-model='form.password', placeholder='密码', clearable, @keyup.enter.native='submitForm("form")')
        svg-icon.M.ph-3(slot='prefix', icon='form-password')
    el-form-item.pb-20(prop='repassword')
      el-input(type='password', v-model='form.repassword', placeholder='重复以确认密码', clearable, @keyup.enter.native='submitForm("form")')
        svg-icon.M.ph-3(slot='prefix', icon='form-password')
    el-form-item
      el-button.w-100(type='primary', @click.native.prevent='submitForm("form")') 提交注册信息
    slot(name='append')
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: '',
        nickname: '',
        password: '',
        repassword: ''
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
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (role, value, cb) => {
              this.form.password === value
                ? cb()
                : cb(new Error('两次密码输入不一致'))
            },
            trigger: 'blur'
          }
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

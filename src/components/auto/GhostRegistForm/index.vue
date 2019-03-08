<template lang="pug">
  el-form.ghost-form(size='normal', :model='form', :rules='rules', ref='form', label-width='0', auto-complete='on', status-icon, :disabled='loading')
    slot(name='prepend')
    el-form-item.pt-20(prop='account')
      el-input(v-model='form.account', placeholder='账号', clearable, autofocus)
        svg-icon.M.ph-3(slot='prefix', icon='form-username')
    el-form-item(prop='nickname')
      el-input(v-model='form.nickname', placeholder='昵称', clearable, autofocus)
        svg-icon.M.ph-3(slot='prefix', icon='form-username')
    el-form-item(prop='pass')
      el-input(type='password', v-model='form.pass', placeholder='密码', clearable, @keyup.enter.native='submitForm()')
        svg-icon.M.ph-3(slot='prefix', icon='form-password')
    el-form-item.pb-20(prop='repass')
      el-input(type='password', v-model='form.repass', placeholder='重复以确认密码', clearable, @keyup.enter.native='submitForm()')
        svg-icon.M.ph-3(slot='prefix', icon='form-password')
    el-form-item
      el-button.w-100(type='primary', :icon='loading ? "el-icon-loading":null', @click.native.prevent='submitForm()') {{ loading ? '' : '提交注册信息' }}
    slot(name='append')
</template>

<script>
export default {
  props: {
    handleRegist: {
      type: Function,
      required: true
    }
  },
  mounted() {
    if (this.$env__preview) {
      const randomName =
        'user' +
        Math.random()
          .toString()
          .slice(-4)
      const defaultPass = '123456'
      this.form.account = randomName
      this.form.nickname = randomName
      this.form.pass = defaultPass
      this.form.repass = defaultPass
    }
  },
  data() {
    return {
      loading: false,
      form: {
        account: '',
        nickname: '',
        pass: '',
        repass: ''
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
          { required: true, message: '请输入昵称', trigger: 'change' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ],
        repass: [
          { required: true, message: '请再次输入密码', trigger: 'change' },
          {
            validator: (role, value, cb) => {
              this.form.pass === value
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
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          await this.handleRegist(this.form)
          this.loading = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

<template lang="pug">
  el-dialog(title='添加设备', :visible.sync='dialogFormVisible', width='30em')
    el-form(ref='form', :model='form', :rules='rules')
      el-form-item(label='设备名称', prop='name', :label-width='formLabelWidth')
        el-input(v-model='form.name', autocomplete='off', placeholder='请输入')
      el-form-item(label='设备类型', prop='type', :label-width='formLabelWidth')
        el-select(v-model='form.type', placeholder='请选择')
          el-option(label='智能灯', value='lamp')
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false') 取 消
      el-button(type='primary', @click='handleSubmit') 确 定
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        name: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  methods: {
    show() {
      this.dialogFormVisible = true
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          return false
        }
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

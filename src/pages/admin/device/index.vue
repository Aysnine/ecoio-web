<template lang="pug">
  div.p-10
    .p-10
      el-button(type='primary', icon='el-icon-plus', circle)
      el-input.ml-10.circled(placeholder='请输入搜索内容', prefix-icon='el-icon-search', v-model='search', clearable, style='width: 200px')
    .p-10
      el-table.hero-block(
        :data='tableData'
        tooltip-effect='dark'
        style='width: 100%'
        height='calc(100vh - 160px)'
      )
        el-table-column(type='index', width='40')
        el-table-column(label='日期', width='120')
          template(slot-scope='scope') {{ scope.row.date }}
        el-table-column(prop='name', label='姓名', width='120')
        el-table-column(prop='address', label='地址', show-overflow-tooltip='')
</template>

<script>
export default {
  data() {
    return {
      search: '',
      tableData: []
    }
  },
  methods: {
    // ...
  }
}
</script>

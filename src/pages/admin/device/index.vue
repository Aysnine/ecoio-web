<template lang="pug">
  div.p-10
    .p-10
      el-button(type='danger', icon='el-icon-delete', circle)
      el-button(type='primary', icon='el-icon-plus', circle)
      el-input.ml-10.circled(placeholder='请输入搜索内容', prefix-icon='el-icon-search', v-model='search', clearable, style='width: 200px')
    .p-10
      el-table.hero-block(ref='multipleTable', :data='tableData3', tooltip-effect='dark', style='width: 100%', @selection-change='handleSelectionChange', height='calc(100vh - 160px)')
        el-table-column(type='selection', width='40')
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
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

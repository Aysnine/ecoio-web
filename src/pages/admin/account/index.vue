<template lang="pug">
  div.p-10
    .p-10
      el-input.circled(placeholder='请输入搜索内容', prefix-icon='el-icon-search', v-model='search', clearable, style='width: 200px')
    .p-10
      el-table.hero-block(:data='tableData', v-loading='loading', tooltip-effect='dark', style='width: 100%', height='calc(100vh - 160px)')
        el-table-column(type='index', width='40')
        el-table-column(label='账号', prop='account', width='120')
        el-table-column(label='昵称', prop='nickname', width='120')
        el-table-column(label='角色', prop='role')
        el-table-column(fixed='right', align='right')
          template(slot-scope='scope')
            el-button(v-if='scope.row.role !== "admin"', type='danger', plain, icon='el-icon-delete', @click='handleDelete(scope)') 删除
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Fuse from 'fuse.js'

export default {
  mounted() {
    this.init()
  },
  data() {
    return {
      search: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('admin/account', ['accountList']),
    tableData() {
      return this.search
        ? new Fuse(this.accountList, {
            shouldSort: true,
            tokenize: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['account', 'nickname', 'role']
          }).search(this.search)
        : this.accountList
    }
  },
  methods: {
    ...mapActions('admin/account', ['init', 'deleteAccount']),
    async handleDelete(scope) {
      try {
        await this.$confirm('确定执行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.loading = true
        try {
          await this.deleteAccount(scope.row.id)
          this.$message.success('删除成功')
        } catch {
          this.$message.error('删除失败')
        }
        this.loading = false
      } catch {
        // ...
      }
    }
  }
}
</script>

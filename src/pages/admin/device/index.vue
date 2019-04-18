<template lang="pug">
  div.p-10
    .p-10
      el-button(type='primary', icon='el-icon-plus', circle, @click='handleNewDevice')
      el-input.ml-10.circled(placeholder='请输入搜索内容', prefix-icon='el-icon-search', v-model='search', clearable, style='width: 200px')
    .p-10
      el-table.hero-block(:data='tableData', v-loading='loading', tooltip-effect='dark', style='width: 100%', height='calc(100vh - 160px)')
        el-table-column(type='index', width='40')
        el-table-column(label='设备名称', prop='name', width='120')
        el-table-column(label='设备类型', prop='type')
          template(slot-scope='scope')
            | 智能灯
        el-table-column(label='状态')
          template(slot-scope='scope')
            device-status(:id='scope.row.id')
        el-table-column(label='详情', type='expand')
          template(slot-scope='scope')
            lamp-controller(:id='scope.row.id', :room='"ecoio/device/" + userId + "/" + scope.row.id')
        el-table-column(label='操作', fixed='right', align='right')
          template(slot-scope='scope')
            el-button(type='primary', plain, icon='el-icon-view', @click='handleDemo(scope)') 模拟
            el-button(v-if='scope.row.role !== "admin"', type='danger', plain, icon='el-icon-delete', @click='handleDelete(scope)') 删除
    new-device-dialog(ref='new', @submit='handleNew')
</template>

<script>
import NewDeviceDialog from './components/NewDeviceDialog'
import { mapActions, mapGetters } from 'vuex'
import Fuse from 'fuse.js'
import DeviceStatus from './components/DeviceStatus'
import LampController from '@/components/extend/device/lamp/LampController'
import qs from 'querystring'

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
    ...mapGetters(['userId']),
    ...mapGetters('admin/device', ['deviceList']),
    tableData() {
      return this.search
        ? new Fuse(this.deviceList, {
            shouldSort: true,
            tokenize: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['name']
          }).search(this.search)
        : this.deviceList
    }
  },
  methods: {
    ...mapActions('admin/device', ['init', 'deleteDevice', 'newDevice']),
    async handleNewDevice() {
      this.$refs['new'].show()
    },
    async handleDelete(scope) {
      try {
        await this.$confirm('确定执行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.loading = true
        try {
          await this.deleteDevice(scope.row.id)
          this.$message.success('删除成功')
        } catch {
          this.$message.error('删除失败')
        }
        this.loading = false
      } catch {
        // ...
      }
    },
    async handleNew(form) {
      this.loading = true
      try {
        await this.newDevice(form)
        this.$message.success('添加成功')
      } catch {
        this.$message.error('添加失败')
      }
      this.loading = false
    },
    handleDemo(scope) {
      window.open(
        window.location.origin +
          '/#/spy/lamp?' +
          qs.stringify({
            id: scope.row.id,
            room: `ecoio/device/${this.userId}/${scope.row.id}`
          })
      )
    }
  },
  components: {
    NewDeviceDialog,
    DeviceStatus,
    LampController
  }
}
</script>

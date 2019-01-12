<template lang="pug">
  div
    info-blocks(:data='infos')
</template>

<script>
import InfoBlocks from './components/InfoBlocks'

export default {
  data() {
    return {
      infos: [
        {
          icon: 'device',
          label: '设备总数 / 在线 / 离线',
          sep: '/',
          data: [100, 20, 80]
        },
        { icon: 'user', label: '用户总数 / 在线 / 离线', data: [512, 12, 500] },
        { icon: 'data', label: '数据上传总量', data: 2048 }
      ]
    }
  },
  components: {
    InfoBlocks
  }
}
</script>

<template lang="pug">
  LampDemo(:id='id', :room='room')
</template>

<script>
import LampDemo from '@/components/extend/device/lamp/LampDemo'
import qs from 'querystring'

export default {
  data() {
    const { id, room } = qs.parse(window.location.href.split('?')[1])
    return { id, room }
  },
  components: {
    LampDemo
  }
}
</script>

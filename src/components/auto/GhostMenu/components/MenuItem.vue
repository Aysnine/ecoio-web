<template lang="pug">
  el-menu-item(:index='item.path')
    span(slot='title')
      img(v-if='item.img', :src='"./assets/" + item.img', height='30')
      template(v-if='item.label') {{ item.label }}
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object
    }
  }
}
</script>

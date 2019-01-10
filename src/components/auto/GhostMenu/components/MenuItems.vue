<template lang="pug">
  el-submenu(:index='item.path')
    span(slot='title') {{ item.label }}
    template(v-for='child in item.children')
      menu-items(v-if='child.children', :item='child')
      menu-item(v-else, :item='child')
</template>

<script>
import MenuItem from './MenuItem'

export default {
  name: 'MenuItems',
  props: {
    item: {
      type: Object
    }
  },
  components: {
    MenuItem
  }
}
</script>

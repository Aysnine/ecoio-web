<template lang="pug">
  el-menu.ghost-menu(:default-active='$route.path', router, :mode='mode', menu-trigger='hover', :class='"ghost-menu--" + mode')
    template(v-for='item in menu')
      menu-items(v-if='item.children', :item='item', :class='{ "F-R": mode === "horizontal" && item.align === "right" }')
      menu-item(v-else, :item='item', :class='{ "F-R": mode === "horizontal" && item.align === "right" }')
</template>

<script>
import MenuItem from './components/MenuItem'
import MenuItems from './components/MenuItems'

export default {
  name: 'GhostMenu',
  props: {
    menu: {
      type: Array
    },
    mode: {
      require: false,
      default: 'horizontal'
    }
  },
  components: {
    MenuItem,
    MenuItems
  }
}
</script>

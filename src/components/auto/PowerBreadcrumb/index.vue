<template lang="pug">
  el-breadcrumb.power-breadcrumb(separator='/')
    transition-group(name='power-breadcrumb')
      el-breadcrumb-item(v-for='(item,index)  in levelList', :key='item.path', v-if='item.meta.title')
        span.no-redirect(v-if="item.redirect==='noredirect'||index==levelList.length-1") {{ item.meta.title }}
        router-link(v-else :to="item.redirect||item.path") {{ item.meta.title }}
</template>

<script>
export default {
  name: 'PowerBreadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [].concat(matched)
        // matched = [{ path: '/dashboard', meta: { title: '控制台' }}].concat(matched);
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="stylus" scoped>
.power-breadcrumb.el-breadcrumb
  display inline-block
  font-size 14px
  line-height 60px
  .no-redirect
    color #97a8be
    cursor text
/*fade*/
.power-breadcrumb
  &-enter-active
  &-leave-active
    transition all .5s
  &-enter
  &-leave-active
    opacity 0
    transform translateX(20px)
  &-move
    transition all .5s
  &-leave-active
    position absolute
</style>

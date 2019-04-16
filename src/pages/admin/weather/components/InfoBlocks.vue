<template lang="pug">
  .p-10
    .p-10
      el-button(type='primary', icon='el-icon-plus', circle)
      el-button(v-if='value', type='danger', icon='el-icon-delete', circle)
      el-input.ml-10.circled(placeholder='请输入搜索内容', prefix-icon='el-icon-search', v-model='search', clearable, style='width: 200px')
    template(v-for='item in computedData')
      .box-wrap.p-10
        .box(:class='{ target: value && item.label === value }', @click='$emit("input", item.label)')
          svg-icon.logod.f-l(:icon='"wh-" + item.icon')
          .f-l
            .fs-es.fw-b.ml-10.pl-5.pb-5.pt-5.label {{ item.label }}
            .fs-es.ml-10.pl-5.pt-3.data(v-if='isArray(item.data)')
              template(v-for='(i, index) in item.data')
                span.sep.fw-s(v-if='index') /
                count-to(v-if='typeof i === "number"', :start-val='0', :end-val='i', :duration='3000', :decimals='0', autoplay, separator='')
                template(v-if='typeof i === "object" && typeof i.value === "number"')
                  svg-icon.M(v-if='i.icon', :icon='"we-" + i.icon')
                  count-to(:start-val='0', :end-val='i.value', :duration='3000', :decimals='i.decimals || 0', autoplay, :separator='i.separator || ""', :prefix='i.prefix || ""', :suffix='i.suffix || ""')
                template(v-if='typeof i === "object" && typeof i.value === "string"')
                  svg-icon.M(v-if='i.icon', :icon='"we-" + i.icon')
                  span {{ i.value }}
            .fs-es.ml-10.pl-5.pt-3.data(v-if='typeof item.data === "number"')
              count-to(:start-val='0', :end-val='item.data', :duration='3000', :decimals='0', autoplay, separator='')
            .fs-es.ml-10.pl-5.pt-3.data(v-if='typeof item.data === "string"')
              span {{ item.data }}
          .f-c
    // .box-wrap.p-10(v-if='!search')
    //   .box.squared.ta-c.fs-es.ol-1
    //     i.el-icon-plus.logod
    //     span 添加
    // .box-wrap.p-10(v-if='!computedData.length')
    //   .box.squared.ta-c.fs-es
    //     i.el-icon-search.logod
    //     span 没有匹配项
</template>

<script>
import Fuse from 'fuse.js'
import CountTo from 'vue-count-to'

export default {
  props: {
    data: {
      type: Array
    },
    value: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    computedData() {
      return this.search
        ? new Fuse(this.data, {
            shouldSort: true,
            tokenize: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['label', 'icon', 'data.value']
          }).search(this.search)
        : this.data
    }
  },
  methods: {
    isArray(o) {
      return o instanceof Array
    }
  },
  components: {
    CountTo
  }
}
</script>

<style lang="stylus" scoped>
.ol-1
  outline dashed 1px
.box-wrap
  display inline-block
  width 300px
  overflow hidden
.box
  background #fff
  border-radius 3px
  cursor pointer
  box-shadow rgba(163,142,183,0.08) 0px 2px 8px 0px
  transition box-shadow .25s
  padding 1em
  &:hover
    box-shadow rgba(73, 7, 136, 0.13) 0px 2px 8px 0px
    .data
      color #666
  .logod
    font-size 2em
    padding .25em
  &.squared
    color rgba(169, 174, 206, 0.51)
    background transparent
    &:hover, &
      box-shadow none
    .logod
      font-size 1em
      padding .25em
  &.target
    background-image linear-gradient(225deg, #8da7dd 10px, rgba(0,0,0,0) 0)
  .label
    color rgba(0,0,0,0.45)
    max-width 180px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .data
    color #97a8be
    max-width 200px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    transition color .28s
  .sep
    color #66b1ff
</style>

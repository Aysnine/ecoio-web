<template lang="pug">
  div(style='padding: 30px 0; text-align: center')
    p(style='font-size: 4em; font-weight: bold; margin: 10px 0;') 404
    p.desc 页面不存在
    img(src='@/assets/fun.png', style='max-width: 360px; max-height: 360px;')
    p.desc
      router-link(to='/', style='margin: 1em')
        el-button(type='primary', round, icon='el-icon-location-outline') 返回首页
      el-button(type='primary', plain, round, icon='el-icon-arrow-left', @click='$router.go(-1)', style='margin: 1em') 上一页
</template>

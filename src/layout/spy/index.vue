<template lang="pug">
  .wrap-layout
    el-main.pm-0
      el-scrollbar(ref='main-scrollbar')
        div(style='height: calc(100vh - 120px)')
          transition(name='el-fade-in', mode='out-in')
            router-view
</template>

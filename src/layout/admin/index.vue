<template lang="pug">
  div
    p admin
    .nav
      router-link(to='/dashboard') dashboard
    transition(name='el-fade-in', mode='out-in')
      keep-alive
        router-view
</template>

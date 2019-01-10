<template lang="pug">
  #app
    transition(name='el-fade-in', mode='out-in')
      keep-alive
        router-view
</template>

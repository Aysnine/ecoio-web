<template lang="pug">
  #app
    .nav
      router-link(to='/') splash
      | |
      router-link(to='/admin') admin
    router-view
</template>

<template lang="pug">
  #app
    transition(name='el-fade-in', mode='out-in')
      router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async mounted() {
    const needReload = await this.init()
    if (needReload) return location.reload()
  },
  computed: {
    ...mapGetters(['userAccount'])
  },
  watch: {
    userAccount(value) {
      if (this.$env__real_mqtt) {
        /* Dynamic switch mqtt account & connection */
        if (value) {
          this.$mqtt
            .login({ username: 'hello', password: 'hello' })
            .alias('account', 'hello')
            .subscribe('@/user/$account/#')
        } else {
          this.$mqtt
            .alias('account', null)
            .unsubscribe('@/user/$account/#')
            .logout()
        }
      }
    }
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>

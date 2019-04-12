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
    ...mapGetters(['userAccount', 'userId', 'token'])
  },
  watch: {
    userAccount(value) {
      if (this.$env__real_mqtt) {
        /* Dynamic mqtt connection */
        if (value) {
          this.$mqtt
            .login({
              clientId: `user_${this.userId}_${this.token}`,
              username: value,
              password: 'NONE'
            })
            .subscribe('ecoio/#')
        } else {
          this.$mqtt.unsubscribe('ecoio/#').logout()
        }
      }
    }
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>

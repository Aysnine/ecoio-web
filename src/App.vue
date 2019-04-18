<template lang="pug">
  #app
    transition(name='el-fade-in', mode='out-in')
      router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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
            .alias('user', this.userId)
            .subscribe([
              'ecoio/weather',
              'ecoio/device',
              `ecoio/device/${this.userId}/#`
            ])
        } else {
          this.$mqtt.alias('user', undefined).logout()
        }
      }
    }
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>

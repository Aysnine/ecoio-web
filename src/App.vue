<template lang="pug">
  #app
    transition(name='el-fade-in', mode='out-in')
      router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import qs from 'querystring'

export default {
  computed: {
    ...mapGetters(['userAccount', 'userId', 'token'])
  },
  watch: {
    userAccount(value) {
      if (this.$env__real_mqtt) {
        /* Dynamic mqtt connection */
        if (value) {
          const { id, room } = qs.parse(window.location.href.split('?')[1])
          this.$mqtt
            .login({
              clientId: id ? `device_${id}` : `user_${this.userId}`,
              username: value,
              password: 'NONE'
            })
            .alias('user', this.userId)
            .subscribe(
              id
                ? [room]
                : [
                    'ecoio/weather/#',
                    'ecoio/device',
                    `ecoio/device/${this.userId}`,
                    `ecoio/device/${this.userId}/#`
                  ]
            )
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

import Vue from 'vue'

/* PWA support */
import './lib/main/pwa/registerServiceWorker'

/* Base plugin */
import $cookie from '@/lib/main/$cookie'
import $log from '@/lib/main/$log'
import $tm from 'dayjs'

const plugin = {
  // for other use
  $cookie: $cookie(
    process.env.VUE_APP_MAIN_COOKIE_DOMAIN || '',
    process.env.VUE_APP_MAIN_COOKIE_VERSION || ''
  ),
  $log,
  $tm,

  // for vue plugin
  install(Vue) {
    Vue.prototype.$cookie = this.$cookie
    Vue.prototype.$log = this.$log
    Vue.prototype.$tm = this.$tm
  }
}

Vue.use(plugin)

export default plugin

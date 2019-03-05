import Vue from 'vue'

/* Global pregress bar */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

/* Global request lib */
import request from './lib/main/el-request'

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
  $progress: NProgress,
  $request: request({ start: NProgress.start, done: NProgress.done }),

  // for vue plugin
  install(Vue) {
    Vue.prototype.$cookie = this.$cookie
    Vue.prototype.$log = this.$log
    Vue.prototype.$tm = this.$tm
    Vue.prototype.$progress = this.$progress
    Vue.prototype.$request = this.$request
  }
}

Vue.use(plugin)

export default plugin

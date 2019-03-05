import Vue from 'vue'

/* PWA support */
import '@/lib/main/pwa/registerServiceWorker'

/* Global pregress */
import $Progress from '@/lib/main/progress'
export const $progress = $Progress()

/* Global request */
import $Request from '@/lib/main/$request'
export const $request = $Request({
  start: $progress.start,
  done: $progress.done
})

/* Global Cookie storager */
import $Cookie from '@/lib/main/$cookie'
export const $cookie = $Cookie(
  process.env.VUE_APP_MAIN_COOKIE_DOMAIN || '',
  process.env.VUE_APP_MAIN_COOKIE_VERSION || ''
)

/* Global logger (console) */
import $Log from '@/lib/main/$log'
export const $log = $Log

/* Global time lib (dayjs) */
import $Tm from 'dayjs'
export const $tm = $Tm

/* For vue instance */
Vue.use({
  install(Vue) {
    Vue.prototype.$cookie = $cookie
    Vue.prototype.$log = $log
    Vue.prototype.$tm = $tm
    Vue.prototype.$progress = $progress
    Vue.prototype.$request = $request
  }
})

/* For public */
export default {
  $cookie,
  $log,
  $tm,
  $progress,
  $request
}

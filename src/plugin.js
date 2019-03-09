import Vue from 'vue'
import router from '@/router'

/* PWA support */
import '@/lib/main/pwa/registerServiceWorker'

/* Global pregress */
import $Progress from '@/lib/main/progress'
export const $progress = $Progress()

/* Global request */
import $Request from '@/lib/main/request'
// show progress
export const $request = $Request({
  start: $progress.start,
  done: $progress.done
})

/* Global Cookie storager */
import $Cookie from '@/lib/main/cookie'
export const $cookie = $Cookie(
  process.env.VUE_APP_MAIN_DOMAIN || '',
  process.env.VUE_APP_MAIN_COOKIE_VERSION || ''
)

/* Global logger (console) */
import $Log from '@/lib/main/logger'
export const $log = $Log

/* Global time lib (dayjs) */
import $Tm from 'dayjs'
export const $tm = $Tm

/* Global router witch */
import $Witch from '@/lib/main/witch-suit'
import rules from '@/router/rules'
export const $witch = $Witch(router).rules(rules)
// show progress
$witch.before(() => $progress.start())
$witch.after(() => $progress.done())

/* Global mqtt client */
// ! in test
import $MQTT from '@/lib/main/mqtt'
Vue.use($MQTT, process.env.VUE_APP_MAIN_MQTT_CONNECTION, {
  username: process.env.VUE_APP_MAIN_MQTT_USERNAME,
  password: process.env.VUE_APP_MAIN_MQTT_PASSWORD
})

/* For vue instance */
Vue.use({
  install(Vue) {
    Vue.prototype.$cookie = $cookie
    Vue.prototype.$log = $log
    Vue.prototype.$tm = $tm
    Vue.prototype.$progress = $progress
    Vue.prototype.$request = $request
    Vue.prototype.$witch = $witch
  }
})

/* For public */
export default {
  $cookie,
  $log,
  $tm,
  $progress,
  $request,
  $witch
}

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
import { rules, init } from '@/router/witch'
export const $witch = $Witch(router)
  .rules(rules)
  .init(init)
// show progress
$witch.before(async () => $progress.start())
$witch.after(() => $progress.done())

/* Global mqtt client */
import $MQTT from '@/lib/main/mqtt'
export const $mqtt = $MQTT({
  connectionString: process.env.VUE_APP_MAIN_MQTT_CONNECTION_STRING,
  topicPrefix: process.env.VUE_APP_MAIN_MQTT_TOPIC_PREFIX,
  convert: string => {
    try {
      const json = JSON.parse(string)
      return json
    } catch {
      return null
    }
  }
})

/* For vue instance */
Vue.use($mqtt.vue)
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
  $witch,
  $mqtt
}

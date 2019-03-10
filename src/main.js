import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

if (process.env.VUE_APP_PREVIEW === 'on') {
  require('@/mock/http')
}

import './plugin'
import './components'

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' })

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.styl'

Vue.config.productionTip = false
Vue.prototype.$env__preview = process.env.VUE_APP_PREVIEW === 'on'
// Vue.prototype.$env__real_mqtt = process.env.VUE_APP_MAIN_REAL_MQTT === 'on'
Vue.prototype.$env__real_mqtt = false

Vue.prototype.$sleep = ms =>
  new Promise(y => {
    setTimeout(() => y(), ms)
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

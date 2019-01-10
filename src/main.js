import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugin'
import './components'

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' })

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

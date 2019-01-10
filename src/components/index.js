import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

/**
 * Import custom global compoennts here like following
 */
// import CustomComponent from './path/to/CustomComponent'
// Vue.components(CustomComponent.name, CustomComponent)

/**
 * Auto import components like:
 *  ./auto/[ComponentName]/index.vue
 *  ./auto/path/[ComponentName]/index.vue
 */
;(r =>
  r.keys().forEach(fileName => {
    const config = r(fileName)
    const name = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\/index\.\w+$/, '$1'))
    )
    Vue.component(name, config.default || config)
  }))(require.context('./auto', true, /index\.(vue)$/))

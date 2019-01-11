import Vue from 'vue'

const iconMap = (r => r.keys().map(r))(
  require.context('./icons', false, /\.svg$/)
)

Vue.prototype.$SvgIcons = iconMap.map(e => e.default.id.slice(5))

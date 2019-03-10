# witch-suit

用于 vue-router 路由拦截，通过包装 router 实例的 `beforeEach`、`afterEach` 方法，实现配置化的拦截规则匹配与拦截处理。

## Usage

`main.js`：

``` js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// step1: 引入 lib
import $Witch from 'path/to/witch-suit'
// step2: 传入 router 实例化一个 witch
const $witch = $Witch(router)
// step3: 载入规则
$witch.rules([
  {
    // 匹配 router 访问路径
    match: '/admin/**',

    // 在此处进行动态验证
    // 返回 true 可访问，false 不可访问
    validator() {
      return false
    },

    // validator 返回 false 时触发 reactor
    // reactor 为字符串，会进行路由跳转
    // reactor: '/404' 为简写
    // 啥也不返回就不跳转
    reactor() {
      console.log('必不可能让你访问！')
      return '/404'
    }
  }

  // ...从上到下匹配，直到匹配到为止
])

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
```

每次路由跳转都会触发 witch 去走验证流程，如果需要在开始验证和结束验证时运行自定义的动作，比如加入进度条：

``` js
import $Witch from '@/lib/main/witch-suit'
import rules from '@/router/rules'
export const $witch = $Witch(router).rules(rules)
// show progress
$witch.before(() => $progress.start())
$witch.after(() => $progress.done())
```

此处的 `$progress` 是自定义的进度条。

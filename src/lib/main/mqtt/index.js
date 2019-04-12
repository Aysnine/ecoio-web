import MQTT from 'mqtt'

function Emitter({ prefix }) {
  let alias = {}
  let listeners = new Map()

  const instance = {
    addAlias(label, path) {
      alias[label] = path
    },
    addListener(label, callback, vm) {
      if (typeof callback === 'function') {
        listeners.has(label) || listeners.set(label, [])
        listeners.get(label).push({ callback: callback, vm: vm })
        return true
      }
      return false
    },
    removeListener(label, callback, vm) {
      let targetListeners = listeners.get(label)
      let index = null

      if (targetListeners && targetListeners.length) {
        index = targetListeners.reduce((i, listener, index) => {
          return typeof listener.callback === 'function' &&
            listener.callback === callback &&
            listener.vm === vm
            ? (i = index)
            : i
        }, -1)

        if (index > -1) {
          targetListeners.splice(index, 1)
          listeners.set(label, targetListeners)
          return true
        }
      }
      return false
    },
    emit(label, ...args) {
      let ret = false
      listeners.forEach((listeners, aliasKey) => {
        const key = this.aliasConvert(aliasKey)
        // console.log('emit', aliasKey, 'to', key)
        if (this.eq(label, key) && listeners && listeners.length) {
          listeners.forEach(listener => {
            listener.callback.call(listener.vm, ...args, label)
          })
          ret = true
        }
      })
      return ret
    },

    aliasConvert(input) {
      const rst = (input.match(/\$\w+/g) || [])
        .map(i => i.slice(1))
        .sort((b, a) => a.length - b - length)
        .reduce(
          (x, key) => (alias[key] ? x.replace('$' + key, alias[key]) : x),
          input
        )
      return prefix ? rst.replace(/^@/, prefix) : rst
    },
    eq(str1, str2) {
      let arr1 = str1.split('/')
      let arr2 = str2.split('/')
      if (
        !str1.includes('#') &&
        !str2.includes('#') &&
        arr1.length !== arr2.length
      ) {
        return false
      }
      if (arr2.length < arr1.length) {
        arr2 = str1.split('/')
        arr1 = str2.split('/')
      }
      let ret = true
      arr1.forEach((val, i) => {
        if (
          val === '+' ||
          val === '#' ||
          (arr2[i] && arr2[i] === '+') ||
          (arr2[i] && arr2[i] === '#') ||
          (arr2[i] && arr2[i] === val)
        ) {
          return
        }
        ret = false
      })
      return ret
    }
  }

  return instance
}

function Observer(connection, options, emitter, convert) {
  const client = MQTT.connect(connection, options)
  client.on('message', (topic, payload /* , packet */) => {
    emitter.emit(topic, convert(payload.toString()))
  })
  return client
}

function Factory({ topicPrefix, connectionString, convert = input => input }) {
  let client = null
  let emitter = Emitter({ prefix: topicPrefix })
  let saveConnectionString = connectionString

  const instance = {
    alias(label, path) {
      emitter.addAlias(label, path)
      return this
    },
    login({ connectionString, ...options }) {
      this.logout()
      saveConnectionString = connectionString || saveConnectionString
      const observer = new Observer(
        saveConnectionString,
        options,
        emitter,
        convert
      )
      client = observer
      return this
    },
    logout() {
      if (client && client.end) {
        client.end(true)
        client = null
      }
      return this
    },
    subscribe(...args) {
      if (client && client.subscribe) {
        client.subscribe(...args)
      }
      return this
    },
    unsubscribe(...args) {
      if (client && client.unsubscribe) {
        client.unsubscribe(...args)
      }
      return this
    },
    publish(...args) {
      if (client && client.publish) {
        client.publish(...args)
      }
      return this
    }
  }

  /* for Vue.use(...) */

  instance.vue = {
    install(Vue) {
      Vue.prototype.$mqtt = instance

      Vue.mixin({
        created() {
          let mqtt = this.$options['mqtt']

          this.$options.mqtt = new Proxy(
            {},
            {
              set: (target, key, value) => {
                // console.log('emitter.addListener', key)
                emitter.addListener(key, value, this)
                target[key] = value
                return true
              },
              deleteProperty: (target, key) => {
                emitter.removeListener(key, this.$options.mqtt[key], this)
                delete target.key
                return true
              }
            }
          )

          if (mqtt) {
            Object.keys(mqtt).forEach(key => {
              this.$options.mqtt[key] = mqtt[key]
            })
          }
        },
        beforeDestroy() {
          let mqtt = this.$options['mqtt']

          if (mqtt) {
            Object.keys(mqtt).forEach(key => {
              delete this.$options.mqtt[key]
            })
          }
        }
      })
    }
  }

  return instance
}

export default Factory

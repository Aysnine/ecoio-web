let one = [
  'sys:monit',
  {
    data: {
      cpu: {
        percent: 2.6473099914602902,
        speed: 1.8
      },
      mem: {
        percent: 34.07087331796494,
        total: 1910067200,
        free: 704954368,
        used: 1201889280,
        active: 654000128,
        available: 1014235136,
        buffcache: 551112704,
        swaptotal: 2147479552,
        swapused: 0,
        swapfree: 2147479552
      },
      fs: {
        percent: 38.09160734312158,
        size: 40672165888,
        used: 15492681728,
        free: 25179484160,
        use: 38.09160734312158
      }
    }
  }
]

const getOne = () => {
  const { cpu, mem, fs } = one[1].data
  return {
    cpu: { ...cpu, percent: cpu.percent + ~~(Math.random() * 10) },
    mem: { ...mem, percent: mem.percent + ~~(Math.random() * 10) },
    fs: { ...fs }
  }
}

export default {
  namespaced: true,
  state: {
    one: {
      cpu: {},
      mem: {},
      fs: {}
    },
    history: {
      cpu: [],
      mem: []
    }
  },
  mutations: {
    PUSH_MONIT_ITEM(state, v) {
      let time = new Date().getTime()
      state.one.cpu = v.cpu
      state.one.mem = v.mem
      state.one.fs = v.fs
      state.history.cpu.push({ time, percent: v.cpu.percent })
      state.history.mem.push({ time, percent: v.mem.percent })

      // Data Liberation
      if (state.history.cpu.length > 60) state.history.cpu.shift()
      if (state.history.mem.length > 60) state.history.mem.shift()
    }
  },
  actions: {
    start({ dispatch }) {
      dispatch('SetMonitItem', getOne())
      setInterval(() => {
        dispatch('SetMonitItem', getOne())
      }, 1000)
    },
    SetMonitItem({ commit }, data) {
      return new Promise(resolve => {
        commit('PUSH_MONIT_ITEM', data)
        resolve()
      })
    }
  }
}

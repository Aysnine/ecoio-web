import mm from 'micromatch'

export default function(router) {
  let inited = false

  const config = {
    rules: [],
    before() {},
    after() {},
    init() {}
  }

  const result = {}

  const rules = list => ((config.rules = list), result)
  const before = func => ((config.before = func), result)
  const after = func => ((config.after = func), result)
  const init = func => ((config.init = func), result)

  result.rules = rules
  result.before = before
  result.after = after
  result.init = init

  router.beforeEach(async (to, from, next) => {
    if (!inited && config.init) {
      await config.init()
      inited = true
    }
    config.before({ to, from, next })
    for (let item of config.rules) {
      let { match, validator, reactor } = item
      if (mm.isMatch(to.path, match)) {
        if (validator({ to, from })) {
          let rst =
            typeof reactor === 'string' ? reactor : reactor({ to, from })
          if (rst) {
            config.after()
            return next(rst)
          }
        }
      }
    }
    next()
  })

  router.afterEach(() => {
    config.after()
  })

  return result
}

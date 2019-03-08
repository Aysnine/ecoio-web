import mm from 'micromatch'

export default function(router) {
  const config = {
    rules: [],
    before() {},
    after() {}
  }

  const result = {}

  const rules = list => ((config.rules = list), result)
  const before = func => ((config.before = func), result)
  const after = func => ((config.after = func), result)

  result.rules = rules
  result.before = before
  result.after = after

  router.beforeEach((to, from, next) => {
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

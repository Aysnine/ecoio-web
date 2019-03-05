export default [
  {
    path: '/user/login',
    method: 'post',
    handle({ body: { account, pass }, db, uid }) {
      let isAuth = db
        .get('users')
        .find({ account, pass })
        .value()
      let newToken = uid()
      if (isAuth) {
        db.get('users')
          .find({ account })
          .assign({ token: newToken })
          .write()
      }
      return isAuth
        ? { code: 0, msg: '登陆成功', token: newToken }
        : { code: 1, msg: '登陆失败，请检查用户名或密码' }
    }
  },
  {
    path: '/user/logout',
    method: 'post',
    handle() {
      return {
        code: 0,
        msg: '已退出登录'
      }
    }
  },
  {
    path: '/user/profile',
    method: 'post',
    handle({ body: { token }, db }) {
      let user = db
        .get('users')
        .find({ token })
        .cloneDeep()
        .value()
      return user
        ? {
            code: 0,
            msg: '欢迎回来',
            data: user
          }
        : {
            code: 1,
            msg: '登陆过期，请重新登陆'
          }
    }
  }
]

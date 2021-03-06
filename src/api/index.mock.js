export default [
  {
    path: '/user/regist',
    method: 'post',
    handle({ body: { account, nickname, pass }, db, uid }) {
      let isExist = db
        .get('users')
        .find({ account })
        .value()
      if (!isExist) {
        db.get('users')
          .push({
            id: uid(),
            account,
            nickname,
            pass,
            role: 'member',
            data: { weathers: [], devices: [] }
          })
          .write()
      }
      return isExist
        ? { code: 1, msg: '注册失败，该账号已存在！' }
        : { code: 0, msg: '注册成功，请登陆！' }
    }
  },
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
    handle({ db, token }) {
      let user = db
        .get('users')
        .find({ token })
        .cloneDeep()
        .value()
      delete user.pass
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
  },
  {
    path: '/user/data',
    method: 'post',
    handle({ db, body, token }) {
      let user = (user = db
        .get('users')
        .find({ token })
        .value())
      if (user) {
        let user = db
          .get('users')
          .find({ token })
          .assign({ data: { ...user.data, ...body } })
          .write()
      }

      return user
        ? {
            code: 0,
            msg: '完成',
            data: user
          }
        : {
            code: 1,
            msg: '失败'
          }
    }
  },
  {
    path: '/account/fetch',
    method: 'get',
    handle({ db }) {
      return {
        code: 0,
        msg: '完成',
        data: db.get('users').value()
      }
    }
  },
  {
    path: '/account/delete',
    method: 'post',
    handle({ db, body: { id } }) {
      db.get('users')
        .remove({ id })
        .write()
      return {
        code: 0,
        msg: '完成'
      }
    }
  },
  {
    path: '/device/fetch',
    method: 'get',
    handle({ db, token }) {
      let devices = db
        .get('users')
        .find({ token })
        .get('data.devices')
        .cloneDeep()
        .value()
      return {
        code: 0,
        msg: '成功',
        data: devices
      }
    }
  },
  {
    path: '/device/delete',
    method: 'post',
    handle({ db, body: { id }, token }) {
      db.get('users')
        .find({ token })
        .get('data.devices')
        .remove({ id })
        .write()
      return {
        code: 0,
        msg: '成功'
      }
    }
  },
  {
    path: '/device/new',
    method: 'post',
    handle({ db, body: { name, type }, token, uid }) {
      db.get('users')
        .find({ token })
        .get('data.devices')
        .push({ id: uid(), name, type })
        .write()
      return {
        code: 0,
        msg: '成功'
      }
    }
  }
]

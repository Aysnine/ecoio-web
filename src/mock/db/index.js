import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
const db = low(new LocalStorage('mock-default-db'))

db.defaults({
  users: [
    {
      id: '1',
      account: 'admin',
      nickname: 'admin',
      pass: 'admin',
      role: 'admin'
    },
    {
      id: '2',
      account: 'manager',
      nickname: 'manager',
      pass: 'manager',
      role: 'manager'
    }
  ],
  roles: [{ id: 'admin', name: '管理员' }, { id: 'member', name: '用户成员' }]
}).write()

export default db

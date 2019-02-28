import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import dict from '@/dict'
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
  ...dict()
}).write()

export default db

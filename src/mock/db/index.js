import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import dict from '@/dict'
const db = low(
  new LocalStorage(
    `${process.env.VUE_APP_MAIN_DOMAIN}-${
      process.env.VUE_APP_MAIN_MOCK_DB_VERSION
    }-mock-db`
  )
)

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
      account: 'member',
      nickname: 'member',
      pass: 'member',
      role: 'member'
    }
  ],
  ...dict()
}).write()

export default db

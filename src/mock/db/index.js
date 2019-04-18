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
      nickname: '管理员',
      pass: 'admin',
      role: 'admin',
      data: {
        weathers: [],
        devices: []
      }
    },
    {
      id: '2',
      account: 'member',
      nickname: '用户A',
      pass: 'member',
      role: 'member',
      data: {
        weathers: [],
        devices: []
      }
    }
  ],
  ...dict()
}).write()

export default db

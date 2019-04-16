import cities from './cities.json'

export default function() {
  return {
    roles: [
      { id: 'admin', name: '管理员' },
      { id: 'member', name: '用户成员' }
    ],
    cities
  }
}

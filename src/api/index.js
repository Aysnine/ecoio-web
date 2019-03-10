import qs from 'qs'
import { $request as req } from '@/plugin'

export const userRegist = ({ account, nickname, pass }) =>
  req({
    method: 'post',
    url: '/user/regist',
    data: qs.stringify({ account, nickname, pass })
  })

export const userLogin = ({ account, pass }) =>
  req({
    method: 'post',
    url: '/user/login',
    data: qs.stringify({ account, pass })
  })

export const userProfile = () =>
  req({
    method: 'post',
    url: '/user/profile'
  })

export const userLogout = () =>
  req({
    method: 'post',
    url: '/user/logout'
  })

import qs from 'qs'
import { $request as req } from '@/plugin'

export const userLogin = ({ account, pass }) =>
  req({
    method: 'post',
    url: '/user/login',
    data: qs.stringify({ account, pass })
  })

export const userProfile = token =>
  req({
    method: 'post',
    url: '/user/profile',
    data: qs.stringify({ token })
  })

export const userLogout = token =>
  req({
    method: 'post',
    url: '/user/logout',
    data: qs.stringify({ token })
  })

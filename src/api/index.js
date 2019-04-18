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

export const updateData = data =>
  req({
    method: 'post',
    url: '/user/data',
    data: qs.stringify(data)
  })

export const fetchAccount = () =>
  req({
    method: 'get',
    url: '/account/fetch'
  })

export const deleteAccount = id =>
  req({
    method: 'post',
    url: '/account/delete',
    data: qs.stringify({ id })
  })

export const fetchDevice = () =>
  req({
    method: 'get',
    url: '/device/fetch'
  })

export const deleteDevice = id =>
  req({
    method: 'post',
    url: '/device/delete',
    data: qs.stringify({ id })
  })

export const newDevice = form =>
  req({
    method: 'post',
    url: '/device/new',
    data: qs.stringify(form)
  })

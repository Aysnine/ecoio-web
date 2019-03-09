/* eslint-disable */
import axios from 'axios'
import log from './sao-log.js'
import layzer from '@/lib/util/layzer.js'

export default function ({ start, done }) {

  const { push, pop } = layzer({ start, done, smooth: 600 })

  const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 1000 * 5
  })

  service.interceptors.request.use(
    config => (push(), config),
    error => (pop(), Promise.reject(error))
  )

  service.interceptors.response.use(
    res => {
      log(res.request, res)
      pop()
      // ! custom error type
      if (res.data.code !== undefined) {
        if (res.data.code !== 0) {
          return Promise.reject(res.data)
        } else {
          return res.data
        }
      } else {
        return res.data
      }
    },
    err => {
      log(err.request, err.response)
      pop()
      err.msg = `数据异常 (${err.request.statusText} : ${err.request.status})`
      return Promise.reject(err)
    }
  )

  return service
}

import MockSuit from '@/lib/main/mock-suit'

import db from '../db'
import shortid from 'shortid'
import { $cookie } from '@/plugin'
MockSuit.extend('uid', shortid.generate)
MockSuit.extend('db', db)
MockSuit.use(req => (req.token = $cookie.get('token')))

/**
 * Auto import mock modules
 */
;(r =>
  r.keys().forEach(key => {
    MockSuit.load(r(key).default || r(key))
  }))(require.context('@/api/', true, /.*\.mock\.js$/))

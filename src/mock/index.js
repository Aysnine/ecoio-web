import MockSuit from '@/lib/main/mock-suit'

import db from './db'
import shortid from 'shortid'
MockSuit.extend('uid', shortid.generate)
MockSuit.extend('db', db)

/**
 * Auto import mock modules
 */
;(r =>
  r.keys().forEach(key => {
    MockSuit.load(r(key).default || r(key))
  }))(require.context('./modules', true, /.*\.js$/))

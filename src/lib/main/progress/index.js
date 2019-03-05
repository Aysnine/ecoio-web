import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

import layzer from '@/lib/util/layzer.js'

export default function() {
  const { pop, push } = layzer({
    start: NProgress.start,
    done: NProgress.done,
    smooth: 1000
  })

  return {
    start() {
      push()
    },
    done() {
      pop()
    }
  }
}

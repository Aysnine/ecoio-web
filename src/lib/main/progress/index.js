import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

import layzer from '@/lib/util/layzer.js'

export default function() {
  const { pop, push } = layzer({
    start() {
      NProgress.start()
      NProgress.set(0.2)
    },
    done() {
      NProgress.done()
    },
    smooth: 600
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

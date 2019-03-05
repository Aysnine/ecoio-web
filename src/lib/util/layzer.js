export default function({ start, done, smooth }) {
  let count = 0
  let instance = null
  return {
    push() {
      count++
      if (!instance && count) instance = start() || true
    },
    pop() {
      if (count) count--
      if (instance && !count) {
        setTimeout(() => {
          if (instance && !count) instance = done(instance) || null
        }, smooth)
      }
    }
  }
}

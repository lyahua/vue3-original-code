import { Link } from "./system"

export let activeSub

class ReactiveEffect {

  /**
   * 依赖项链表的头节点
   */
  deps: Link | undefined

  /**
   * 依赖项链表的尾节点
   */
  depsTail: Link | undefined
  constructor(public fn) {}

  run() {
    // 先将当前的effect保存起来，用来处理嵌套的逻辑
    const preSub = activeSub
    activeSub = this
    this.depsTail = undefined
    // activeSub()
    try {
      return this.fn()
    } finally {
      // 执行完成后把activesub设置成之前的effect
      activeSub = preSub
    }
  }

  notify() {
    this.scheduler()
  }

  scheduler() {
    this.run()
  }
}
export function effect(fn, options) {
  const e = new ReactiveEffect(fn)
  // scheduler
  Object.assign(e, options)
  e.run()

  const runner = () => e.run()
  runner.effect = e
  return runner
}

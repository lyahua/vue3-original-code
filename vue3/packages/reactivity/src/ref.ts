import { activeSub } from './effect'
import { Link, link, progagate } from './system';

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}



/**
 * REF类
 */
class RefImpl {
  // 保存实际的值
  _value;
  [ReactiveFlags.IS_REF] = true

  // 保存和effect之间的关系
  /**
   * 订阅者链表的头节点
   */
  subs: Link

  /**
   * 订阅者链表的尾节点，理解为我们讲的tail
   */
  subsTail: Link
  constructor(value) {
    this._value = value
  }

  get value() {
    // 收集依赖
    // console.log('有人访问我了')
    if (activeSub) {
      // this.subs = activeSub
      trackRef(this)
    }
    return this._value
  }

  set value(newValue) {
    // 触发更新
    // console.log('我的值变了')
    this._value = newValue

    // 通知EFFECT重新执行
    // this.subs?.()

    traggerRef(this)
  }
}
export function ref(value) {
  return new RefImpl(value)
}

/**
 * 判断是不是一个REF
 * @param value
 * @returns
 */
export function isRef(value) {
  return !!(value && value[ReactiveFlags.IS_REF])
}

/**
 * 建立ref和effect链表间的关系
 * @param deep
 */
export function trackRef(deep) {
  if (activeSub) {
    link(deep, activeSub)
  }
}

/**
 * 触发关联的effect重新执行
 * @param deep
 */
export function traggerRef(deep) {
  if (deep.subs) {
    progagate(deep.subs)
  }
}



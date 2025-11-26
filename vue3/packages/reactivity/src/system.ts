/**
 * 依赖项
 */
interface Dep {
  // 订阅者链表的头节点
  subs: Link | undefined
  subsTail: Link | undefined
}

/**
 * 订阅者
 */
interface Sub {
  deps: Link | undefined
  depsTail: Link | undefined
}

/**
 * 连接链表关系
 * @param deep
 * @param sub
 */
export function link(dep, sub) {
  const currentDep = sub.depsTail
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  if ( nextDep &&nextDep.dep === dep) {
    console.log('相同的依赖，直接复用')
    sub.depsTail = nextDep
    return
  }
  const newLink = {
    sub,
    dep,
    nextSub: undefined,
    preSub: undefined,
  }
  if (dep.subsTail) {
    // 往后面加
    dep.subsTail.nextSub = newLink
    newLink.preSub = dep.subsTail
    dep.subsTail = newLink
  } else {
    // 头节点也没有 头尾是同一个
    dep.subs = newLink
    dep.subsTail = newLink
  }

  /**
   * 将链表节点和sub建立关联关系
   */
  if (sub.depsTail) {
    sub.depsTail.nextDep = newLink
    sub.depsTail = newLink
  } else {
    sub.deps = newLink
    sub.depsTail = newLink
  }
}

export function progagate(subs) {
  let link = subs
  let queueEffect = []
  while (link) {
    queueEffect.push(link.sub)
    link = link.nextSub
  }
  console.log(subs)
  // console.log('quequEffect', quequEffect)

  queueEffect.forEach(effect => effect.notify())
}

/**
 * 链表节点
 */
export interface Link {
  // 保存effect
  sub: Sub
  // 下一个节点
  nextSub: Link | undefined
  // 上一个节点
  preSub: Link | undefined

  dep: Dep

  // 下一个依赖项节点
  nextDep: Link | undefined
}

/**
 * 连接链表关系
 * @param deep 
 * @param sub 
 */
export function link(deep, sub) {
  const newLink = {
    sub,
    nextSub: undefined,
    preSub: undefined,
  }
  if (deep.subsTail) {
    // 往后面加
    deep.subsTail.nextSub = newLink
    newLink.preSub = deep.subsTail
    deep.subsTail = newLink
  } else {
    // 头节点也没有 头尾是同一个
    deep.subs = newLink
    deep.subsTail = newLink
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
  sub: Function
  // 下一个节点
  nextSub: Link | undefined
  // 上一个节点
  preSub: Link | undefined
}
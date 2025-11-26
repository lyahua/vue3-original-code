// packages/shared/src/index.ts
function isObject(value) {
  return typeof value === "object" && value !== null;
}

// packages/reactivity/src/effect.ts
var activeSub;
var ReactiveEffect = class {
  constructor(fn2) {
    this.fn = fn2;
  }
  /**
   * 依赖项链表的头节点
   */
  deps;
  /**
   * 依赖项链表的尾节点
   */
  depsTail;
  run() {
    const preSub = activeSub;
    activeSub = this;
    this.depsTail = void 0;
    try {
      return this.fn();
    } finally {
      activeSub = preSub;
    }
  }
  notify() {
    this.scheduler();
  }
  scheduler() {
    this.run();
  }
};
function effect(fn2, options) {
  const e = new ReactiveEffect(fn2);
  Object.assign(e, options);
  e.run();
  const runner = () => e.run();
  runner.effect = e;
  return runner;
}

// packages/reactivity/src/system.ts
function link(dep, sub) {
  const currentDep = sub.depsTail;
  const nextDep = currentDep === void 0 ? sub.deps : currentDep.nextDep;
  if (nextDep && nextDep.dep === dep) {
    console.log("\u76F8\u540C\u7684\u4F9D\u8D56\uFF0C\u76F4\u63A5\u590D\u7528");
    sub.depsTail = nextDep;
    return;
  }
  const newLink = {
    sub,
    dep,
    nextSub: void 0,
    preSub: void 0
  };
  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink;
    newLink.preSub = dep.subsTail;
    dep.subsTail = newLink;
  } else {
    dep.subs = newLink;
    dep.subsTail = newLink;
  }
  if (sub.depsTail) {
    sub.depsTail.nextDep = newLink;
    sub.depsTail = newLink;
  } else {
    sub.deps = newLink;
    sub.depsTail = newLink;
  }
}
function progagate(subs) {
  let link2 = subs;
  let queueEffect = [];
  while (link2) {
    queueEffect.push(link2.sub);
    link2 = link2.nextSub;
  }
  console.log(subs);
  queueEffect.forEach((effect2) => effect2.notify());
}

// packages/reactivity/src/ref.ts
var RefImpl = class {
  // 保存实际的值
  _value;
  ["__v_isRef" /* IS_REF */] = true;
  // 保存和effect之间的关系
  /**
   * 订阅者链表的头节点
   */
  subs;
  /**
   * 订阅者链表的尾节点，理解为我们讲的tail
   */
  subsTail;
  constructor(value) {
    this._value = value;
  }
  get value() {
    if (activeSub) {
      trackRef(this);
    }
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    traggerRef(this);
  }
};
function ref(value) {
  return new RefImpl(value);
}
function isRef(value) {
  return !!(value && value["__v_isRef" /* IS_REF */]);
}
function trackRef(deep) {
  if (activeSub) {
    link(deep, activeSub);
  }
}
function traggerRef(deep) {
  if (deep.subs) {
    progagate(deep.subs);
  }
}

// packages/reactivity/src/index.ts
function fn(a, b) {
  return a + b;
}
isObject({});
export {
  activeSub,
  effect,
  fn,
  isRef,
  ref,
  trackRef,
  traggerRef
};
//# sourceMappingURL=reactivity.esm.js.map

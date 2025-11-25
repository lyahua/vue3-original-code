1116:
1、创建monorapo项目
    1.1、pnpm init
    1.2、创建pnpm-workspace.yaml文件，并配置包路径
    1.3、配置后装包方式变更 pnpm install typescript -D -w
2、在scripts下创建esbuild打包脚本



1117:
1、在packages下新增shared工具类包
2、如何在reactivity模块下引用自定义的工具类包
方式1:
```js
import { isObject } from "../../shared/src"

isObject({})
```
方式2: 在rreactivity下安装shared包
```sh
pnpm install @vue/shared --filter @vue/reactivity // 只能装vue官方的包
pnpm install @vue/shared --workspace --filter @vue/reactivity 
```

1123:
链表
node1 ---> node2 ----> node3 ----> node4
删除第一项
```js
let head = {
    value: 1,
    next: {
        value: 2,
        nexxt: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
}
// 删除链接的第一项
head = head.next
```

删除中间的一项
```js
let head = { value: 1, next: undefined}
const node2 = { value: 2, next: undefined}
const node3 = { value: 3, next: undefined}
const node4 = { value: 4, next: undefined}

// 建立链表之间的关系
head.next = node2
node2.next = node3
node3.next = node4

// 现在已知node3,如何将node3删除掉
let current = head
while(current) {
    if (current.next === node3) {
        current.next = node.next
        break
    }
}
```
import { isObject } from "@vue/shared"

export function fn(a,b){
    return a+b
}
export * from './ref'
export * from './effect'

isObject({})
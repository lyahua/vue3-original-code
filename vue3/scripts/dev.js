console.log('开始打包')
console.log(process.argv)

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import esbuild from 'esbuild'
import { createRequire } from 'node:module'
const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true, // 位置参数 【vue reacitvity】
  options: {
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
  },
})
console.log(format, positionals)

// 创建esm的filename
const __filename = fileURLToPath(import.meta.url)
// 创建esm的dirname
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)
const target = positionals.length?positionals[0]:'vue'
// 根据target找到入口文件
const entry = resolve(__dirname,`../packages/${target}/src/index.ts`)
console.log('entry', entry)

/**
 * 
 */
const outfile= resolve(__dirname,`../packages/${target}/dist/${target}.${format}.js`)
const pkg = require(`../packages/${target}/package.json`)
console.log('packag', pkg)
esbuild.context({
    entryPoints:[entry],
    outfile,
    format, // 打包格式 cjs, esm, iife
    platform: format ==='cjs'? 'node': 'browser', // 打包平台
    sourcemap: true,
    bundle: true, //把所有依赖打包到一个文件中
    globalName: pkg.buildOptions.name
}).then(ctx=>ctx.watch())
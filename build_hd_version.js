/*
 * @Date: 2022-03-07 17:57:13
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-08 09:46:25
 * @FilePath: \uni-vue3-ts-template\build_hd_version.js
 */
// @ts-nocheck
const fs = require('fs')
const path = require('path')
const shell = require('child_process')

const argv = process.argv

if (argv.length <= 2) {
    console.log('警告: 请指定灰度版本号!')
    return
}
const newVersion = argv[2]

// 读取文件
fs.readFile(path.join(__dirname, './.env'), 'utf8', function(error, data) {
    if (error) {
        console.log('提示: 读取文件失败了 请重试')
        return
    }

    // 改写内容
    let newContent = data.replace(/VITE_HD_VERSION = \'v[0-9]\d?(\.(0|[1-9]\d?)){2}\'/, `VITE_HD_VERSION = '${newVersion}'`)

    // 写入文件
    fs.writeFile(path.join(__dirname, './.env'), newContent, 'utf8', err => {
        if (err) throw err
        console.log('提示: 灰度版本号设置成功!')
        // 执行打包指令
        console.log('提示: 开始打包生产环境代码')
        shell.exec('npm run build', (error, stdout, stderr) => {
            if (!error) {
                // 成功
                console.log('提示: 生产环境代码构建成功')
            } else {
                // 失败
                console.log('错误: 生产环境代码打包失败,请手动执行npm run build构建')
            }
        })
    })
})

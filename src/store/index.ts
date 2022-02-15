/*
 * @Date: 2022-02-14 17:16:13
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 11:48:44
 * @FilePath: \uni-vue3-ts-template\src\store\index.ts
 */
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

let modules = {}
const modulesFiles = import.meta.globEager('./modules/*.ts')
for (const path in modulesFiles) {
    modules = { ...modules, [path.replace(/(.*\/)*([^.]+).*/gi, '$2')]: modulesFiles[path].default }
}
// console.log(modules,"结果")

export default createStore({
    // 公共store
    state: {
        // 示例数据
        userInfo: { name: '金杰' },
        token: 'msdldlksdlsdl,ml',
        version: ''
    },
    // 公共mutations
    mutations: {
        // 示例方法
        $clearUserData(state: any) {
            // 示例数据 与用户登录态和权限相关的数据
            const userData = [
                { name: 'userInfo', value: {} },
                { name: 'token', value: '' }
            ]
            let data = JSON.parse(uni.getStorageSync('store') as string)
            userData.forEach(saveKey => {
                state[saveKey.name] = saveKey.value
                data[saveKey.name] = saveKey.value
            })
            console.log('跳转登录')
            uni.setStorageSync('store', JSON.stringify(data))
            uni.reLaunch({ url: '/login' }) // 跳转至登录页
        },
        $changeStore(state: any, payload: any) {
            // 判断是否为多层级调用，state中为对象存在的情况，诸如user.info.name = 'xxx'
            const nameArr = payload.name.split('.')
            const len = nameArr.length
            if (len >= 2) {
                let obj = state[nameArr[0]]
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]]
                }
                obj[nameArr[len - 1]] = payload.value
            } else {
                state[payload.name] = payload.value
            }
            uni.setStorageSync('store', JSON.stringify(state))
        }
    },
    // 公共actions
    actions: {},
    // 公共getters
    getters: {},
    // 导入模块
    modules,
    // 持久化数据配置
    plugins: [
        createPersistedState({
            paths: ['$order.orderCount'],
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            }
        })
    ]
})

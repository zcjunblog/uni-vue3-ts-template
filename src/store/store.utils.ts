/*
 * @Date: 2022-02-14 17:21:01
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 11:57:53
 * @FilePath: \uni-vue3-ts-template\src\store\store.utils.ts
 */
/* 使用方法
   import useCurrentInstance from '@/hooks/useCurrentInstance'
    setup() {
        const { $vuex } = useCurrentInstance()
        // 获取 Vuex 数据： 
        $vuex.get('token') 
        $vuex.get('$user.userInfo') // 子属性/模块属性

        // 更新 Vuex 数据：
        $vuex.set('$user.userInfo.avatar', avatar); // 简单的逻辑就不用再去写mutation了

        // 获取 Vuex getters 数据：
        $vuex.getters('$user/getUserInfo');

        // 提交 Vuex mutations：
        $vuex.commit('$user/clearUserInfo', data);

        // 触发 Vuex actions：
        $vuex.dispatch('$user/updateUserInfo', data);
    }
 */
import store from './index'

/**
 * 自动根据字符串路径获取对象中的值支持.和[] , 且任意一个值为undefined时,不会报错,会直接返回undefined
 * @param	{Object} dataObj 数据源
 * @param	{String} name 支持a.b 和 a[b]
 * @param	{String} defaultValue undefined时的默认值
 */
function getData(dataObj: object, name: string) {
    let newDataObj
    if (dataObj) {
        newDataObj = JSON.parse(JSON.stringify(dataObj))
        let k = '',
            d = '.',
            l = '[',
            r = ']'
        name = name.replace(/\s+/g, k) + d
        let tstr = k
        for (let i = 0; i < name.length; i++) {
            let theChar = name.charAt(i)
            if (theChar != d && theChar != l && theChar != r) {
                tstr += theChar
            } else if (newDataObj) {
                if (tstr != k) newDataObj = newDataObj[tstr]
                tstr = k
            }
        }
    }
    return newDataObj
}

// 实现vuex的易用方法
class EasyVuex {
    // 写
    set = (name: string, value: any): void => {
        store.commit('$changeStore', {
            name,
            value
        })
    }
    // 读
    get = (name: string) => {
        let value = getData(store.state, name)
        if (typeof value === 'undefined') return ''
        return JSON.parse(JSON.stringify(value))
    }
    // getters
    getters = (name: string) => {
        return store.getters[name]
    }
    // dispatch
    dispatch = store.dispatch
    // commit
    commit = store.commit
}
export default EasyVuex

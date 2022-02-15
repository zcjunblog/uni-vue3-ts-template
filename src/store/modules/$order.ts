/*
 * @Date: 2022-02-14 17:58:22
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 11:19:01
 * @FilePath: \uni-vue3-ts-template\src\store\modules\$order.ts
 */
export default {
    // 通过添加 namespaced: true 的方式使其成为带命名空间的模块
    namespaced: true,

    state: {
        orderCount: 5
    },

    getters: {},

    mutations: {
        orderCountReduce(state) {
            state.orderCount--
        }
    },

    actions: {}
}

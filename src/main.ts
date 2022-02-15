/*
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 11:36:54
 * @FilePath: \uni-vue3-ts-template\src\main.ts
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import EasyVuex from './store/store.utils'
import uView from './uni_modules/uview-ui'
import envConfig from './envConfig'

export function createApp() {
    const app = createSSRApp(App)
    app.use(uView)
    app.config.globalProperties.$env = envConfig // 环境参数
    app.config.globalProperties.$vuex = new EasyVuex() // vuex方法
    return {
        app
    }
}

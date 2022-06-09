/*
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-06-09 17:07:00
 * @FilePath: \uni-vue3-ts-template\src\main.ts
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import $vuex from './store/store.utils'
import uView from './uni_modules/uview-ui'
import tools from './utils/tools'
import directive from './directive'
import VConsole from 'vconsole'
import store from './store'
// 非生产环境加载vconsole

if (import.meta.env.MODE !== 'production' && tools.isMobile()) {
    new VConsole()
}
export function createApp() {
    const app = createSSRApp(App)
    app.use(uView)
    app.use(store)
    directive(app)
    app.config.globalProperties.$tools = tools // 业务方法
    app.config.globalProperties.$vuex = $vuex // vuex方法
    app.config.globalProperties.$router = $router // router方法
    app.config.globalProperties.$staticUrl = import.meta.env.VITE_APP_STATICURL // 网络图片 云存储域名
    return {
        app
    }
}

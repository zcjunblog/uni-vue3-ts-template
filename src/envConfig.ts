/*
 * @Date: 2022-02-14 11:14:21
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 19:23:12
 * @FilePath: \uni-vue3-ts-template\src\envConfig.ts
 */
const ENV = 'dev'

// 通用配置
const DEFAULT_ENV_CONFIG = {}

const ENV_CONFIG = {
    dev: {
        VUE_APP_BASE_URL: ''
    },
    sit: {
        VUE_APP_BASE_URL: ''
    },
    uat: {
        VUE_APP_BASE_URL: ''
    },
    pro: {
        VUE_APP_BASE_URL: ''
    }
}

export default Object.assign(DEFAULT_ENV_CONFIG, ENV_CONFIG[ENV])

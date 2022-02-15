/*
 * @Date: 2022-02-14 11:14:21
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 15:19:47
 * @FilePath: \uni-vue3-ts-template\src\envConfig.ts
 */
const ENV = 'dev'

// 通用配置
const DEFAULT_ENV_CONFIG = {}

const ENV_CONFIG = {
    dev: {
        VUE_APP_BASE_URL: 'http://192.168.254.51:9080/'
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

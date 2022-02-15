/*
 * @Date: 2022-02-15 14:56:05
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 15:12:06
 * @FilePath: \uni-vue3-ts-template\src\api\request.ts
 */

import envConfig from '@/envConfig'
import showLoading from './loading'

/**
 * 根据访问路径和data生成key
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`

//储存request请求map
const requestList: Map<string, UniApp.RequestTask> = new Map()

//是否正在加载中
let loadingBox: null | (() => null) = null

/**
 * request请求
 * @param param0 必要参数
 * @param param1 配置
 */
const RequestMethod: RequestFunc.request = (
    { methodType = 'GET', data = {}, url = '' },
    { baseUrl = envConfig.VUE_APP_BASE_URL, header = {}, loading = true, dataType = 'json' } = {}
) => {
    //加载动画
    if (loading && loadingBox === null) {
        console.log('开启加载')
        //开启加载动画
        loadingBox = showLoading()
    }
    return new Promise((resolve, reject) => {
        //生成key
        const requestKey = createKey(url, data)
        // 加载动画
        const requestClose = uni.request({
            /** 服务器接口地址 */
            url: `${baseUrl}${url}`,
            /** 请求的参数 */
            data: data,
            /** 请求头 */
            header: header,
            /** 请求类型 */
            method: methodType,
            /** 超时时间 */
            timeout: 3000,
            /** 返回数据类型 */
            dataType: dataType,
            // 成功
            success: res => {
                //返回数据
                resolve({
                    code: 200,
                    data: res.data as any
                })
            },
            // 失败
            fail: err => {
                reject(err)
            },
            // 最终执行
            complete: () => {
                // 移除request请求
                requestList.delete(requestKey)
                // 如果加载
                if (loadingBox !== null && requestList.size === 0) {
                    // 关闭提示
                    loadingBox = loadingBox()
                }
            }
        })
        //先关闭上一个同路径同参数请求
        requestList.get(requestKey)?.abort()
        //存储请求
        requestList.set(requestKey, requestClose)
    })
}

//get请求
export const get = <R = AnyObject, T = AnyObject>(url: string, data?: T, config?: RequestFunc.RequestConfig) =>
    RequestMethod<R, T>(
        {
            methodType: 'GET',
            url: url,
            data
        },
        config
    )

//post请求
export const post = <R = AnyObject, T = AnyObject>(url: string, data?: T, config?: RequestFunc.RequestConfig) =>
    RequestMethod<R, T>(
        {
            methodType: 'POST',
            url: url,
            data
        },
        config
    )

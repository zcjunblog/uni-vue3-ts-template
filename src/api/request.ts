/*
 * @Date: 2022-02-15 14:56:05
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-03-25 19:49:32
 * @FilePath: \awen-patient-h5\src\api\request.ts
 */

import showLoading from './loading'
import tools from '../utils/tools'
import $vuex from '@/store/store.utils'
/**
 * 根据访问路径和data生成key
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`

// 储存request请求map
const requestList: Map<string, UniApp.RequestTask> = new Map()

// 是否正在加载中
let loadingBox: null | (() => null) = null

/**
 * request请求
 * @param param0 必要参数
 * @param param1 配置
 */
const RequestMethod: RequestFunc.request = (
    { methodType = 'GET', data = {}, url = '' },
    { baseUrl = import.meta.env.VITE_BASE_URL, header = {}, loading = true, dataType = 'json', errTip = true } = {}
) => {
    //加载动画
    if (loading && loadingBox === null) {
        //开启加载动画
        loadingBox = showLoading()
    }

    // 请求头加上channel_id(写死为8)、user_agent(根据url返回参数channel_code动态获取)，这两个参数值均与后端沟通过
    header['channel_id'] = 8
    header['user_agent'] = $vuex.get('channel_code')

    const location = $vuex.get('$user.userLocation')
    // 请求头加上位置信息
    if (location && location.usrLon) {
        header['lng'] = location.usrLon // 经度
        header['lat'] = location.usrLat // 纬度
    }
    // 灰度版本号
    header['api-version'] = import.meta.env.VITE_HD_VERSION
    // 携带token
    const token = $vuex.get('token')
    if (token) {
        header['Authorization'] = 'Bearer' + ' ' + token
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
            timeout: 6000,
            /** 返回数据类型 */
            dataType: dataType,
            // 成功
            success: (res: any) => {
                //返回数据
                const { statusCode: status, data } = res
                switch (status) {
                    case 400:
                        reject(res)
                        errTip && tools.showToast(res.data.message)
                        break
                    case 401:
                        errTip && tools.showToast('会话结束，请重新提交问诊')
                        //  跳转登录页
                        tools.toIndex()
                        break
                    case 500:
                        reject(res)
                        errTip && tools.showToast('服务出错')
                        break
                    case 502:
                        reject(res)
                        errTip && tools.showToast('服务器错误！')
                        break
                    case 504:
                        reject(res)
                        errTip && tools.showToast('服务器内部连接超时')
                        break
                    default:
                        console.log(
                            `%c ${methodType} ${url} %c 请求返回===> `,
                            'background: #606060; color: #fff; border-radius: 3px 0 0 3px;',
                            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;',
                            data
                        )
                        break
                }
                resolve(res.data as any)
            },
            // 失败
            fail: err => {
                tools.showToast('请求失败')
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

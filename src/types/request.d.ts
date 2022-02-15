/*
 * @Date: 2022-02-15 14:56:39
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 14:56:44
 * @FilePath: \uni-vue3-ts-template\src\types\request.d.ts
 */

declare namespace RequestFunc {
    //request请求
    type RequestData<T> = {
        /** 请求方式 */
        methodType?: 'GET' | 'POST'
        /** 传递的数据 */
        data?: T
        /** 路径 */
        url: string
    }
    //请求设置
    export type RequestConfig = {
        /** 父路径 */
        baseUrl?: string
        /** 请求头 */
        header?: any
        /** 是否加载 */
        loading?: boolean
        /** 传递的data数据类型 */
        dataType?: string
    }
    //返回数据类型
    type RequestReturnData<T> = {
        code: 200 | 500 | number
        data: T
    }
    /**
     * request请求
     */
    export type request = <R = AnyObject, T = AnyObject>(data: RequestData<T>, config?: RequestConfig) => Promise<RequestReturnData<R>>
}

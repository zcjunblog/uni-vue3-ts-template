/*
 * @Date: 2022-02-15 15:21:01
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-08 09:35:26
 * @FilePath: \uni-vue3-ts-template\src\api\modules\area.ts
 */

// 该文件仅做测试使用
import { get, post } from '../request'

export const getAreaList = (params: GetAreaList.Param | AnyObject = {}) => get<GetAreaList.Response>('/doctor-api/area/list', params)

// export const postTest = (params) => post<返回数据的类型, 传入参数的类型>('user-api/doctor/list', params)

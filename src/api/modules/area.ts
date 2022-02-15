/*
 * @Date: 2022-02-15 15:21:01
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 16:56:18
 * @FilePath: \uni-vue3-ts-template\src\api\modules\area.ts
 */

import { get, post } from '../request'

export const getAreaList = (parent_id: number | null = null) =>
    get<
        {
            // 返回参数的类型
            code: 0
            data: [
                {
                    area_id: 0
                    children: ['string']
                    city_name: 'string'
                    parent_id: 0
                }
            ]
            message: 'string'
        },
        {
            // 传入参数的类型
            parent_id: number | null
        }
    >('doctor-api/area/list', {
        parent_id
    })

export const postTest = (test: string) =>
    post<
        {
            test: string
        },
        {
            test: string
        }
    >('user-api/doctor/list', {
        test
    })

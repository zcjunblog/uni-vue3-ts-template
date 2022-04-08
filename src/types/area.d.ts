/*
 * @Date: 2022-02-28 16:54:35
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-08 09:39:16
 * @FilePath: \uni-vue3-ts-template\src\types\area.d.ts
 */
// 该文件仅做测试使用
declare namespace GetAreaList {
    export type Param = {
        parent_id: number
    }
    export type Response = {
        area_id: 0
        children: ['string']
        city_name: 'string'
        parent_id: 0
    }
}

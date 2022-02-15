/*
 * @Date: 2022-02-14 14:46:59
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 16:31:16
 * @FilePath: \uni-vue3-ts-template\src\types\apis.d.ts
 */

// 
declare namespace Apis {
    interface user  {
         /**
         * 接口说明
         */
        getUserConfig(option:number): Object;
    }
}



declare const user : Apis.user

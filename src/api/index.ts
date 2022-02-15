/*
 * @Date: 2022-02-15 15:31:36
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 17:32:28
 * @FilePath: \uni-vue3-ts-template\src\api\index.ts
 */
// TODO: 自动导入modules下的所有实体 编辑器无预读联想词 是否有优化途径?
// let Api = <any>{}
// const files = import.meta.glob('./modules/*.ts')
// for (const path in files) {
//     Api = { ...Api, [path.replace(/(.*\/)*([^.]+).*/gi, '$2')]: files[path] }
// }
// export default Api

import * as area from './modules/area'

export default {
    area
}

/*
 * @Date: 2022-02-15 15:07:05
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 15:12:50
 * @FilePath: \uni-vue3-ts-template\src\api\loading.ts
 */
/**
 * 加载动画
 * @param tips 提示语句
 * @returns 关闭loading
 */
export default (tips: string = '加载中...'): (() => null) => {
    uni.showLoading({
        title: tips,
        mask: true
    })
    uni.showNavigationBarLoading()
    return () => {
        uni.hideLoading()
        uni.hideNavigationBarLoading()
        return null
    }
}

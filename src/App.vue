<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-03-29 11:58:38
 * @FilePath: \awen-patient-h5\src\App.vue
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
    console.log('App Launch')
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>
<style lang="scss">
/*每个页面公共css */
@import './uni_modules/uview-ui/index.scss';
@import './style/global.scss';
</style>

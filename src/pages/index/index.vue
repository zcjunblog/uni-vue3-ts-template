<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 11:54:09
 * @FilePath: \uni-vue3-ts-template\src\pages\index\index.vue
-->
<template>
    <layout>
        <u-button @click="$u.route('/pages/demo/index')">路由跳转</u-button>
    </layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => {})
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>

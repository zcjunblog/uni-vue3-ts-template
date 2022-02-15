<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-15 11:26:10
 * @FilePath: \uni-vue3-ts-template\src\pages\index\index.vue
-->
<template>
    <layout>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="$u.route('/pages/demo/index')">路由跳转</u-button>
            </u-col>
            <u-col span="4">
                <u-button type="primary">主要按钮</u-button>
            </u-col>
            <u-col span="4">
                <u-button @click="show = true">打开timepicker</u-button>
            </u-col>
        </u-row>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="add">vuex值加</u-button>
            </u-col>
            <u-col span="4">
                {{ $vuex.get('$order.orderCount') }}
            </u-col>
            <u-col span="4">
                <u-button @click="reduce">vuex值减</u-button>
            </u-col>
        </u-row>
        <u-picker v-model="show" mode="time"></u-picker>

        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
    </layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
const { $vuex } = useCurrentInstance()

const title = 'Hello'
const show = ref(false)

const add = () => {
    let count = $vuex.get('$order.orderCount')
    $vuex.set('$order.orderCount', count + 1)
}
const reduce = () => {
    $vuex.commit('$order/orderCountReduce')
}

onMounted(() => {})

console.log($vuex.get('$order.orderCount')) // 获取模块内属性
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

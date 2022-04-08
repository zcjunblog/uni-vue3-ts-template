<!--
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-04-08 11:28:19
 * @FilePath: \uni-vue3-ts-template\src\pages\demo\index.vue
-->
<template>
    <Layout>
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="test">网络请求</u-button>
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
                <u-button @click="showToast">tools-taost</u-button>
            </u-col>
            <u-col span="4"></u-col>
            <u-col span="4">
                <!-- <u-button @click="mapListShow = true">打开地图</u-button> -->
                <u-button @click="openMap">打开地图</u-button>
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
        <u-row gutter="16">
            <u-col span="4">
                <u-button @click="countChange('add')">响应式数据加</u-button>
            </u-col>
            <u-col span="4">
                {{ count }}
            </u-col>
            <u-col span="4">
                <u-button @click="countChange('reduce')">响应式数据加减</u-button>
            </u-col>
        </u-row>
        <u-picker v-model="show" mode="time"></u-picker>

        <view class="text-area">
            <text class="title no-touch">{{ title }}, 当前为: {{ $tools.isMobile() ? '移动端' : 'PC端' }}</text>
        </view>
        <view class="content">媒体查询示例 960px以下变色</view>
        <view v-for="item in area" :key="item.area_id">{{ item.city_name }}</view>
        <!-- 地图选择组件 -->
        <match-media :max-width="960">
            <u-select v-model="mapListShow" :list="mapApplist" @confirm="selectedMapConfirm"></u-select>
        </match-media>
        <match-media :min-width="960">
            <u-modal v-model="mapListShow" confirm-text="立即前往" title="选择地图演示" width="800" @confirm="selectedMapConfirm">
                <view class="slot-content">
                    <u-radio-group v-model="selectedMapType">
                        <u-radio v-for="(item, index) in mapApplist" :key="index" :name="item.value">
                            {{ item.label }}
                        </u-radio>
                    </u-radio-group>
                </view>
            </u-modal>
        </match-media>
    </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Api from '@/api/index'
import to from 'await-to-js'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { useRoute } from 'vue-router'
const { $vuex, $tools, $staticUrl } = useCurrentInstance()
console.log('useCurrentInstance()', useCurrentInstance())
console.log('$staticUrl', $staticUrl)
const route = useRoute()
// 路由信息
console.log('route.query', route.query)
let title = 'Hello'
let show = ref(false)
let count = ref<number>(0)
const countChange = type => {
    if (type === 'add') {
        count.value++
    } else {
        count.value--
    }
}

const add = () => {
    let count = $vuex.get('$order.orderCount')
    $vuex.set('$order.orderCount', count + 1)
}
const reduce = () => {
    $vuex.commit('$order/orderCountReduce') // 带命名空间
}

let area: any = ref([])
const test = async () => {
    const [err, res] = await to(Api.area.getAreaList())
    if (!err) {
        area.value = res?.data
    }
}
const showToast = () => {
    console.log($tools)

    $tools.showToast('这 是 toast')
}
// 地图demo
const mapListShow = ref(false)
const selectedMapType = ref('1')
const mapApplist = [
    {
        value: '0',
        label: '高德地图'
    },
    {
        value: '1',
        label: '腾讯地图'
    },
    {
        value: '2',
        label: '百度地图'
    }
]
const openMap = () => {
    openGMap()
}
// 跳转高德地图
const openGMap = () => {
        const latEnd = 22.527044
        const lonEnd = 114.025291
        const destination = '深圳市福田区下沙一坊70号'
        const { usrLat, usrLon } = $vuex.get('$user.userLocation')
        // 获取到用户定位信息，走导航模式；未获取到用户定位信息，走单点标注模式
        if (usrLat && usrLon) {
            window.open(
                `https://uri.amap.com/navigation?from=${usrLon},${usrLat},我的位置&to=${lonEnd},${latEnd},${destination}&mode=driving&policy=1&src=mypage&coordinate=gaode&callnative=1`
            )
        } else {
            window.open(`https://uri.amap.com/marker?position=${lonEnd},${latEnd}&name=${destination}&src=mypage&coordinate=gaode&callnative=1`)
        }
    },
    // 跳转腾讯地图
    openTMap = () => {
        const latEnd = 22.527044
        const lonEnd = 114.025291
        const destination = '深圳市福田区下沙一坊70号'
        const { usrLat, usrLon } = $vuex.get('$user.userLocation')
        let mobileUrl = ''
        let h5Url = ''
        // 获取到用户定位信息，走导航模式；未获取到用户定位信息，走单点标注模式
        if (usrLat && usrLon) {
            mobileUrl = `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=${usrLat},${usrLon}&to=${destination}&tocoord=${latEnd},${lonEnd}&referer=TBQBZ-GUWE4-CTGUG-DJFPI-3V7OT-AIBMY`
            h5Url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=我的位置&fromcoord=${usrLat},${usrLon}&to=${destination}&tocoord=${latEnd},${lonEnd}&policy=1&referer=TBQBZ-GUWE4-CTGUG-DJFPI-3V7OT-AIBMY`
        } else {
            mobileUrl = `qqmap://map/marker?marker=coord:${latEnd},${lonEnd};title:${destination};addr:${destination}&referer=TBQBZ-GUWE4-CTGUG-DJFPI-3V7OT-AIBMY`
            h5Url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${latEnd},${lonEnd};title:${destination};addr:${destination}&referer=TBQBZ-GUWE4-CTGUG-DJFPI-3V7OT-AIBMY`
        }
        let resultUrl = $tools.isMobile ? h5Url : mobileUrl
        window.open(resultUrl)
    }
const selectedMapConfirm = e => {
    let value = e ? e[0].value : selectedMapType.value
    console.log(value)
    if (value === '0')
        return window.open('http://uri.amap.com/marker?position=114.02529,22.527044&name=深圳市福田区下沙一坊70号&coordinate=gaode&callnative=1')
    if (value === '1')
        return window.open(
            'https://apis.map.qq.com/uri/v1/marker?marker=coord:22.527044,114.02529;title:深圳市福田区下沙一坊70号;addr:深圳市福田区下沙一坊70号&referer=聚品'
        )
    if (value === '2')
        return window.open(
            'http://api.map.baidu.com/marker?location=22.527044,114.025291&title=深圳市福田区下沙一坊70号&content=深圳市福田区下沙一坊70号简介&output=html'
        )
}
onMounted(() => {})

console.log($vuex.get('$order.orderCount')) // 获取模块内属性
</script>

<style lang="scss">
.content {
    width: 200px;
    height: 200px;
    background-color: aqua;
    @include mq($large) {
        background-color: #8f8f94;
    }
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
    @include text-overflow(1);
}
.slot-content {
    padding: 30rpx;
    text-align: center;
}
</style>

<template>
    <view class="page-common">
        <nut-space direction="vertical" :gutter="10" fill>
            <text class="home-title">Hi，Bahamaha（用户名）</text>
            <text class="home-subtitle">想品茗一杯咖啡吗?</text>
            <nut-space :gutter="20" fill>
                <view class="bkg-newest">
                    <text class="home-card-text">最新单品</text>
                </view>
                <nut-space direction="vertical" :gutter="20">
                    <view class="bkg-hot-shop">
                        <text class="home-card-text">最热门店</text>
                    </view>
                    <view class="bkg-monthy-top">
                        <text class="home-card-text">月销TOP榜</text>
                    </view>
                </nut-space>
            </nut-space>
            <nut-row type="flex" justify="space-between" align="center">
                <nut-col class="home-title">Find your flavor</nut-col>
                <nut-button type="default">更换推荐</nut-button>
            </nut-row>
            <nut-space direction="vertical" :gutter="10">
                <coffee-list-item
                    coffee-img="../../images/home/coffee1.png"
                    name="龙眼米酿风味慕斯浓缩"
                    brand="星巴克"
                    :sell-count="1000"
                ></coffee-list-item>
                <coffee-list-item
                    coffee-img="../../images/home/coffee2.png"
                    name="海盐焦糖慕斯浓缩"
                    brand="星巴克"
                    :sell-count="500"
                ></coffee-list-item>
            </nut-space>
        </nut-space>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import '../../images/home/coffee1.png'
import '../../images/home/coffee2.png'
import coffeeListItem from '../../components/coffee-list-item.vue'

</script>

<style>
.home-title {
    font-size: 1.5em;
    font-weight: bold;
}

.home-subtitle {
    font-size: 0.7em;
    color: gray;
}

.bkg-newest {
    border-radius: 30px;
    background-image: url('../../images/home/newest.png');
    background-repeat: no-repeat;
    background-size: 320px 640px;
    width: 320px;
    height: 640px;
}

.bkg-hot-shop {
    border-radius: 30px;
    background-image: url('../../images/home/hot-shop.png');
    background-repeat: no-repeat;
    background-size: 320px 300px;
    width: 320px;
    height: 300px;
}

.bkg-monthy-top {
    border-radius: 30px;
    background-image: url('../../images/home/monthy-top.png');
    background-repeat: no-repeat;
    background-size: 320px 300px;
    width: 320px;
    height: 300px;
}

.home-card-text {
    position: relative;
    top: 20px;
    left: 20px;
    color: #D8D8D8;
}
</style>

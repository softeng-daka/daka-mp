
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
                        <text class="home-card-text">热销商品</text>
                    </view>
                    <view class="bkg-monthy-top" @click="goToEpage">
                        <text class="home-card-text">经济单品</text>
                    </view>
                </nut-space>
            </nut-space>
            <nut-row type="flex" justify="space-between" align="center">
                <nut-col class="home-title">Find your flavor</nut-col>
                <nut-button type="default" @click="homePage">更换推荐</nut-button>
            </nut-row>
            
            <nut-space direction="vertical" :gutter="10" >
                <coffee-list-item v-for="item in randomItems" :key="item.id"
                    :coffee-img="item.image"
                    :name="item.title"
                    brand="星巴克"
                    :sell-count="item.sold"
                    @click="goToProduct(item.id)"
                ></coffee-list-item>
              
            </nut-space>
        </nut-space>
    </view>
</template>


<script setup>
import { ref } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro, { useLoad } from '@tarojs/taro';

const randomItems = ref([]);

const homePage = () => {
    db.collection('goods')
    .get()
    .then(res => {
        let shuffled = res.data.sort(() => 0.5 - Math.random());
        let randomItemsData = shuffled.slice(0, 2);
        randomItems.value = randomItemsData;
        console.log(randomItemsData);
        console.log(randomItems);
    });
}

const goToProduct = productId => {
    Taro.navigateTo({ url: '/pages/coffeinfo/index?id=' + productId });
}

const goToEpage = () => {
    Taro.navigateTo({ url: '/pages/Epage/index'});
}

useLoad(async () => {
    homePage();
})
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

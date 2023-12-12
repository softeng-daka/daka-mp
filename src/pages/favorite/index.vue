<template>
    <view class="page-common favorite-page">
        <nut-tabs background="#F7EEE9" v-model="tabValue">
            <nut-tab-pane class="favorite-tab-pane" title="商品" pane-key="0">
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
            </nut-tab-pane>
            <nut-tab-pane class="favorite-tab-pane" title="店铺" pane-key="1">
                <nut-space direction="vertical" :gutter="10">
                    <shop-list-item
                        shop-img="../../images/home/shop1.png"
                        name="星巴克"
                        address="高新区科技东路12号"
                        :sell-count="700"
                    ></shop-list-item>
                    <shop-list-item
                        shop-img="../../images/home/shop2.png"
                        name="瑞辛"
                        address="师大学生街190号"
                        :sell-count="400"
                    ></shop-list-item>
                </nut-space>
            </nut-tab-pane>
        </nut-tabs>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import '../../images/home/coffee1.png'
import '../../images/home/coffee2.png'
import '../../images/home/shop1.png'
import '../../images/home/shop2.png'
import coffeeListItem from '../../components/coffee-list-item.vue'
import shopListItem from '../../components/shop-list-item.vue'

const tabValue = ref('0')

</script>

<style>
.favorite-tab-pane { background-color: #E8D5C8; }
.favorite-page { padding: 0; }

</style>

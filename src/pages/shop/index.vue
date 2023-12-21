<template>
    <view >
    <view class="bkg-newest">
    </view> 
    
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


.bkg-newest {
    background-repeat: no-repeat;
    background-size: 100% 475px;
    width: 100%;
    height: 475px;
}
.home-card-text {
    position: relative;
    top: 20px;
    left: 20px;
    color: #D8D8D8;
}
</style>

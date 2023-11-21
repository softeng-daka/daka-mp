<template>
    <view class="page-common page-search">
        <nut-searchbar v-model="keyword" background="#77360A" placeholder="搜索">
            <template #leftin>
                <icon-font size="23" font-class-name="iconfont" class-prefix="icon" name="search" />
            </template>
        </nut-searchbar>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'

const keyword = ref('')

useLoad(() => {
    Taro.hideHomeButton()
})
</script>

<style>
.page-search {
    background-color: #A54D15;
    background-image: url("../../images/daka-logo.png");
    background-repeat: no-repeat;
    background-position: center;
    padding: 0;
    min-height: 100vh;
}
</style>
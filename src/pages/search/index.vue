<template>
    <view class="page-common page-search">
      <nut-searchbar v-model="keyword" background="#77360A" placeholder="搜索" @search="handleSearch">
        <template #leftin>
          <icon-font size="23" font-class-name="iconfont" class-prefix="icon" name="search" />
        </template>
      </nut-searchbar>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { db, _ } from '../dbtest/db.js';
  import Taro from '@tarojs/taro'
  import { useLoad } from '@tarojs/taro'
  import { IconFont } from '@nutui/icons-vue-taro'
  
  const keyword = ref('')
  
  const handleSearch = () => {
 
    const searchKeyword = keyword.value
    console.log('执行搜索：', searchKeyword)

    Taro.navigateTo({ url: '/pages/searchres/index?keyword=' + searchKeyword })
  }
  

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
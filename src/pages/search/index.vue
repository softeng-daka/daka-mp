<template>
    <view class="page-common page-search">
      <view class="search-area">
        <nut-cell title="过滤器" :desc="filterDisplayValue" @click="showFilterPopup = true"></nut-cell>
        <nut-popup position="bottom" safe-area-inset-bottom v-model:visible="showFilterPopup">
          <nut-picker
            v-model="filterValue"
            :columns="filterColumns"
            title="选择品牌和类型"
            @confirm="confirmFilter"
            @cancel="cancelFilter"
          ></nut-picker>
        </nut-popup>
        <nut-searchbar v-model="keyword" background="#77360A" placeholder="搜索" @search="handleSearch">
          <template #leftin>
            <icon-font size="23" font-class-name="iconfont" class-prefix="icon" name="search" />
          </template>
        </nut-searchbar>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { db } from '../dbtest/db.js'
  import Taro from '@tarojs/taro'
  import { useLoad } from '@tarojs/taro'
  import { IconFont } from '@nutui/icons-vue-taro'
  
  const keyword = ref('')

  const showFilterPopup = ref(false)
  const filterColumns = ref([
    [
      { text: '所有品牌', value: '' },
      { text: '星巴克', value: '星巴克' },
      { text: 'luckin', value: 'luckin' },
      { text: '库迪', value: '库迪' }
    ],
    [
      { text: '所有类型', value: '' },
      { text: '拿铁', value: '拿铁' },
      { text: '星冰乐', value: '星冰乐' },
      { text: '美式', value: '美式' },
      { text: '卡布奇诺', value: '卡布奇诺' }
    ]
  ])
  const filterValue = ref(['', ''])
  const filterConfirmValue = ref(['', ''])
  const filterDisplayValue = computed(() => {
    return `${filterConfirmValue.value[0] === '' ? '所有品牌' : filterConfirmValue.value[0]}, ${filterConfirmValue.value[1] === '' ? '所有类型' : filterConfirmValue.value[1]}`
  })

  const confirmFilter = () => {
    filterConfirmValue.value = [...filterValue.value]
    showFilterPopup.value = false
  }

  const cancelFilter = () => {
    filterValue.value = [...filterConfirmValue.value]
    showFilterPopup.value = false
  }
  
  const handleSearch = () => {
    Taro.navigateTo({ url: `/pages/searchres/index?keyword=${keyword.value}&brand=${filterConfirmValue.value[0]}&type=${filterConfirmValue.value[1]}` })
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

  .search-area {
    padding: 50px 25px 28px 25px;
    background-color: #77360A;
  }
  </style>
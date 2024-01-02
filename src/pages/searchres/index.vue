<template>
  <view class="back">
    <div class="rounded-rectangle">  
      <p>搜索结果</p>
    </div>
  </view>
  
  <view class="page-common">
    <nut-space direction="vertical" :gutter="10" >
      <coffee-list-item v-for="item in searchitem" :key="item.id"
          :coffee-img="item.image"
          :name="item.title"
          :price="item.price"
          :sell-count="item.sold"
          @click="goToProduct(item.id)"
      ></coffee-list-item> 
    </nut-space>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro from '@tarojs/taro';

const searchitem = ref('');
const goToProduct = productId => { Taro.navigateTo({ url: '/pages/coffeinfo/index?id=' + productId }) }

onMounted(async () => {
  const params = Taro.getCurrentInstance().router?.params;
  if (params) {
    const res = await db.collection('goods').where(
      _.and([
        {
          title: db.RegExp({
            regexp: params.keyword,
            options: 'i', // 不区分大小写
          })
        },
        {
          title: db.RegExp({
            regexp: params.brand,
            options: 'i', // 不区分大小写
          })
        },
        {
          title: db.RegExp({
            regexp: params.type,
            options: 'i', // 不区分大小写
          })
        }
      ])
    )
    .orderBy('mark', 'desc') 
    .get()
    .catch((err) => {
      console.error('Failed to fetch goods:', err);
    });
    
    searchitem.value = res.data
  }
});

</script>
 

 
 
 <style>
 .title{
   font-size:   60px;
   color: #F0202A;
   display: flex;
    align-items: center;
    font-weight: lighter;  
    margin-left: 20px;
 }
 .rounded-rectangle{
   width: 120%;   
   height: 105px;  
   border-radius: 40px; 
   background-color: rgb(246, 238, 233); 
  
   display: flex;
    align-items: center;
 
 }  
 .rounded-rectangle p {  
   font-size:   40px;
   color: black;
   display: flex;
   align-items: center; 
   margin-left: 20px; 
   font-weight: bold;
 }
 .back{
   background-color: #E9D5C8;
 }
 
 </style>
 
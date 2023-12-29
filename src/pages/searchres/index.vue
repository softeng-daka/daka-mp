
<template>
    <view class="back">
    <div class="rounded-rectangle">  
     <p >搜索结果</p></div></view>
   
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
 <script >
 import { ref, onMounted } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro from '@tarojs/taro';

export default {
  setup() {
    const searchitem = ref('');
    const goToProduct = productId => {
    Taro.navigateTo({ url: '/pages/coffeinfo/index?id=' + productId });}
 
    onMounted(() => {
      const params = Taro.getCurrentInstance().router?.params;
      console.log(params);
      if (params && params.keyword) {
     
        const searchkeyword = params.keyword;
        console.log(params.keyword);
        console.log(searchkeyword);

        db.collection('goods')
           .where(
      {
        title: db.RegExp({
          regexp: searchkeyword,
          options: 'i', // 不区分大小写
        })
      }
    )
    .orderBy('mark', 'desc') 
    .get()
          .then((res) => {
            console.log(res.data )
            searchitem.value=res.data
            console.log(res.data )
          })
          .catch((err) => {
            console.error('Failed to fetch goods:', err);
          });
      }
    });

    return {
        searchitem,
        goToProduct
  
    };
  },
};
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
 
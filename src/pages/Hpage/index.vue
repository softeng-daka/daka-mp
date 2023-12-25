
<template>
   <view class="back">
   <div class="rounded-rectangle">  
    <p >热门商品</p></div></view>
  
<view class="page-common">
    <nut-space direction="vertical" :gutter="10" >
                <coffee-list-item v-for="item in cofitems" :key="item.id"
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
import { ref } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro, { useLoad } from '@tarojs/taro';

const cofitems=ref([]);

const soldTop=()=> {
    db.collection('goods')
    .orderBy('mark', 'desc') 
    .get()
    .then(res => {
      console.log(res.data);
      cofitems.value=res.data;
    });
  }

  const goToProduct = productId => {
    Taro.navigateTo({ url: '/pages/coffeinfo/index?id=' + productId });
}

useLoad(async () => {
    soldTop();
})
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

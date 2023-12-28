<template>
    <view class="page-common favorite-page">
        <nut-tabs background="#F7EEE9" v-model="tabValue">
            <nut-tab-pane class="favorite-tab-pane" title="商品" pane-key="0">

                <nut-space direction="vertical" :gutter="10" >
                <coffee-list-item v-for="item in cofitems" :key="item.id"
                    :coffee-img="item.image"
                    :name="item.title"
                    :price="item.price"
                    :sell-count="item.sold"
                    @click="goToProduct(item.id)"
                ></coffee-list-item>
                   
                </nut-space>
    
            </nut-tab-pane>
        </nut-tabs>
    </view>
</template>

<script setup>

import '../../images/home/coffee1.png'
import '../../images/home/coffee2.png'
import '../../images/home/shop1.png'
import '../../images/home/shop2.png'
import coffeeListItem from '../../components/coffee-list-item.vue'
import shopListItem from '../../components/shop-list-item.vue'
import { ref, onMounted } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro, { useLoad } from '@tarojs/taro';

const cofitems = ref([]);
const opid = ref('');
const items =ref([]);

const getItems = async () => {
  try {
    const res1 = await Taro.cloud.callFunction({
      name: 'getOpenid'
    });
    const openid = res1.result._openid;
    opid.value = openid;
    console.log(res1.result.message);
    console.log(openid);

    const res2 = await db.collection('users')
      .where({
        _openid: opid.value
      })
      .get();
    cofitems.value=res2.data;
   console.log(cofitems.like);
    console.log(items);
    console.log(cofitems);
    console.log(1111);
  } catch (err) {
    console.error(err);
  }
};
const goToProduct = productId => {
  Taro.navigateTo({ url: '/pages/coffeinfo/index?id=' + productId });
};

const getUserInfoByOpenId = async () => {
  try {
    const res = await db.collection('users')
      .where({
        _openid: opid.value
      })
      .get();
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

useLoad(async () => {
  await getItems();
  await getUserInfoByOpenId();
});
</script>
<style>
.favorite-tab-pane { background-color: #E8D5C8; }
.favorite-page { padding: 0; }

</style>

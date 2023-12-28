<template>
    <view class="page-common">
        <nut-form >
            <nut-form-item label="头像" label-align="left" body-align="right">
                <image class="user-avatar" src="../../images/avatar.png" />
            </nut-form-item>
            <nut-form-item label="用户名" label-align="left">
                <nut-input v-model="username" class="nut-input-text" type="text" input-align="right" readonly />
            </nut-form-item>
            <nut-form-item label="ID" label-align="left">
                <nut-input v-model="id" class="nut-input-text" type="text" input-align="right" readonly />
            </nut-form-item>
            <nut-form-item label="微信号" label-align="left">
                <nut-input v-model="weixinId" class="nut-input-text" type="text" input-align="right" readonly />
            </nut-form-item>
            <nut-form-item label="个性签名" label-align="left">
                <nut-input v-model="bio" class="nut-input-text" type="text" input-align="right" readonly />
            </nut-form-item>
        </nut-form>
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
const username = ref('一位不愿意透露身份的用户')
const id = ref(221234452)
const weixinId = ref('272618abc')
const bio = ref('coffee fall asleep！')

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
    console.log(items);
    console.log(cofitems[0].name);
    console.log(cofitems.value);
    console.log(1111);
  } catch (err) {
    console.error(err);
  }
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
.user-avatar {
    width: 60px;
    height: 60px;
}
</style>
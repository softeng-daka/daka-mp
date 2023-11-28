<template>
    <view class="page-common">
        <nut-form>
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
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const username = ref('Bahamaha')
const id = ref(221234452)
const weixinId = ref('272618abc')
const bio = ref('coffee fall asleep！')

</script>

<style>
.user-avatar {
    width: 60px;
    height: 60px;
}
</style>

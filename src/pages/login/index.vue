<template>
    <view class="page-common login-container">
        <input class="login-field" type="number" placeholder="请输入手机号码" />
        <input class="login-field" type="number" placeholder="请输入验证码" />
        <button class="login-btn">登录</button>
        <text class="register-link">新用户注册&nbsp;></text>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'



</script>

<style>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-field {
    width: 80%;
    padding: 30px 0;
    border-bottom: 3px solid white;
}

.login-btn {
    margin-top: 40px;
    width: 80%;
    border-radius: 500px;
    background-color: #84BD70;
    color: white;
}

.register-link {
    margin-top: 40px;
    color: gray;
}

</style>

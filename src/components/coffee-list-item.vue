<template>
    <view class="coffee-list-item">
        <nut-space :gutter="30" align="center" fill>
            <image class="list-item-coffee-img" :src="props.coffeeImg" />
            <nut-space direction="vertical" :gutter="1" justify="center" fill>
                <text>名称：{{ props.name }}</text>
                <text>品牌：{{ props.brand }}</text>
                <text>月销量：{{ props.sellCount }}+</text>
            </nut-space>
        </nut-space>
    </view>
</template>

<script setup>

const props = defineProps({
    coffeeImg: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    sellCount: {
        type: Number,
        required: true
    }
})
</script>

<style>
.coffee-list-item {
    background-color: #F7EEE9;
    padding: 15px 50px;
    border-radius: 40px;
    width: 570px;
}

.list-item-coffee-img {
    width: 115px;
    height: 120px;
    border-radius: 20px;
}
</style>
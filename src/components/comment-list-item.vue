<template>
    <view class="comment-item">
        <nut-space :gutter="30" align="center" fill>
            <image class="p-pic" :src="props.coffeeImg" alt="Circle Image"/>
            <nut-space direction="vertical" :gutter="1" justify="center" fill>
                <text class="nametext">{{ props.pname }}</text>
                <text class="maintext">{{ props.commenttext }}</text>
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
    pname: {
        type: String,
        required: true
    },
    commenttext: {
        type: String,
        required: true
    },

})
</script>

<style>
.comment-item {
    background-color:rgb(248,236,233);
    padding: 15px 50px;
    border-radius:60px;
    width: 85%;
}
.nametext{
    font-size:24px
}
.maintext{
    font-size:27px ;
    font-weight: 200;
}

.p-pic{
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
</style>
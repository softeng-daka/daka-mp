<template>
  <view class="back">
  <view class="coffee-pic">
  </view> 
  <div class="lo"><text class="title"></text>

        
  </div>

  <div class="rounded-rectangle">  
    <p >商品信息</p><image class="heart" src="../../images/heart.png" /></div>

    <div>  
    <ul>  
      <li>  
        <div >  
         <p class="title3"> 商品名：{{ goodsTitle }}</p> 
         <p class="title3"> 折扣： {{ goodsDiscount }} </p> 
         <p class="title3"> 月销量： {{ goodsSold }}+ </p> 
         <p class="title3"> 参考价格：{{ goodsMarketPrice }}¥ </p> 
        </div>  
      </li>  
    </ul>  
  </div>

  <div class="rounded-rectangle">  
    <p >评论回复</p></div>

  <div class="rounded-rectangle2">  
    <commentListItem
                    coffee-img="../../images/avatar1.png"
                    pname="尼古拉斯·英俊"
                    commenttext="这个咖啡确实挺不错的"
                ></commentListItem>
    <commentListItem
                    coffee-img="../../images/avatar2.png"
                    pname="黑"
                    commenttext="既实惠还管饱"
                ></commentListItem>
    <commentListItem
                    coffee-img="../../images/avatar2.png"
                    pname="阿萨德"
                    commenttext="好爱啊好喝啊"
                ></commentListItem>

    </div>  
</view>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro from '@tarojs/taro';

export default {
  setup() {
    const goodsTitle = ref('')
    const goodsDiscount = ref(0)
    const goodsSold = ref(0)
    const goodsMarketPrice = ref(0)

    onMounted(() => {
      const params = Taro.getCurrentInstance().router?.params;
      if (params && params.id) {
     
        const productId = parseInt(params.id);
        console.log(productId);

        db.collection('goods')
          .where({
            id: productId,
          })
          .get()
          .then((res) => {
            goodsTitle.value = res.data[0].title
            goodsDiscount.value = res.data[0].discount
            goodsSold.value = res.data[0].sold
            goodsMarketPrice.value = res.data[0].marketPrice
          })
          .catch((err) => {
            console.error('Failed to fetch goods:', err);
          });
      }
    });

    return {
      goodsTitle,
      goodsDiscount,
      goodsSold,
      goodsMarketPrice
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
   margin-bottom: 5px;
}  
.rounded-rectangle p {  
  font-size:   40px;
  color: black;
  display: flex;
  align-items: center; 
  margin-left: 20px; 
  font-weight: bold;
}

.title3{
  font-size:   35px;
  font-weight:200;
  color: black;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 25px;
}
.lo{
  display: flex;
   align-items: center;
  margin-bottom: 25px
}


.rounded-rectangle2
{
  width: 100%;   
  height: 600px;  
  border-radius: 40px; 
  background-color: rgb(246, 238, 233); 
   margin-bottom: 5px;
   margin-top: 20px;
  
}
.heart{
  height:40px ;
  width:40px ;
  margin-left: 150px ;
}




.back{
  background-color: #E9D5C8;
}

.coffee-pic {
  background-image: url('../../images/cof.png');
  background-repeat: no-repeat;
  background-size:100% 450px;
  width: 100%;
  height: 450px;
}

</style>

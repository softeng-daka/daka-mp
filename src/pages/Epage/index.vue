<template>
  <view class="back">
    <div class="rounded-rectangle">  
    <p >经济单品</p></div>
    <nut-space direction="vertical" :gutter="10" >
                <coffee-list-item v-for="item in randomItems" :key="item.id"
                    :coffee-img="item.image"
                    :name="item.title"
                    brand="星巴克"
                    :sell-count="item.sold"
                    @click="goToProduct(item.id)"
                ></coffee-list-item>
              
            </nut-space>
</view>

</template>
<script>
import { ref, onMounted } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro from '@tarojs/taro';



export default {
  setup() {
    const goodsData = ref({});
      var a;
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
           
            
            console.log(typeof res.data)
            a=res.data;
            console.log(a);
            console.log(res.data);
            console.log(productId);
            console.log(goodsData);
            console.log(goodsData.value);
          })
          .catch((err) => {
            console.error('Failed to fetch goods:', err);
          });
      }
    });

    return {

      goodsData,
      a,
      
    
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

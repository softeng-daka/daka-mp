<template>
  <view class="back">
    <image class="coffee-pic" :src="goodspic" />

    <div class="lo">
      <text class="title"></text>
    </div>

    <div class="rounded-rectangle">
      <p>商品信息</p>
      <button class="keyi" @click="addFavorite">添加收藏</button><button class="keyi2" @click="removeFavorite">取消收藏</button>
    </div>

    <div>
      <ul>
        <li>
          <div>
            <p class="title3"> 商品名：{{ goodsTitle }}</p>
            <p class="title3"> 折扣： {{ goodsDiscount }} </p>
            <p class="title3"> 月销量： {{ goodsSold }} </p>
            <p class="title3"> 参考价格：{{ goodsMarketPrice }}¥ </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="rounded-rectangle">
      <p>评论回复</p>
    </div>

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
    const goodsTitle = ref('');
    const goodsDiscount = ref(0);
    const goodsSold = ref(0);
    const goodsMarketPrice = ref(0);
    const goodspic = ref('');
    const opid=ref('');
    const gid=ref(0);

    const addFavorite = () => {
      const users = db.collection('users');
      console.log('图片被点击了');
      const gidx=gid.value;
      const opidx=opid.value;
        console.log(gidx);
        console.log(opidx);
    // 首先检查用户的 like 数组中是否已经包含该商品 id
    users.where({
      _openid: opidx,
      like: _.in([gidx])
    }).get().then(res => {
      if (res.data.length > 0) {
        // 用户的 like 数组中已包含该商品 id
        console.log('该商品已在喜爱列表中');
        return false;
      } else {
        // 用户的 like 数组中不包含该商品 id，将其添加到数组中
        console.log(gidx);
        console.log(opidx);
        users.where({
          _openid: opidx
        })
        .update({
          data: {
            like: _.push(gidx)
          }
        }).then(updateRes => {
          console.log('商品已添加到喜爱列表');
        }).catch(updateErr => {
          console.error(updateErr);
        });
      }
    }).catch(err => {
      console.error(err);
    });
    };

  const removeFavorite=() =>{
    const users = db.collection('users');
    const gidx=gid.value;
      const opidx=opid.value;

    // 首先检查用户的 like 数组中是否包含要删除的商品 id
    users.where({
      _openid: opidx,
      like: _.in([gidx])
    }).get().then(res => {
      if (res.data.length > 0) {
        // 用户的 like 数组中包含要删除的商品 id
        // 在数组中找到该商品 id 并移除
        const updatedLike = res.data[0].like.filter(id => id !== gidx);

        // 更新用户的 like 数组
        users.where({
          _openid:opidx
        })
          .update({
            data: {
              like: updatedLike
            }
          }).then(updateRes => {
          console.log('商品已从喜爱列表中移除');
        }).catch(updateErr => {
          console.error(updateErr);
        });
      } else {
        // 用户的 like 数组中不包含要删除的商品 id
        console.log('该商品不在喜爱列表中');
      }
    }).catch(err => {
      console.error(err);
    });
  }

    onMounted(() => {
      const params = Taro.getCurrentInstance().router?.params;
      if (params && params.id) {
        const productId = parseInt(params.id);
        console.log(productId);
        gid.value=productId;
        console.log(gid);
        db.collection('goods')
          .where({
            id: productId,
          })
          .get()
          .then((res) => {
            goodsTitle.value = res.data[0].title;
            goodsDiscount.value = res.data[0].discount;
            goodsSold.value = res.data[0].sold;
            goodsMarketPrice.value = res.data[0].marketPrice;
            goodspic.value = res.data[0].image;
          })
          .catch((err) => {
            console.error('Failed to fetch goods:', err);
          });
      }

      Taro.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      const openid = res.result._openid;
      opid.value = openid; // 将获取到的 _openid 赋值给 this._openid
      console.log(res.result.message); // 显示 "用户已存在" 或 "新用户已添加"
      console.log(openid); // 显示用户的 openid
    }).catch(err => {
      console.error(err);
    });

    });

    return {
      goodsTitle,
      goodsDiscount,
      goodsSold,
      goodsMarketPrice,
      goodspic,
      opid,
      addFavorite,
      gid,
      removeFavorite,
    };
  },
};
</script>
<style>
.keyi{
  margin-right: 0px;

}
.keyi2{
  margin-left:0px;
}
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
  width: 100%;
  height: 450px;
}

</style>

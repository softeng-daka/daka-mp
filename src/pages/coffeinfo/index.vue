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
        v-for="c of comments"
        :key="c.openid + Math.floor(Math.random() * 10000).toString()"
        user-avatar="../../images/avatar1.png"
        :pname="c.nickname"
        :commenttext="c.content"
      ></commentListItem>
      <view class="comment-area">
        <input
          v-model.trim="inputComment"
          class="comment-textbox"
          type="text"
          placeholder="发条评论呗"/>
          <button
            class="comment-send"
            type="default"
            plain="true"
            @click="sendComment">发送</button>
      </view>
    </div>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, _ } from '../dbtest/db.js';
import Taro from '@tarojs/taro';
import '../../images/avatar1.png'

export default {
  setup() {
    const goodsTitle = ref('');
    const goodsDiscount = ref(0);
    const goodsSold = ref(0);
    const goodsMarketPrice = ref(0);
    const goodspic = ref('');
    const opid=ref('');
    const gid=ref(0);
    const comments=ref([])
    const inputComment = ref('')

    const sendComment = async () => {
      if (inputComment.value == '') return
      let obj = {content: inputComment.value, openid: opid.value};
      inputComment.value = ''

      // 首先检查 comments 表中是否存在对应 goodid 的记录
      const commentRes = await db.collection('comments').where({
        goodid: gid.value
      }).get()
      if (commentRes.data.length > 0) {
        // 如果存在，直接添加评论
        await db.collection('comments').where({
          goodid: gid.value
        }).update({
          data: {
            comment: _.push([obj])
          }
        })
        await reloadComment()
      } else {
        // 如果不存在，先创建记录
        await db.collection('comments').add({
          data: {
            goodid: gid.value,
            comment: [obj]
          }
        })
        await reloadComment()
      }
    }

    const reloadComment = async () => {
      comments.value = []
      const commentsRes = await db.collection('comments')
        .where({
          goodid: gid.value
        })
        .get()
      if (commentsRes.data.length === 0) return

      const commentsList = commentsRes.data[0].comment
      let userRes
      for (let i = 0; i < commentsList.length; i++) {
        userRes = await db.collection('users')
          .where({
            _openid: commentsList[i].openid
          })
          .get()
        comments.value.push({
          openid: commentsList[i].openid,
          nickname: userRes.data[0].name,
          content: commentsList[i].content
        })
      }
    }

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

    onMounted(async () => {
      const params = Taro.getCurrentInstance().router?.params;
      if (params && params.id) {
        const productId = parseInt(params.id);
        console.log(productId);
        gid.value=productId;
        console.log(gid);
        const goodsRes = await db.collection('goods')
          .where({
            id: productId,
          })
          .get()
          .catch((err) => {
            console.error('Failed to fetch goods:', err);
          });
        goodsTitle.value = goodsRes.data[0].title;
        goodsDiscount.value = goodsRes.data[0].discount;
        goodsSold.value = goodsRes.data[0].sold;
        goodsMarketPrice.value = goodsRes.data[0].marketPrice;
        goodspic.value = goodsRes.data[0].image;
        
        await reloadComment()
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
      inputComment,
      addFavorite,
      sendComment,
      reloadComment,
      gid,
      comments,
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
  max-height: 600px;  
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

.comment-area {
  display: flex;
  margin: 5px 30px;
  margin-top: 50px;
}

.comment-textbox {
  flex-grow: 1;
  border: 2px solid gray;
  background-color: #f7e1d4;
  border-radius: 200px;
  font-size: 1.3em;
  padding-left: 15px;
  height: 60px;
}

.comment-send {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  height: 60px;
  font-size: 1.2em;
  line-height: 1.2em;
  margin-left: 25px;
  border: 2px solid gray;
}

.back{
  background-color: #E9D5C8;
}

.coffee-pic {
  width: 100%;
  height: 450px;
}

</style>

<template>
  <div>
    <button @click="Filter">点击筛选数据</button>
    <button @click="searchBar">点击搜索数据</button>
    <button @click="addFavorite">点击添加收藏</button>
    <input placeholder="请输入关键词" @input="getInput" />
  </div>
  <div>
    <input type="text" v-model="this.commentText" />
    <button @click="sendComment">发送</button>
  </div>
  <div>
    <input type="text" v-model="score" />
    <button @click="sendScore">评分</button>
  </div>
  <button @click="check">查看是否已经评分</button>
  <button @click="countSum">计算平均得分</button>
  <button @click="getCommentsByGoodId">查看商品评论</button>
  <div>
    <input type="text" v-model="this.name" />
    <button @click="updateName">修改用户名</button>
  </div>
  <button @click="getUserInfoByOpenId">通过openid获取用户收藏</button>
  <button @click="removeFavorite">删除收藏</button>
  <button @click="searchGood">查询单个商品信息</button>
  <button @click="homePage">首页推荐商品</button>
  <button @click="getItemsWithPriceOver30">高端商品</button>
  <button @click="getItemsWithPriceUnder20">经济商品</button>
  <button @click="soldTop">热销商品</button>
  <div>
    <img src="cloud://cloud1-1gxswkl3c502ee3c.636c-cloud1-1gxswkl3c502ee3c-1321964008/团购图片/星巴克/【暖冬下午茶】咖啡+蛋糕.png"/>
  </div>

</template>

<script>
import { db, _ } from './db.js';
import Taro from '@tarojs/taro';
export default {
  data() {
    return {
      val: '',
      brandName: '星巴克',
      type: '星冰乐',
      bottomPrice: 0,
      peakPrice: 31,
      keyWord: '星巴克',
      _openid:'o596U65UPBIZqt9BxwjZiUP4HWDo',
      goodid:1068185454,
      bkComment:"",
      score:"10",
      commentText:"",
      name:""
    };
  },
  methods: {
    // 首页筛选
    Filter() {
    db.collection('goods').where(
      _.and([
        {
          title: db.RegExp({
            regexp: this.brandName,
            options: 'i', // 不区分大小写
          })
        },
        {
          title: db.RegExp({
            regexp: this.type,
            options: 'i', // 不区分大小写
          })
        }
      ])
    )
    .get()
    .then(res => {
      console.log(res.data);
    });
  },
  // 搜索框
  searchBar(){
    db.collection('goods')
    .where(
      {
        title: db.RegExp({
          regexp: this.keyWord,
          options: 'i', // 不区分大小写
        })
      }
    )
    .orderBy('mark', 'desc') 
    .get()
    .then(res => {
      console.log(res.data);
    });
  },

  getInput(event) {
    this.val = event.target.value;
    console.log(this.val)
  },
  // 用户登录时触发的函数，检测用户是否注册过，没有注册就自动注册，并且返回openid
  getOpenid() {
    Taro.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      const openid = res.result._openid;
      this._openid = openid; // 将获取到的 _openid 赋值给 this._openid
      console.log(res.result.message); // 显示 "用户已存在" 或 "新用户已添加"
      console.log(openid); // 显示用户的 openid
    }).catch(err => {
      console.error(err);
    });
  },

  //添加收藏
  addFavorite() {
    const users = db.collection('users');
    const _openid = this._openid;
    const goodid = this.goodid;

    // 首先检查用户的 like 数组中是否已经包含该商品 id
    users.where({
      _openid: _openid,
      like: _.in([goodid])
    }).get().then(res => {
      if (res.data.length > 0) {
        // 用户的 like 数组中已包含该商品 id
        console.log('该商品已在喜爱列表中');
        return false;
      } else {
        // 用户的 like 数组中不包含该商品 id，将其添加到数组中
        users.where({
          _openid: _openid
        })
        .update({
          data: {
            like: _.push(goodid)
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
  },

  // 删除收藏
  removeFavorite() {
    const users = db.collection('users');
    const _openid = this._openid;
    const goodidToRemove = this.goodid;

    // 首先检查用户的 like 数组中是否包含要删除的商品 id
    users.where({
      _openid: _openid,
      like: _.in([goodidToRemove])
    }).get().then(res => {
      if (res.data.length > 0) {
        // 用户的 like 数组中包含要删除的商品 id
        // 在数组中找到该商品 id 并移除
        const updatedLike = res.data[0].like.filter(id => id !== goodidToRemove);

        // 更新用户的 like 数组
        users.where({
          _openid: _openid
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
  },

  getUserInfoByOpenId() {
  db.collection('users')
    .where({
      _openid: this._openid
    })
    .get()
    .then(res => {
      console.log(res.data);
    });
  },



    getGood() { //查询商品信息
    db.collection('goods').where({
      id: this.goodid
    })
    .get()
    .then(res => {
      console.log(res.data);
    });
  },

  countSum(){
    db.collection('scores').where({
      goodid:this.goodid
    }).get().then(res=>{
      let arr=res.data[0].scores
      let sum=0.0
      for(let i=0;i<arr.length;i++){
        sum+=parseFloat(arr[i].score)
      }
      let avg=sum/arr.length
      console.log(avg.toFixed(1))
    })
  },
  check(){
    db.collection('scores').where({
      goodid:this.goodid
    }).get().then(res=>{
      let arr=res.data[0].scores
      for(let i=0;i<arr.length;i++){
        if(arr[i]._openid==this._openid){
          console.log("已经评分了")
          return
        }
      }
      console.log("还未评分")
    })
  },

  sendScore(){
    // 构造要添加的评分对象
    let obj = {score: this.score, _openid: this._openid};

    // 首先检查 scores 表中是否存在对应 goodid 的记录
    db.collection('scores').where({
      goodid: this.goodid
    }).get().then(res => {
      if (res.data.length > 0) {
        // 检查该用户是否已经评分
        let existingScore = res.data[0].scores.find(score => score._openid === this._openid);
        if (existingScore) {
          console.log("用户已经评过分");
          return null; // 终止进一步操作
        }

        // 用户尚未评分，添加评分
        return db.collection('scores').where({
          goodid: this.goodid
        }).update({
          data: {
            scores: _.push([obj]) // 使用 _.push 添加新评分到数组
          }
        });
      } else {
        // 如果不存在，先创建记录
        return db.collection('scores').add({
          data: {
            goodid: this.goodid,
            scores: [obj] // 初始评分数组
          }
        });
      }
    }).then(res => {
      if (res) {
        console.log("评分处理成功", res);
      }
    }).catch(err => {
      console.error("评分处理失败", err);
    });
  },





  sendComment(){
    console.log("当前 goodid:", this.goodid); // 用于调试
    // 检查评论内容是否为空
    if (!this.commentText || this.commentText.trim() === '') {
      console.log("评论内容不能为空");
      return;
    }

    // 构造要添加的评论对象
    let obj = {commentText: this.commentText, _openid: this._openid};

    // 首先检查 comments 表中是否存在对应 goodid 的记录
    db.collection('comments').where({
      goodid: this.goodid
    }).get().then(res => {
      if (res.data.length > 0) {
        // 如果存在，直接添加评论
        return db.collection('comments').where({
          goodid: this.goodid
        }).update({
          data: {
            comment: _.push([obj])
          }
        });
      } else {
        // 如果不存在，先创建记录
        return db.collection('comments').add({
          data: {
            goodid: this.goodid,
            comment: [obj]
          }
        });
      }
    }).then(res => {
      console.log("评论处理成功", res);
    }).catch(err => {
      console.error("评论处理失败", err);
    });
  },

  //根据商品id查询商品评论
  getCommentsByGoodId() {
  db.collection('comments')
    .where({
      goodid: this.goodid
    })
    .get()
    .then(res => {
      console.log("评论查询成功", res);
    });
  },


  updateName() {
    // 检查姓名是否为空
    if (!this.name || this.name.trim() === '') {
      console.log("姓名不能为空");
      return;
    }

    // 获取数据库引用
    const users = db.collection('users');

    // 查询用户记录
    users.where({
      _openid: this._openid
    }).get().then(res => {
      if (res.data.length > 0) {
        // 用户存在，更新姓名
        return users.where({
          _openid: this._openid
        }).update({
          data: {
            name: this.name
          }
        });
      } else {
        // 用户不存在
        console.log("用户不存在");
        return null;
      }
    }).then(updateRes => {
      if (updateRes) {
        console.log("姓名更新成功", updateRes);
      }
    }).catch(err => {
      console.error("更新失败", err);
    });
  },
  //根据商品id查询商品信息
  searchGood() {
    db.collection('goods').where({
      id: this.goodid
      }
    )
    .get()
    .then(res => {
      console.log(res.data);
    });
  },

  //用于获取首页推荐商品
  homePage() {
    db.collection('goods')
      .get()
      .then(res => {
        let shuffled = res.data.sort(() => 0.5 - Math.random());
        let randomItems = shuffled.slice(0, 2);
        console.log(randomItems);
      });
  },

  //用于获取销售top榜
  soldTop() {
    db.collection('goods')
    .orderBy('mark', 'desc') 
    .get()
    .then(res => {
      console.log(res.data);
    });
  },

  //用于获取高端商品
  getItemsWithPriceOver30() {
  db.collection('goods')
    .where({
      price: db.command.gt(30) // Use the greater than (gt) query operation
    })
    .get()
    .then(res => {
      console.log(res.data);
    });
  },

  //用于获取经济商品
  getItemsWithPriceUnder20() {
  db.collection('goods')
    .where({
      price: db.command.lt(20) // Use the less than (lt) query operation
    })
    .get()
    .then(res => {
      console.log(res.data);
    });
  },




  //给商品添加评分
  async addmarkone() {  
    let maxMarketPrice = 108;  
    let maxSold = 182109;  
    var mark;  
    const res = await db.collection('goods').where({ id: this.goodid }).get();  
    var sold = res.data[0].sold;  
    var marketPrice = res.data[0].marketPrice;  
    mark = (sold / maxSold * 0.8 + marketPrice / maxMarketPrice * 0.2) * 100;  
    mark = mark.toFixed(2);  
    console.log(mark); // 这里的 mark 会有预期的值  
    db.collection('goods').where({
          id: this.goodid
        }).update({
          data: {
            mark:Number(mark)
          }
        }).then(res => {
      console.log("添加评分成功", res);
      }).catch(err => {
        console.error("添加评分失败", err);
      });
  },

  },
  mounted() {
    // this.getOpenid();
  },
};
</script>



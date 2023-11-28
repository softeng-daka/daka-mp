<template>
    <cover-view class="tab-bar">
      <cover-view class="tab-bar-border"></cover-view>
        <cover-view v-for="(item, index) in list" :key="index" class="tab-bar-item" @tap="switchTab(index, item.pagePath)">
          <icon-font :style="{ color: selected === index ? selectedColor : color }" size="35" font-class-name="iconfont" class-prefix="icon" :name="item.iconPath.substring(13)" />
        </cover-view>
    </cover-view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { computed }  from 'vue'
import { useRouterStore } from '../store/router'
import '../assets/font/iconfont.css'
import { IconFont } from '@nutui/icons-vue-taro'

const store = useRouterStore()
const selected = computed(() => store.selectedTabIndex)

const color = '#FFFFFF'
const selectedColor = '#DC143C'

const list = [
    {
        pagePath: '/pages/index/index',
        iconPath: './dummy-icon/home.png',
        text: '首页'
    },
    {
        pagePath: '/pages/search/index',
        iconPath: './dummy-icon/search.png',
        text: '搜索'
    },
    {
        pagePath: '/pages/user/index',
        iconPath: './dummy-icon/user.png',
        text: '用户'
    }
]

function switchTab(index, url) {
    store.selectedTabIndex = index
    Taro.switchTab({ url })
}
</script>

<style lang="scss">
.tab-bar {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: #D98E5D;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
}

.tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.tab-bar-item icon-font {
    width: 54px;
    height: 54px;
}

.tab-bar-item cover-view {
    font-size: 20px;
}

@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url('../assets/font/iconfont.ttf?t=1700125893546') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-message:before {
  content: "\e78a";
}

.icon-user:before {
  content: "\e7ae";
}

.icon-home:before {
  content: "\e7c6";
}

.icon-heart:before {
  content: "\e7df";
}

.icon-monitor:before {
  content: "\e7e2";
}

.icon-fire:before {
  content: "\e842";
}

.icon-heart-fill:before {
  content: "\e849";
}

.icon-message-fill:before {
  content: "\e84a";
}

.icon-fire-fill:before {
  content: "\e866";
}

.icon-home-fill:before {
  content: "\e867";
}

.icon-search:before {
  content: "\e8ef";
}


</style>

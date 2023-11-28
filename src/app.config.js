export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#d98e5d',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '大咖',
    backgroundColor: '#e9d5c8'
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#FA2C1A',
    backgroundColor: '#000000',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './dummy-icon/home.png',
        text: '首页'
      },
      {
        pagePath: 'pages/search/index',
        iconPath: './dummy-icon/search.png',
        text: '搜索'
      },
      {
        pagePath: 'pages/user/index',
        iconPath: './dummy-icon/user.png',
        text: '用户'
      }
    ],
  },
})

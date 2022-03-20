export default defineAppConfig({
  pages: [
    'pages/shop/modify',
    'pages/index/index',
    'pages/shop/detail',
    'pages/map/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    "scope.userLocation": {
      desc: "请点击确定"
    }
  },
})

export default defineAppConfig({
  pages: [
    'pages/map/index',
    'pages/shop/modify',
    'pages/index/index',
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

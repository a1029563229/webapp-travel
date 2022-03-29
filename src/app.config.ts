export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/personal/index',
    'pages/shop/detail',
    'pages/shop/modify',
    'pages/map/index',
  ],
  tabBar: {
    selectedColor: '#ffb11b',
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "assets/img/nav_icons/home.png",
        selectedIconPath: "assets/img/nav_icons/home_hover.png",
        text: "首页"
      },
      {
        pagePath: "pages/personal/index",
        iconPath: "assets/img/nav_icons/personal.png",
        selectedIconPath: "assets/img/nav_icons/personal_hover.png",
        text: "我的"
      }
    ]
  },
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

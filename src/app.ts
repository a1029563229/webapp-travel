import { createApp } from 'vue'
import { Button, Toast, Swiper, SwiperItem } from '@nutui/nutui-taro';

import './app.less'
import './assets/style/preset.less'
import './assets/style/global.less'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Toast)
App.use(Swiper).use(SwiperItem);

export default App

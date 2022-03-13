import { createApp } from 'vue'
import { 
  Button, 
  Toast, 
  Swiper, 
  SwiperItem, 
  Input, 
  Icon, 
  Picker, 
  Popup, 
  Cell,
  Uploader,
  Progress,
  Rate,
  TextArea,
  Radio,
  RadioGroup
} from '@nutui/nutui-taro';
import "@nutui/nutui-taro/dist/style.css";

import './app.less'
import './assets/style/preset.less'
import './assets/style/global.less'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Toast)
App.use(Swiper).use(SwiperItem);
App.use(Input);
App.use(Icon);
App.use(Picker);
App.use(Popup);
App.use(Cell);
App.use(Uploader);
App.use(Progress);
App.use(Rate);
App.use(TextArea);
App.use(Radio);
App.use(RadioGroup);

export default App

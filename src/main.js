import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/me/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f38181',
      navigationBarTitleText: '口袋Excel',
      navigationBarTextStyle: 'light'
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#333',
      // backgroundColor: '#393e46',
      // borderStyle: 'white',
      list: [
        {
          text: '口袋',
          pagePath: 'pages/index/main',
          iconPath: 'static/image/excel.png',
          selectedIconPath: 'static/image/excel_color.png'
        },
        {
          text: '我',
          pagePath: 'pages/me/main',
          iconPath: 'static/image/me.png',
          selectedIconPath: 'static/image/me_color.png'
        }
      ]
    }
  }
}
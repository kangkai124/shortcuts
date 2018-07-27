import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '快捷键列表',
    onReachBottomDistance: 20
  }
}
